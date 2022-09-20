const express = require('express');
//const logger = require('morgan');
const config = require('./config/config');
const bodyParser = require('body-parser');
require('./config/mongoose');
//API Calls 
const routes = require('./routes/index');


const app = express();

if(config.env == 'development') {
  //  app.use(logger('dev'));
}
//parsing from API
app.use(bodyParser.json())

//Extended: true ---> extend the native feature of nodejs, eg 
// req.body.
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', routes);

app.get('*', (req,res) => {
    res.json({
       message: 'Invalid endpoint'
   })
}) ;

app.listen(config.port, () => {
    console.log(`Server is up and running at ${config.port}, running in ${config.env}`);
})