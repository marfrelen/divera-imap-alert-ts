export default interface ImapConfigInterface {
    imap: {
        user: string,
        password: string,
        host: string,
        port: number,
        tls: boolean,
        authTimeout: number
    }
}