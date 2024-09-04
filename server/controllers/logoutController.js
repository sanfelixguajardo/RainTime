const User = require('../models/User');
const handleLogout = async (req, res) => {
    // On client also delete the accessToken

    const cookies = req.cookie;
    if (!cookies?.jwt) return res.sendStatus(204); // successful, no content to send back

    const refreshToken = cookies.jwt;

    // Is refreshToken in db
    const foundUser = await User.findOne({ refreshToken }).exec();

    // evaluate user
    if (!foundUser)
    {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // delete the refreshToken in db
    foundUser.refreshToken = foundUser.refreshToken.filter(rt => rt !== refreshToken);
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports =  { handleLogout };