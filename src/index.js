const express = require('express');
const router = require('./routes');
const cookieParser = require('cookie-parser');
const { initilize } = require('./config/database');
const { auth } = require('./middlewares/authMiddlewares');
const { errorHandler } = require('./middlewares/errorHandlerMiddleware');

const app = express();
require('./config/handlebars')(app);
const port = 5000;

app.use('/static', express.static('public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(auth);
app.use(router);
app.use(errorHandler);

initilize()
    .then(() => {

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    })
    .catch(err => {
        console.log(err);
    });

