require('dotenv').config();
const session = require('express-session')
const express = require('express');
const massive = require('massive');
const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env
const ctrl = require('./controller');

const app = express();
app.use(express.json());

app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: SESSION_SECRET,
	cookies: {
		maxAge: 1000 * 60 * 60 * 24
	}
}))

massive({
	connectionString: CONNECTION_STRING,
	ssl: {
		rejectUnauthorized: false
	}
}) .then (db => {
	app.set('db', db)
	console.log('Hey, you connected to the db')
}) .catch (err => console.log(err));

app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)
app.post('/auth/logout', ctrl.logout)

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))