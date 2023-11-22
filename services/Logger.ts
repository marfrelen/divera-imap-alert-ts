import {WriteStream} from "fs";
import {readdir} from 'node:fs/promises';
import Helper from './Helper';
import * as FS from "fs";
import ErrnoException = NodeJS.ErrnoException;

const fs = require('fs');
const util = require('util');
const cron = require('node-cron');

export class Logger {
    #logFile: WriteStream | undefined = undefined;

    constructor() {
        this.startCleanupCron();
    }

    log(...message: string[]): void {
        this.writeLog(message, 'log');
    }

    info(...message: string[]): void {
        this.writeLog(message, 'info')
    }

    warn(...message: string[]): void {
        this.writeLog(message, 'warn');
    }

    error(...message: string[]): void {
        this.writeLog(message, 'error');
    }

    debug(...message: string[]): void {
        this.writeLog(message, 'debug')
    }

    protected get logFile(): WriteStream {
        const logFilePath = `${__dirname}/../log/log_` + Helper.getActualIsoDate() + '.txt';

        if (this.#logFile === undefined || logFilePath !== this.#logFile.path) {
            this.#logFile = fs.createWriteStream(logFilePath, {flags: 'a'})
        }
        // @ts-ignore _logFile can't be undefined
        return this.#logFile;
    }

    protected writeLog(messages: Array<string>, fn: 'log' | 'info' | 'warn' | 'error' | 'debug' | 'trace' = 'log'): void {
        let formattedMessage = (fn !== 'log' ? (Helper.getActualTimeString() + ' ') : '') + util.format.apply(null, messages).replace(/\033\[[0-9;]*m/g, "") + '\n';
        formattedMessage = (fn !== 'log' ? (fn.toUpperCase() + ' | ') : '') + formattedMessage;

        let trace: string = '';

        if (['error', 'warn', 'debug', 'trace'].includes(fn)) {
            fn = 'trace';

            const error = new Error();

            trace = error.stack || '';
        }

        this.logFile.write(formattedMessage + trace);

        console[fn](formattedMessage);
    }

    protected startCleanupCron(): any {
        return cron.schedule('0 0 * * *', () => this.cleanupOldLogFiles());
    }

    protected cleanupOldLogFiles(): void {
        const path = `${__dirname}/../log`;
        const deleteDate = new Date();
        deleteDate.setDate(deleteDate.getDate() - parseInt(process.env.LOGGER_CLEANUP_LOGFILES_MAX_AGE_DAYS || "30"));

        readdir(path).then(files => {
            for (const file of files) {
                if (file === '.gitignore') {
                    continue;
                }
                const actualFilePath = path + '/' + file;

                if (!(FS.statSync(actualFilePath).ctime >= deleteDate)) {
                    fs.unlink(actualFilePath, (error: ErrnoException | null) => {
                        if (error) {
                            this.error('Unable to delete logfile. The following error occurs: ' + error.toString())
                        }
                    })
                }
            }

        }).catch(err => {
            this.error(err.toString());
        })
    }
}

export default new Logger();