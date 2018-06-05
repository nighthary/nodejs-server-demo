const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');

const opn = require('opn');

let open_port = 8081;

app.use(express.static(path.resolve('.')));

app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get('/signIn', function(req, res) {
  var query = req.query;

  const { name = '测试哟'} = query;
  const result = {
    status: 'OK',
    content: {
      name,
      status: 20
    }
  };

  console.log(name);
  res.status(200).send(JSON.stringify(result)).end();
});


app.post('/signIn', function(req, res) {
  var query = req.body;

  const { name = '测试啊' } = query;
  const result = {
    status: 'OK',
    content: {
      name,
      status: 20
    }
  };

  res.status(200).send(JSON.stringify(result)).end();
});

app.listen(process.env.PORT || open_port);
console.log(`i am up at ${open_port}`);
