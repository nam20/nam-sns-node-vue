var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var flash = require('connect-flash')

var redis = require('redis')
var session = require('express-session')
var RedisStore = require('connect-redis')(session)


var sequelize = require('./models').sequelize;
const passport = require('passport')
const helmet = require('helmet');
const hpp = require('hpp');
const logger = require('./logger')

require('dotenv').config()
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
let boardsRouter = require('./routes/boards')
let boardRouter = require('./routes/board')
let hashtagRouter = require('./routes/hashtag')
const passportConfig = require('./passport')
const https = require('https')
const http = require('http')
const fs = require('fs')

var app = express();
sequelize.sync();
passportConfig(passport)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port',process.env.PORT || 3000)

if(process.env.NODE_ENV === 'production'){
  app.use(morgan('combined'))
  app.use(helmet())
  app.use(hpp())
}else{
  app.use(morgan('dev'));
}


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',express.static(path.join(__dirname,'/')))



let redisClinet = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

var redisConnectionResult = redisClinet.auth(process.env.REDIS_PASSWORD, err => {

  if (err) console.log(err, " 에러 발생");

});
// console.log("redis 연결 결과 - ", redisConnectionResult);

app.use(session({
  resave:false,
  saveUninitialized:false,
  secret:process.env.COOKIE_SECRET,
  cookie:{
    httpOnly:true,
    secure:false
  },
  store: new RedisStore({ 
    client:redisClinet,
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    pass:process.env.REDIS_PASSWORD,
    logErrors:true 
    })
}))

app.use(passport.initialize())
app.use(passport.session())


app.use('/', indexRouter);
app.use('/boards',boardsRouter)
app.use('/board',boardRouter)
app.use('/user', usersRouter);
app.use('/hashtag',hashtagRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// const options = {
//     pfx: fs.readFileSync('certificate.pfx'),
    
// }
const options = {
  ca: fs.readFileSync('/etc/letsencrypt/live/skagmlwns123.duckdns.org/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/skagmlwns123.duckdns.org/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/skagmlwns123.duckdns.org/cert.pem')
};

https.createServer(options,app).listen(app.get('port'))
//http.createServer(app).listen(app.get('port'))
//app.listen(app.get('port'))

//module.exports = app;
