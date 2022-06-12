const express = require('express');
const router = require('./routes');
const { initilize } = require('./config/database');

const app = express();
require('./config/handlebars')(app);
const port = 5000;

app.use('/static', express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(router);

initilize()
    .then(() => {

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });

