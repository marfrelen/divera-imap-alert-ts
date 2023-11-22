#!/usr/bin/env ts-node-script

import logger from "../services/Logger"
import testAlertCronJob from '../services/TestAlertCronJob';
import imapConnector from '../services/ImapConnector'

logger.info('Index | Node server is running');

imapConnector.handleMessages();
testAlertCronJob.run();
