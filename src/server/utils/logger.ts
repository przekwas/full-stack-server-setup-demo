import * as winston from 'winston';
import config from '../config';

const transports = [];
if (process.env.NODE_ENV === 'production') {
	transports.push(new winston.transports.Console());
	transports.push(new winston.transports.File({ filename: 'app.log' }));
} else {
	transports.push(
		new winston.transports.Console({
			level: config.logs.levels,
			format: winston.format.combine(winston.format.cli(), winston.format.splat())
		})
	);
}

const LoggerInstance = winston.createLogger({
	level: config.logs.levels,
	levels: winston.config.npm.levels,
	format: winston.format.combine(
		winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		winston.format.errors({ stack: true }),
		winston.format.splat(),
		winston.format.json()
	),
	transports
});

export const stream = {
	write: (text: string) => LoggerInstance.http(text)
};

export default LoggerInstance;
