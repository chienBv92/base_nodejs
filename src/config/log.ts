import fs from 'fs';
import path from 'path';
import winston, { format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { createStream } from 'rotating-file-stream';
import moment from 'moment';

// Create log dir
const logDirectory = path.resolve(process.env.LOG_DIR);
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const logFormat = format.printf((info) => {
  if (info.stack) {
    return `[${info.timestamp}] [${info.level}] - ${info.stack}`;
  }
  return `[${info.timestamp}] [${info.level}] - ${info.message}`;
});

export default {
  winston: {
    format: winston.format.combine(
      winston.format.splat(),
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
    ),
    transports: [
      new DailyRotateFile({
        format: format.combine(logFormat),
        filename: path.join(logDirectory, '%DATE%-errors.log'),
        datePattern: 'YYYY-MM-DD',
      }),
      new winston.transports.Console({
        handleExceptions: true,
        format: format.combine(format.colorize(), logFormat),
      }),
    ],
    level: process.env.LOG_LEVEL || 'silly',
    handleExceptions: true,
    json: false,
  },
  morgan: {
    format: 'combined',
    options: {
      stream: createStream(
        (time) =>
          `${moment(time || new Date()).format('YYYY-MM-DD')}-access.log`,
        {
          interval: '1d', // rotate daily
          path: logDirectory,
        },
      ),
    },
  },
};
