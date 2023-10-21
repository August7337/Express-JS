const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Bearer TOKEN
    const tokenFromHeader = authHeader && authHeader.split(' ')[1];
    const tokenFromCookie = req.cookies.refresh_token;

    if (tokenFromCookie) {
        jwt.verify(tokenFromCookie, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
            if (error) {
                return res.status(403).json({ error: error.message });
            }
            req.user = user;
            next();
        });
    } else if (tokenFromHeader) {
        jwt.verify(tokenFromHeader, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
            if (error) {
                return res.status(403).json({ error: error.message });
            }
            req.user = user;
            next();
        });
    } else {
        res.redirect('/admin/login');
        res.status(401).json({ error: 'No Token' });
        
    }
}
