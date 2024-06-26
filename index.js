const express = require("express");
const app = express();
require('dotenv').config()
const helmet = require('helmet');
const cookieParser = require('cookie-parser')
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")
const rateLimit = require('express-rate-limit');
const setupSwagger = require('./swagger');


const PORT = process.env.APP_PORT || 4000;

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true, limit: "1kb" }));
app.use(express.json({ limit: '1kb' }));
app.use(cookieParser());
app.use(compression());
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
const limiter = rateLimit({
    windowMs: 20 * 60 * 1000, 
    max: 9000, 
    message: 'Too many requests from this IP, please try again later.',
    keyGenerator: function (req /*, res*/) {
      return req.ip; 
    }
  });
app.use(limiter);


const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

app.use('/api/v1/refresh-token', require('./route/refreshtokenRoutes.js'));
app.use('/api/v1/auth', require('./route/authRoutes.js'));
app.use('/api/v1/user', require('./route/userRoutes.js'));
app.use('/api/v1/class', require('./route/classRoutes.js'));
app.use('/api/v1/com', require('./route/commentsRoutes.js'));
app.use('/api/v1/post', require('./route/postRoutes.js'));
app.use('/api/v1/form', require('./route/formRoutes.js'));

setupSwagger(app);

app.use(
    '*',
    catchAsync(async (req, res, next) => {
        throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
    })
);
app.use(globalErrorHandler);


app.listen(PORT, () =>{
console.log("sever run on port " +  PORT);
});