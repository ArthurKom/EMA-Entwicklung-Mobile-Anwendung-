const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
//app.use('/users', require('./routes/routeview'));
app.use('/users', require('./routes/routeeinlogsystem'));


//app.use('/statemodifie',require('./routes/routestatemodifie'))

// Start the server
const port = process.env.PORT || 3002;
app.listen(port);
console.log(`Server listening at ${port}`);