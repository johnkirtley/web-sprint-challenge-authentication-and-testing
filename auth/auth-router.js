const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

const Users = require('./model');
const { jwtSecret } = require('../config/secrets');

router.post('/register', (req, res) => {
	const credentials = req.body;
	const rounds = process.env.HASH_ROUNDS || 10;
	const hash = bcrypt.hashSync(credentials.password, rounds);

	credentials.password = hash;

	Users.add(credentials)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((err) => {
			console.log('Error adding user', err);
		});
});

router.post('/login', (req, res) => {
	const { username, password } = req.body;

	Users.findBy({ username })
		.then(([user]) => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);

				res.status(201).json({ message: 'Logged In', token });
			} else {
				res.status(401).json({ message: 'Invalid Credentials' });
			}
		})
		.catch((err) => {
			console.log('Error logging in', err);
		});
});

const generateToken = (user) => {
	const payload = {
		username: user.username,
		password: user.password,
	};

	const options = {
		expiresIn: '1hr',
	};

	return jwt.sign(payload, jwtSecret, options);
};

module.exports = router;
