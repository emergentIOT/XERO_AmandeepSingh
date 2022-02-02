const express = require('express');
const logger = require('morgan');
const config = require('./config/config');
const bodyParser = require('body-parser');
require('./config/mongoose');
//API Calls 
const routes = require('./routes/index');
const handleErrors = require('./middleware/handleError');
const { NotFound } = require('./utils/errors');


const app = express();

if(config.env == 'development') {
    app.use(logger('dev'));
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

//APIs
app.use('/api', routes);
//Invalid endpoints.
app.get('*', (req,res) => { throw new NotFound('invalid endpoint.') });
//Middleware to handle errors.
app.use(handleErrors);
app.listen(config.port, () => {
    console.log(`Server is up and running at ${config.port}, running in ${config.env}`);
})