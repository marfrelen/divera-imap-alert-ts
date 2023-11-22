import logger from "./Logger";
import ImapConfigInterface from "../interfaces/ImapConfigInterface";
import diveraAlertQueue from "./DiveraAlertQueue";
import MessageToAlertConverter from "./MessageToAlertConverter";

const converter = new MessageToAlertConverter();
const Imap = require('imap-simple');
require('dotenv').config({path: `${__dirname}/../.env`});

export class ImapConnector {
    protected config: ImapConfigInterface;
    protected messageHandler: NodeJS.Timer | undefined = undefined;

    constructor() {
        this.config = {
            imap: {
                user: process.env.IMAP_USER || '',
                password: process.env.IMAP_PASSWORD || '',
                host: process.env.IMAP_HOST || '',
                port: parseInt(process.env.IMAP_PORT || '993'),
                tls: process.env.IMAP_TLS === '1',
                authTimeout: 5000
            }
        }
    }

    handleMessages() {
        if (this.messageHandler !== undefined) {
            clearInterval(this.messageHandler)
        }

        this.messageHandler = setInterval(() => {
                Imap.connect(this.config).then((connection: any) => {
                    connection.openBox('INBOX').then(() => {

                        const searchCriteria = ['ALL'];
                        const fetchOptions = {bodies: ['HEADER', 'TEXT', ''], struct: true};
                        return connection.search(searchCriteria, fetchOptions);

                        //Loop over each message
                    }).then((inboxMessages: any) => {
                        let taskList = inboxMessages.map((inboxMessage: any) => {
                            return new Promise((res, rej) => {
                                const parts = Imap.getParts(inboxMessage.attributes.struct);
                                parts.map((part: any) => {
                                    return connection.getPartData(inboxMessage, part)
                                        .then((partData: any) => {
                                            if (part?.subtype === 'plain' && typeof partData === 'string') {
                                                const alert = converter.convert(partData);
                                                if(alert !== null) {
                                                    diveraAlertQueue.pushAlert(alert);
                                                }
                                            }
                                            //Mark message for deletion
                                            connection.addFlags(inboxMessage.attributes.uid, "\Deleted", (err: Error) => {
                                                if (err) {
                                                    logger.error('ImapConnector | Unable to delete message | ' + err);
                                                    rej(err);
                                                }

                                                res(null); //Final resolve
                                            })
                                        }).catch((err: Error) => {
                                            logger.error('ImapConnector | ' + err);
                                        });
                                });
                            });
                        })

                        return Promise.all(taskList).then(() => {
                            connection.imap.closeBox(true, (err: Error) => { //Pass in false to avoid delete-flagged messages being removed
                                if (err) {
                                    logger.error('ImapConnector | ' + err);
                                }
                            });
                            connection.end();
                        });
                    });
                }).catch((e: Error) => {
                    logger.error('ImapConnector | ' + e)
                });
            },
            parseInt(process.env.IMAP_TIMEOUT || '3000')
        )
    }
}

export default new ImapConnector();