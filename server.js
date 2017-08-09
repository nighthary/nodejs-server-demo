const express = require('express');
const app = express();
const path = require('path');
const httpProxy = require('http-proxy');

const opn = require('opn')

let open_port = 8004,
	path_url = '/GS-UI/index.html',
	open_url = `http://localhost:${open_port}${path_url}`;

app.use(express.static(path.resolve('.')));

app.get('/', function(req, res) {
	res.redirect('./GS-UI/index.html');
});


app.listen(process.env.PORT || open_port);
console.log(`i am up at ${open_port}`);

opn(open_url)