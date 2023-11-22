import Alert from "../structs/Alert";

export default class MessageToAlertConverter {
    convert(message: string): Alert | null {
        const data = message.split(',');

        if (data.length === 0) {
            return null;
        }

        const alert = new Alert();
        alert.number = MessageToAlertConverter.handleMessageItem(data[8] || null);
        alert.title = MessageToAlertConverter.handleMessageItem(data[0] || null);
        alert.priority = false;
        alert.text = MessageToAlertConverter.handleMessageItem(data[4] || null);
        alert.address = MessageToAlertConverter.handleMessageItem([data[1] || '', data[2] || '', data[3] || ''].join(', ') || null);
        alert.caller = MessageToAlertConverter.handleMessageItem(data[7] || null);
        alert.additional_text_1 = MessageToAlertConverter.handleMessageItem(data[5] || null);
        alert.additional_text_2 = MessageToAlertConverter.handleMessageItem(data[9] || null);

        return alert;
    }

    private static handleMessageItem(item: string | null) {
        if (typeof item === 'string') {
            return item.replace(/\s+/g, ' ').trim()
        }
        return item;
    }
}