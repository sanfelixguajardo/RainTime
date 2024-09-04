const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");


const handleLogin = async (req, res) => {
    const cookies = req.cookies;
    const {username, pwd} = req.body;
    if (!username || !pwd) return res.sendStatus(400).json({'message' : 'Username and password are required.' });

    const foundUser = await User.findOne({ username: username }).exec();

    // evaluate user
    if (!foundUser) return res.sendStatus(401); // unauthorized
    //evaluate password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        // create JWT
        const accessToken = jwt.sign(
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10m'}
        );
        const newRefreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '24h'}
        );

        // We could have a cookie when logging in, if after logging in we go to logg in again without logging out
        let newRefreshTokenArray =
            !cookies?.jwt
                ? foundUser.refreshToken // if we didnt have a jwt cookie, dont change de array
                : foundUser.refreshToken.filter(rt => rt !== cookies.jwt); // if we did have a jwt cookie, filter out that cookie from the array to add a new one

        if (cookies?.jwt) // clear cookie if we had one, before creating the new one
        {
            // It can happen that the refreshToken gets stolen while the user has logged-in but hasn't used the refreshToken
            const refreshToken = cookies.jwt;
            const foundToken = await User.findOne( {refreshToken} ).exec();

            if (!foundToken) {
                newRefreshTokenArray = [];
            }

            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        }

        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        const result = await foundUser.save();

        res.cookie('jwt', newRefreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }

}

module.exports =  { handleLogin };