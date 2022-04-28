const express = require('express');
const port = 8000 || process.env.PORT;
const app = express();
const db = require('./config/mongoose');
app.use(express.json());
app.use('/', require('./routes/index'));
app.listen(port, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("server is running !!");
    }
})