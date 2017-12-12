var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
//var RedisStore = require('connect-redis')(session);
var bodyParser = require('body-parser');
var config = require('config');
/*var mongoose = require('mongoose');*/
var exphbs = require('express-handlebars');
var hbsHelper = require('handlebars-helpers')();
var app = express();
app.locals.config =config.viwConfig;
app.locals.zgConfig = JSON.stringify(config.viwConfig);
app.locals.isDev = process.env.NODE_ENV === 'develop';
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

var docRoute = require('./app/routes/doc.server.route.js');
var userRoute = require('./app/routes/user.server.route.js');
var indexRoute = require('./app/routes/index.server.route.js');
var productRoute = require('./app/routes/product.server.route.js');
var cartRoute = require('./app/routes/cart.server.route.js');
var userCenterRoute = require('./app/routes/userCenter.server.route.js');
var categoryRoute = require('./app/routes/category.server.route.js');
var orderRoute = require('./app/routes/order.server.route.js');
var userOrderRouter = require('./app/routes/userOrder.server.route.js');
var comfirmedOrderRouter = require('./app/routes/comfirmedOrder.server.route.js');
var searchRoute = require('./app/routes/search.server.route.js');
var indexController=require('./app/controllers/index.server.controller');
var aboutRoute = require('./app/routes/about.server.route.js');
var cooperationRoute = require('./app/routes/cooperation.server.route.js');
var helpRoute = require('./app/routes/help.server.route.js');
var businessRoute = require('./app/routes/business.server.route.js');
var copyrightRoute = require('./app/routes/copyright.server.route.js');
var webimRoute = require('./app/routes/webim.server.route.js');
var uploadRoute = require('./app/routes/upload.server.route.js');
var tradSearchRoute = require('./app/routes/tradSearch.server.route.js');
var specialRoute = require('./app/routes/special.server.route.js');
var compression = require('compression');
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', '.html'); // app.set('view engine', 'ejs');
app.engine('.html', exphbs({defaultLayout:'main',layoutsDir:'app/views/layouts',extname:'.html',partialsDir:'app/views/partials',helpers:hbsHelper}));
app.set('views',__dirname+'/app/views');
/*app.set("view options", {
  "layout": false
});*/
// uncomment after placing your favicon in /public
app.use(logger('combined',{
  skip: function (req, res) {
    return res.statusCode < 400;
  },
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({
  secret: '0123456789qwertyuioplkjhgfdsazxcvbnm', // 建议使用 128 个字符的随机字符串
  cookie: { maxAge: 6000 * 1000  },
  //store: new RedisStore(),
  rolling: true,
  resave: false,                  // 重新保存：强制会话保存即使是未修改的
  saveUninitialized: false        // 强制“未初始化”的会话保存到存储
}));
/*app.use(session({
  store: new  RedisStore({
    'host':config.redisHost,
    'port':config.redisPort[Math.floor(Math.random()*6)],
    'ttl':60*60*24*30
  }),
  secret:'express is powerful'
}));*/

// 设置静态文件缓存时间为7天
//app.use(express.static(__dirname+'/public', {maxAge: 7*86400}));
app.use(express.static(__dirname+'/public'));
// 启用压缩
app.use(compression());

app.use(function(req, res, next){
  res.locals.session = req.session;
  req.session.menu = JSON.parse(localStorage.getItem('menu'));
  var url = '/'+req.originalUrl.split("/")[1]+'/';
  if (!req.session.user) {
      if(config.auth.indexOf(url)!==-1){
        if(req.headers['x-requested-with'] && req.headers['x-requested-with'].toLowerCase() == 'xmlhttprequest' || req.headers.accept.indexOf("application/json")!=-1){
          return res.json({code: "W_100004", message: "用户未登录或登录超时，请登录！", success: false});
        }
        if(req.originalUrl.indexOf('showOrderContract')=='-1'){
          if(req.originalUrl == '/order/account' && req.body.ids){
            res.cookie('ids', req.body.ids);
          }
          return res.redirect("/user/login?ReturnOldUrl="+encodeURIComponent(req.originalUrl));
        }
      }

    // if( url == "/cart" || url== '/order' || "/search"){//不是所有的跳转都是要跳到登入页面的。拦截需要的页面
    //   return res.redirect("/reg");
    // }
  }
  if(!req.session.menu){
    indexController.getMenuFn(req);
  }
  next();
});

app.get('/logout', function(req, res){
  req.session.user = null;
  req.session.error = null;
  res.redirect('/');
});
app.use('/',indexRoute);
app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/cart', cartRoute);
app.use('/order', orderRoute);
app.use('/userCenter', userCenterRoute);
app.use('/category', categoryRoute);
app.use('/userOrder', userOrderRouter);
app.use('/comfirmedOrder', comfirmedOrderRouter);
app.use('/search', searchRoute);
app.use('/about', aboutRoute);
app.use('/cooperation', cooperationRoute);
app.use('/help', helpRoute);
app.use('/business', businessRoute);
app.use('/copyright', copyrightRoute);
app.use('/webim', webimRoute);
app.use('/upload', uploadRoute);
app.use('/tradSearch', tradSearchRoute);
app.use('/special', specialRoute);
// catch 404 and forward to error handler
app.get('*', function(req, res){
  res.render('404', {
    title: 'No Found'
  })
});
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
 });


module.exports = app;