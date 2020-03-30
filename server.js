require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data')
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/question', (req, res) => {
    res.status(200).json(data)
})

app.listen(port, () => console.log(`Listening on port ${port}`));