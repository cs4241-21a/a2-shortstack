const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const db = [
    { 'flightNum': "AA001", 'depAirport': "JFK", 'arrAirport': "WOR", 'date':"2021-9-9"},
    { 'flightNum': "AA001", 'depAirport': "JFK", 'arrAirport': "WOR", 'date':"2021-9-20"},
    { 'flightNum': "AA001", 'depAirport': "JFK", 'arrAirport': "WOR", 'date':"2021-9-8"},
    { 'flightNum': "AA001", 'depAirport': "JFK", 'arrAirport': "WOR", 'date':"2021-9-5"},

];

app.get('/getUpcoming', function (req, res) {
    res.json(db.filter((item) => new Date(item.date).valueOf() >= new Date().valueOf()));
});

app.get('/getPast', function (req, res) {
    res.json(db.filter((item) => new Date(item.date).valueOf() < new Date().valueOf()));
});

app.post('/add', function (req, res) {
    db.push(req.body);
    res.json({code: 200, msg: 'success'});
});

app.use('/', express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Listening at ${port}`)
});