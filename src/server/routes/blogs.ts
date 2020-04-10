import * as express from 'express';
import db from '../db';
import logger from '../utils/logger';

const router = express.Router();

router.get('/:id', async (req, res, next) => {
	const blogid = Number(req.params.id);

	try {
		logger.silly(`getting blog ${blogid}`);
		const [blog] = await db.blogs.one(blogid);
		res.json(blog);
	} catch (error) {
		logger.debug(`getting blog ${blogid} failed`);
		next(error);
	}
});

router.get('/', async (req, res, next) => {
	try {
		logger.silly('getting all blogs');
		const blogs = await db.blogs.all();
		res.json(blogs);
	} catch (error) {
        logger.debug('get all blogs route failed');
		next(error);
	}
});

router.post('/', async (req, res, next) => {

    const blogDTO = req.body;

	try {
		logger.silly('posting new blog');
		const { insertId: id } = await db.blogs.insert(blogDTO);
		res.json({ id, message: 'blog inserted' });
	} catch (error) {
        logger.debug('posting new blog failed');
		next(error);
	}
});

export default router;
