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

router.get('/refresh_token', (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (refreshToken === null) return res.status(401).json({ error: 'Null refresh token' });
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
            if (error) return res.status(403).json({ error: error.message });
            let tokens = jwtTokens(user);
            res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
            res.json(tokens);
        });
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
});

router.delete('/refresh_token', (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({ message: 'refresh token deleted' });
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
})

module.exports = router;