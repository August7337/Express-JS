CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE jwttutorial;

CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL
);

--Get Users
SELECT * FROM users;

-- Add User
INSERT INTO users (user_name, user_email, user_password) VALUES ('bob', 'bob@email.com', 'bob');

-- Delet User
DELETE FROM users WHERE user_email = 'bob@email.com';


CREATE TABLE posts (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_date TEXT,
    post_url TEXT NOT NULL UNIQUE,
    post_title TEXT NOT NULL,
    post_image TEXT NOT NULL,
    post_description TEXT,
    post_add_HTML TEXT
);

INSERT INTO posts (post_date, post_url, post_title, post_image, post_description, post_add_HTML) 
VALUES ('10/11/2023', 'test', 'Test', 'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg',
'description', '');


UPDATE posts SET post_date='change',post_url='change', post_title='change', 
post_image='change', post_description='change', post_add_html='change'
WHERE post_id='c8bb173b-ba2b-47b9-bdb9-441db7223736';