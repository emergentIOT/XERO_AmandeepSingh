const express = require('express');
const logger = require('morgan');
const config = require('./config/config');

//API Calls 
const routes = require('./routes');


const app = express();

if(config.env == 'development') {
    app.use(logger('dev'));
}

app.use('/api', routes);

app.listen(config.port, () => {
    console.log(`Server is up and running at ${config.port}, running in ${config.env}`);
})