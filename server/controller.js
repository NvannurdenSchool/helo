const bcrypt = require('bcrypt');

module.exports = {
	register: async (req, res) => {
		
		const db = req.app.get('db');
		
		const {username, password} = req.body;
		console.log(username)
		const userFound = await db.check_username(username)
			if (userFound[0]){
				return res.status(400).send("Username already in use")
			}
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);
		const [newUser] = await db.add_user([username, hash]);
		req.session.user = {
			userId: newUser.user_id,
			username: newUser.username,
		}
		res.status(200).send(req.session.user)
	},

	login: async (req, res) => {
		const db = req.app.get('db');
		const {username, password} = req.body;
		const userFound = await db.check_username({username})
			if(!userFound) {
				return res.status(401).send('No user found')
			}
			const authenticated = bcrypt.compareSync(password, userFound.password)
			if(authenticated){
				req.session.user = {
					userId: userFound.user_id,
					username: userFound.username
				}
				res.status(200).send(req.session.user);
			} else {
				res.status(401).send('incorrect login information')
			}
	},

	logout: (req,res) => {
		req.session.destroy();
		res.sendStatus(200);
	}
}