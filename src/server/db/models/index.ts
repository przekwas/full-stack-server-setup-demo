export interface TBlogs {
    id?: number;
    title?: string;
    content?: string;
    image_url?: string;
    authorid?: number;
    created_at?: Date;
    updated_at?: Date;
}

export interface TAuthors {
    id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    created_at?: Date;
}