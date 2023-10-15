const express = require('express');
const executeQuery = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtTokens = require('../utils/jwt-helpers.js');

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = await executeQuery(
            `SELECT * FROM users WHERE user_email = '${email}'`
        );
        // PASSWORD CHECK
        const validPassword = await bcrypt.compare(password, users[0].user_password)
        if (!validPassword) return res.status(401).json({ error: 'Password is incorrect' });
        //JWT
        let tokens = jwtTokens(users[0]);
        res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
        res.json(tokens);

    } catch (error) {
        console.log(error.message);
        if (error.message === "Cannot read properties of undefined (reading 'user_password')") {
            return res.status(500).json({ error: 'Email is incorrect' });
        }
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;