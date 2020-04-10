import * as mysql from 'mysql';
import config from '../config';
import logger from '../utils/logger';

const pool = mysql.createPool(config.mysql);

export const Query = <T = any>(query: string, values?: any) => {

    const sql = mysql.format(query, values);
    logger.debug(sql);

    return new Promise<T>((resolve, reject) => {
        pool.query(sql, (err, results) => {
            if (err) {
                logger.debug('query failed');
                reject(err);
            } else {
                logger.silly('query executed');
                resolve(results);
            }
        });
    });
}

import blogs from './queries/blogs';
export default {
    blogs
}