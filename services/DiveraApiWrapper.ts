import logger from './Logger';
require('dotenv').config({path: `${__dirname}/../.env`});
import fetch from 'node-fetch';
import Alert from "../structs/Alert";

export class DiveraApiWrapper {
    protected apiKey: string;
    protected apiUrl: string;
    protected apiEndpoint: string;
    protected lastAlertNumber: string | null = null;

    constructor() {
        this.apiKey = process.env.DIVERA_API_KEY || '';
        this.apiUrl = process.env.DIVERA_URL || '';
        this.apiEndpoint = process.env.DIVERA_API_ENDPOINT || '';
    }

    alert(alert: Alert): Promise<any> {
        let url = this.apiUrl + this.apiEndpoint + '/alarm';
        const attributes: any = {
            accesskey: this.apiKey
        };
        let attributeString = '';

        if (alert.number) {
            attributes['number'] = alert.number;

            if (parseInt(process.env.DIVERA_API_IGNORE_DUPLICATED_ALERT_NUMBERS || '0') === 1 && this.lastAlertNumber === alert.number) {
                logger.info('DiveraApiWrapper | Alert ' + this.lastAlertNumber + ' ignored')
                return Promise.reject(0);
            }

            this.lastAlertNumber = attributes['number'];
        }
        if (alert.title) {
            attributes['title'] = alert.title;
        }

        attributes['priority'] = alert.priority;

        if (alert.text) {
            attributes['text'] = alert.text;
        }
        if (alert.address) {
            attributes['address'] = alert.address;
        }
        if (alert.lat) {
            attributes['lat'] = alert.lat;
        }
        if (alert.lng) {
            attributes['lng'] = alert.lng;
        }
        if (alert.scene_object) {
            attributes['scene_object'] = alert.scene_object;
        }
        if (alert.caller) {
            attributes['caller'] = alert.caller;
        }
        if (alert.patient) {
            attributes['patient'] = alert.patient;
        }
        if (alert.remark) {
            attributes['remark'] = alert.remark;
        }
        if (alert.units) {
            attributes['units'] = alert.units;
        }
        if (alert.destination) {
            attributes['destination'] = alert.destination;
        }
        if (alert.destination_address) {
            attributes['destination_address'] = alert.destination_address;
        }
        if (alert.destination_lat) {
            attributes['destination_lat'] = alert.destination_lat;
        }
        if (alert.destination_lng) {
            attributes['destination_lng'] = alert.destination_lng;
        }
        if (alert.additional_text_1) {
            attributes['additional_text_1'] = alert.additional_text_1;
        }
        if (alert.additional_text_2) {
            attributes['additional_text_2'] = alert.additional_text_2;
        }

        Object.keys(attributes).forEach(key => {
            if (attributes[key] !== null) {
                if (attributeString.length === 0) {
                    attributeString += '?';
                } else {
                    attributeString += '&';
                }
                attributeString += key + '=' + attributes[key].toString()
            }

        });

        logger.info('DiveraApiWrapper | Alert Data ' + Object.keys(attributes).map(key => attributes[key]).join(', '));

        url = encodeURI(url + attributeString);

        return this.#postData(url, {});
    }

    async #postData(url: string = '', data: any = {}) {
        let resp = null;

        return await fetch(url, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            redirect: 'error'
        }).then(response => {
            resp = response;
            if (response.status > 299 && response.status <= 399) {
                logger.error('DiveraApiWrapper | Redirect Error ' + response.status);
                throw Error(response.status.toString());

            } else if (response.status >= 400 && response.status <= 499) {
                logger.error('DiveraApiWrapper | Api Transmission Error ' + response.status);
                throw Error(response.status.toString());
            } else if (response.status >= 500) {
                logger.error('DiveraApiWrapper | Divera Api Error ' + response.status);
                throw Error(response.status.toString());
            }

            logger.info('DiveraApiWrapper | Delivered alert');
            response.json()
                .then(json => Promise.resolve(json))
                .catch(e => {
                    throw Error(e);
                });
        }).catch(e => {
            this.lastAlertNumber = null;
            return Promise.reject(e);
        });
    }

}

export default new DiveraApiWrapper();