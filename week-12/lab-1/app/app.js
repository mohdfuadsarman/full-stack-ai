const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'pug');

app.get('/', function (req, res) {
    res.render('index', { title: 'Home Page', message: 'Welcome to the Home Page!' });
});
app.get('/viewAllProducts', function (req, res) {
    res.render('about', { title: 'About Page', message: 'Learn more about us on this page!' });
});
app.get('/createNewProduct', function (req, res) {
    res.render('contact', { title: 'Contact Page', message: 'Get in touch with us!' });
});
app.use(express.urlencoded({ extended: true }));
app.listen(port, function () {
    console.log(`Express app listening on port ${port}!`);
});