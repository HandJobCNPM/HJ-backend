const jwt = require('jsonwebtoken');
const { options } = require('../../config/jwtCfg');

module.exports = authenticate = (req, res, next) => {
    const token = req.body.token ||
                req.query.token ||
                req.headers['x-access-token'] ||
                req.cookies.token;

    if (!token) {
        res.status(401).send('No token provided');
        return;
    }

    jwt.verify(token, process.env.SECRET, options(), err => {
        if (err) {
            res.status(401).send('Invalid token');
            return;
        }
        next();
    });
};