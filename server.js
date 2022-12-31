const express = require('express');
const path = require("path");
const morgan = require("morgan");

const app = express();

app.use(morgan("combined"));

var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html', 'css', 'js', 'ico', 'jpg', 'jpeg', 'png', 'svg'],
    index: ['index.html'],
    maxAge: '1m',
    redirect: false
};

app.use(express.static(path.join(__dirname, '/build'), options));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`React app listening at http://localhost:${port}`);
})