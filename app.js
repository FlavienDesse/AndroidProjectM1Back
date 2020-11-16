const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const corsOptions = {
  origin: true,
  credentials: true
};

dotenv.config();
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ limit: "200mb",  extended: true, parameterLimit: 1000000 }));
app.use(cors(corsOptions))

app.use(cookieParser());

app.get('/',function (req,res) {
  res.send({
        message :"gros pipi"
      }
  )
});


var router = require('./src/routes/index')


app.use('/', router)




module.exports = app;
