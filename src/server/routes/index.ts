import * as express from 'express';
import blogsRouter from './blogs';
import tagsRouter from './tags';
import blogtagsRouter from './blogtags';
import authorsRouter from './authors';

const router = express.Router();

router.use('/blogs', blogsRouter);
router.use('/authors', authorsRouter);
router.use('/tags', tagsRouter);
router.use('/blogtags', blogtagsRouter);

export default router;