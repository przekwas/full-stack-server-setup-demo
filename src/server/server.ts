import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as cors from 'cors';
import logger, { stream } from './utils/logger';
import config from './config';
import type { Error } from './utils/types';
import routes from './routes';

const app = express();

app.get('/status', (req, res) => res.status(200).end());
app.head('/status', (req, res) => res.status(200).end());

app.enable('trust proxy');

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.static('public'));
app.use(morgan(config.logs.morgan, { stream }));
app.use(express.json());
app.use(config.app.prefix, routes);
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
	logger.error(err);
	res.status(err.status || 500);
	res.json({ errors: { message: err.message } });
});

app.listen(config.app.port, (err: Error) => {
	if (err) {
		logger.error(err);
		process.exit(1);
	}

	logger.info(`Server listening on port: ${config.app.port}`);
});
