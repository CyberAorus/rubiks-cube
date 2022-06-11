const express = require('express');
const hbs = require('express-handlebars');
const router = require('./routes');

const app = express();
const port = 5000;


app.use('/static', express.static('public'));

app.engine('hbs', hbs.engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');
app.use(router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});