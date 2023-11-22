import Alert from "../structs/Alert";

require('dotenv').config({path: `${__dirname}/../.env`});
import logger from "./Logger";
import diveraAlertQueue from './DiveraAlertQueue';
const cron = require('node-cron');

export class TestAlertCronJob {
    protected minutes: string;
    protected hours: string;
    protected monthDay: string;
    protected month: string;
    protected weekDay: string;
    protected static cron: any = undefined;

    constructor() {
        this.minutes = process.env.TEST_ALERT_CRON_MINUTES || '*';
        this.hours = process.env.TEST_ALERT_CRON_HOURS || '*';
        this.monthDay = process.env.TEST_ALERT_CRON_MONTH_DAY || '*';
        this.month = process.env.TEST_ALERT_CRON_MONTH || '*';
        this.weekDay = process.env.TEST_ALERT_CRON_WEEK_DAY || '*';
    }

    run() {
        if (parseInt(process.env.TEST_ALERT_CRON_ENABLED || '0') !== 1) {
            logger.info('TestAlertCronJob | Test alert is disabled by .env');
            return;
        }
        if(typeof TestAlertCronJob.cron?.stop === 'function') {
            TestAlertCronJob.cron.stop();
        }
        TestAlertCronJob.cron = cron.schedule(this.#getScheduleString(), () => {
            const alert = new Alert();
            alert.number =(process.env.TEST_ALERT_NUMBER_PREFIX || '') + parseInt((Date.now() / 1000).toString())
            alert.title = process.env.TEST_ALERT_TITLE || 'Test Alert';
            alert.text = process.env.TEST_ALERT_TEXT || 'Test Alert';
            alert.address = process.env.TEST_ALERT_ADDRESS || null;

            diveraAlertQueue.pushAlert(alert);
        });
    }

    #getScheduleString() {
        return `${this.minutes} ${this.hours} ${this.monthDay} ${this.month} ${this.weekDay}`;
    }

}

export default new TestAlertCronJob();