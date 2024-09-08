const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401); // Bearer token, we split in the space to get the token
    //if (!authHeader) return res.sendStatus(401); // Bearer token, we split in the space to get the token

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); // 403 forbidden, which means the token has been tampered with
            req.user = decoded.username;
            next();
        }
    )
}

module.exports = verifyJWT