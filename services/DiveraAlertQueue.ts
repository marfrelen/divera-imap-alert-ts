import logger from './Logger';
import diveraApi from "./DiveraApiWrapper";
import Alert from "../structs/Alert";

require('dotenv').config({path: `${__dirname}/../.env`});
const cron = require('node-cron');

export class DiveraAlertQueue {
    protected queue: Array<Alert>;
    protected maxAlertRetries: number;
    protected queueWorker: any = undefined;

    constructor(
    ) {
        this.queue = [];
        this.maxAlertRetries = parseInt(process.env.AH_MAX_ALERT_RETRIES || '5')
        this.stopSlowLineHandler();
        this.initSlowLineHandler();
    }

    initSlowLineHandler(): void {
        this.queueWorker = cron.schedule('* * * * *', () => {
            this.handleAlertQueue();
        });
    }

    stopSlowLineHandler(): void {
        if (typeof this.queueWorker?.stop === 'function') {
            this.queueWorker.stop();
        }
    }

    pushAlert(alert: Alert): void {
        if (this.queue.length > 0) {
            logger.info('DiveraAlertQueue | Alert No. ' + alert.number + ' was queued');
            this.queue.push(alert);
            return;
        }
        this.alert(alert);
    }

    protected handleAlertQueue(): void {
        let alert: Alert | undefined = this.getAlert();

        if (alert instanceof Alert) {
            this.alert(alert);
        }
    }

    protected getAlert(): Alert | undefined {
        const sortedList = this.queue.sort((alertA: Alert, alertB: Alert): number =>
            alertA.createdAt > alertB.createdAt ? 1
                : alertA.createdAt < alertB.createdAt ? -1
                    : 0
        );
        return sortedList.shift();
    }

    protected alert(alert: Alert): void {
        alert.incrementTries();
        diveraApi.alert(alert).catch(e => {
            if (e.toString() === 'Error: 429') {
                if (alert.tries > this.maxAlertRetries) {
                    logger.warn('DiveraAlertQueue | Alert No. ' + alert.number + ' was discarded because of too many tries');
                    return;
                }
                logger.warn('DiveraAlertQueue | Alert was deferred because of too many requests. Retry Alert No. ' + alert.number + ' in one Minute.')
                this.queue.push(alert);
            }
        });
    }
}

export default new DiveraAlertQueue();
