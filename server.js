var parseString = require('xml2js').parseString;
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var express = require('express');
var request = require('request'); //Used for external http requests
//var mysql = require('mysql');
//var qr = require('qr-image');
var path = require('path');
var cors = require('cors');
//var fs = require('fs'); //Used to read local files
var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'public')));
//var filePath = path.join(__dirname, 'public/text_files/MegaCustomOSHASigns.csv'); //Filepath for fs to read from

/**
 * Displays the main page
 * @return main page of webapp
 */
app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/getHot100', function(req, res) {
    request('http://www.billboard.com/rss/charts/hot-100', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parseString(body, function (err, result) {
                res.send(result.rss.channel[0].item);
            });
        }else {
            res.send('error');
        }
    })
})

app.get('/getTop40', function(req, res) {
    request('http://usatoday30.usatoday.com/life/music/airplay/Top40.js', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(JSON.parse(body.replace(/formatData = /g, '').replace(/;/g, '')));
        }else {
            res.send('error');
        }
    })
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
})