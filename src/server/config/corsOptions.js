// If the request doesn´t come from an origin listed in the allowedOrigins array, an error wil be thrown
const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("not allowed by CORS"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions;


