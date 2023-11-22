# divera-alert-receiver-nodejs
Fetch alert mails from an configured IMAP-Server and delivers them to Divera

## System requirements
Node Version >= 18.*

## Installation Steps
Copy example env file 
```bash
    cp .env.example .env
```
and set up all configurations.

After that install all npm requirements
```bash
    npm install
```

## Run 
Execute `ts-node public/index.ts` in the project root folder

## Log Files
All daily logs are written in the `/log` folder.

## Modules
### Test Alert Cron Job
The Divera Alert Receiver provides a test cron job,
which sends a test alert in the configured interval.

This job can be configured via the `.env` file.