CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	username VARCHAR(50),
	password VARCHAR(500),
	profile_pic TEXT
);

CREATE TABLE posts (
	user_id SERIAL PRIMARY KEY
	title VARCHAR(45)
	img TEXT
	content TEXT
	author_id INT REFERENCES users(user_id)
);