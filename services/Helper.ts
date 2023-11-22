export default class Helper {
    static fillWithLeadingNull = (numberString: string): string => {
        return numberString.length === 1 ? '0' + numberString : numberString;
    }
    static getActualIsoDate = ():string => {
        const date = new Date();
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString();
        const day = date.getDate().toString();

        return (year + '-' + Helper.fillWithLeadingNull(month) + '-' + Helper.fillWithLeadingNull(day));
    }
    static getActualTimeString = ():string => {
        const date = new Date();
        const hours = date.getHours().toString() || '0';
        const minutes = date.getMinutes().toString() || '0';

        return `[${Helper.getActualIsoDate()} ${Helper.fillWithLeadingNull(hours)}:${Helper.fillWithLeadingNull(minutes)}]`;
    }
}