import { Query } from '../';
import type { TAuthors, TBlogs } from '../models';

const all = () =>
	Query<Array<TAuthors | TBlogs>>(
		`SELECT
        authors.first_name,
        authors.last_name,
        blogs.*
    FROM blogs
    JOIN authors ON authors.id = blogs.authorid
    ORDER BY blogs.id DESC`
	);

const one = (blogid: number) =>
	Query<Array<TAuthors | TBlogs>>(
		`SELECT
    authors.first_name,
    authors.last_name,
    blogs.*
FROM blogs
JOIN authors ON authors.id = blogs.authorid
WHERE blogs.id = ?`, [blogid]
    );
    
const insert = (blog: any) => Query<{ insertId: number }>(`INSERT INTO blogs SET ?`, [blog]);

export default {
    all,
    one,
    insert
};
