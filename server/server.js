require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const verifyJWT = require('./middleware/verifyJWT');
const { consumeProgramStatusQueue } = require('./customFunc/rabbitMQ');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const fs = require('fs');
const https = require('https');
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3500;

const apiRouter = require('./routers/api');
const authRouter = require('./routers/auth');
const refreshRouter = require('./routers/refresh');
const logoutRouter = require('./routers/logout');
const domRouter = require('./routers/dom');
const climateRouter = require('./routers/climate');
const gardenRouter = require('./routers/garden');
const securityRouter = require('./routers/security');

/*const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, 'cert/privatekey.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert/cert.crt'))
};*/


// connect to DB
connectDB();

const server = express();

// logger
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

server.use(logger('combined', { stream: accessLogStream }))
server.use(credentials); // must be before cors so that it doesn't through error
server.use(cors(corsOptions));

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));

// not verified routes
server.use('/', apiRouter);
server.use('/auth', authRouter);
server.use('/refresh', refreshRouter);
server.use('/logout', logoutRouter);

server.use(verifyJWT);

// verified routes
//server.use('/dom', domRouter);
//server.use('/climate', climateRouter);
server.use('/garden', gardenRouter);
//server.use('/security', securityRouter);



// catch 404 and forward to error handler
server.use(function(req, res, next) {
    next(createError(404));
});

// error handler
server.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// HTTPS config
const serverHTTPS = https.createServer(httpsOptions, server);

// Web sockets
const io = new Server(serverHTTPS, {
    cors: corsOptions
});

/*io.on('connection', socket => {
    console.log("Connected to socket io");

    socket.on('activate_cam', data => {
        sendStartStopFeedToQueue(true);
    });

    socket.on('deactivate_cam', data => {
        sendStartStopFeedToQueue(false);
    });

    socket.on('disconnect', () => {
        sendStartStopFeedToQueue(false);
    });
});*/

// consume active RabbitMQ queues
consumeProgramStatusQueue();
//consumeCameraFeedQueue(io);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    /*serverHTTPS.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });*/
});

module.exports = server;