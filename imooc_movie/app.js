var express = require('express');
var mongoose = require('mongoose');
var serveStatic = require('serve-static');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var connectMultiparty = require('connect-multiparty');
var morgan = require('morgan');
var port = process.env.PORT || 3000;
var app = express();

mongoose.connect('mongodb://localhost/imooc');

app.set('views','./app/views/pages');//设置视图的根目录
app.set('view engine', 'jade'); //设置模板引擎
app.use(serveStatic('./public')); //设置静态资源路径
app.use(cookieParser());
app.use(cookieSession({
	secret: 'imooc'
}));
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({extended:true})); //将表单数据格式化
app.use(connectMultiparty()); // 处理混合表单
app.locals.moment = require('moment'); //在本地文件中引入

app.listen(port);

if('development' === app.get('env')){
	app.set('showStackError', true); //将错误信息从屏幕打印出来
	app.use(morgan(':method :url :status'));
	app.locals.pretty = true;
	mongoose.set('debug', true);
}



console.log('imooc started on port' + port);

require('./config/routes')(app)

