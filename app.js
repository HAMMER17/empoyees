const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
require('dotenv').config();
const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello Alex!')
})

app.use('/api/user', require('./routes/users'));
app.use('/api/employees', require('./routes/employees'));


app.listen(port, () => {
  console.log(`App listening to port ${port}`)
})
module.exports = app;
