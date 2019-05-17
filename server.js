const express = require("express");
const bodyParser = require("body-parser");
const fetch = require('node-fetch');

const server = express();
const jsonParser = bodyParser.json();

server.use(express.static('public'));


server.get("/", function(req, res){
    res.render('index');
});


let latitude, longitude;
let answer;

server.post("/api", jsonParser, function(req, res){
    latitude = req.body.latitude;
    longitude = req.body.longitude;

    let urlAPI = 'https://api.darksky.net/forecast/af49ee175e30af7db4effabdaa3956e6/' + latitude + ',' + longitude;
    fetch(urlAPI)
        .then(res => res.json())
        .then(json => answer = json)
        .then(() => {
            if (answer.currently.icon == 'clear-day') answer.icon = '<img src="' + 'http://aux2.iconspalace.com/uploads/sun-icon-64-2033094031.png' + '" alt="clear-day">';
            if (answer.currently.icon == 'clear-night') answer.icon = '<img src="' + 'http://aux2.iconspalace.com/uploads/moon-icon-64-1178664423.png' + '" alt="clear-night">';
            if (answer.currently.icon == 'rain') answer.icon = '<img src="' + 'http://aux2.iconspalace.com/uploads/rain-icon-64.png' + '" alt="rain">';
            if (answer.currently.icon == 'snow') answer.icon = '<img src="' + 'http://aux2.iconspalace.com/uploads/snow-icon-64.png' + '" alt="snow">';
            if (answer.currently.icon == 'sleet') answer.icon = '<img src="' + 'http://aux2.iconspalace.com/uploads/sleet-icon-64.png' + '" alt="sleet">';
            if (answer.currently.icon == 'wind') answer.icon = '<img src="' + 'http://aux2.iconspalace.com/uploads/wind-turbine-icon-64.png' + '" alt="wind">';
            if (answer.currently.icon == 'fog') answer.icon = '<img src="' + 'http://aux.iconspalace.com/uploads/fog-day-icon-64.png' + '" alt="fog">';
            if (answer.currently.icon == 'cloudy') answer.icon = '<img src="' + 'http://aux.iconspalace.com/uploads/clouds-icon-64.png' + '" alt="cloudy">';
            if (answer.currently.icon == 'partly-cloudy-day') answer.icon = '<img src="' + 'http://aux2.iconspalace.com/uploads/partly-cloudy-day-icon-64.png' + '" alt="partly-cloudy-day">';
            if (answer.currently.icon == 'partly-cloudy-night') answer.icon = '<img src="' + 'http://aux2.iconspalace.com/uploads/partly-cloudy-night-icon-64.png' + '" alt="partly-cloudy-night">';
            if (answer.currently.icon == 'hail') answer.icon = '<img src="' + 'http://aux.iconspalace.com/uploads/hail-icon-64.png' + '" alt="hail">';
            if (answer.currently.icon == 'thunderstorm') answer.icon = '<img src="' + 'http://aux.iconspalace.com/uploads/1665515987.png' + '" alt="thunderstorm">';
            if (answer.currently.icon == 'tornado') answer.icon = '<img src="' + 'http://aux.iconspalace.com/uploads/13945230231448270544.png' + '" alt="tornado">';
            res.send(answer);
        });
});


server.listen(3000, 'localhost', () => console.log('Server start on 3000'));

