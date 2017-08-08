var express = require('express');
var app = express();
var path = require('path');
var httpProxy = require('http-proxy');


let child_process = require('child_process'),
	path_url = 'index.html';

var proxy = new httpProxy.createProxyServer({
	target: {
		host: 'kdkc365.com',
		port: 80
	}
});


//代理中间件
app.use(function(req, res, next) {
	console.log(req.url);
	if (req.url.match(new RegExp('^(\/main\/|\/shoppingcart\/|\/cart\/|\/member\/|\/my\/|\/maintenance\/)'))) {
		console.log('proxy to: kdkc365.com');
		proxy.web(req, res);
	} else if (req.url.match(new RegExp('^(\/changanshop_pay\/)'))) {
		console.log('proxy to: kdkc365.com');
		newProxy.web(req, res);
	} else {
		next();
	}
});

app.use(express.static(path.resolve('.')));

app.get('/', function(req, res) {
	res.redirect(path_url);
});


app.listen(process.env.PORT || 8003);
console.log('i am up at 8003');

if (process.platform == 'wind32') {
	cmd = 'start "%ProgramFiles%\Internet Explorer\iexplore.exe"';
} else if (process.platform == 'linux') {
	cmd = 'xdg-open';
} else if (process.platform == 'darwin') {
	cmd = 'open';
}
child_process.exec(`${cmd} "${path_url}"`);