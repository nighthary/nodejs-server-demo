var express = require('express');
var app = express();
var path = require('path');
var httpProxy = require('http-proxy');

var opn = require('opn')

let open_port = 8003,
	path_url = 'index.html',
	open_url = `http://localhost:${open_port}`;

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


app.listen(process.env.PORT || open_port);
console.log(`i am up at ${open_port}`);

opn(open_url)