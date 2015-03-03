var parseString = require('xml2js').parseString;
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var cv2json = require('convert-json');
var request = require('request'); //Used for external http requests
var express = require('express');
var path = require('path');
var cors = require('cors');
var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'public')));

/**
 * Displays the main page
 * @return main page of webapp
 */
app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/PhilCharts/:chart', function(req, res) {
    cv2json.csv('./charts/' + new Date().getFullYear() + ' ' + req.params.chart + '.csv', function(err, result) {
        if(err) {
            res.send(err);
        }else {
            res.send(result);
        }
    });
});

app.get('/Hot100', function(req, res) {
    request('http://www.billboard.com/rss/charts/hot-100', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            parseString(body, function (err, result) {
                res.send(result.rss.channel[0].item);
            });
        }else {
            res.send('error');
        }
    })
});

app.get('/Top40', function(req, res) {
    request('http://usatoday30.usatoday.com/life/music/airplay/Top40.js', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(JSON.parse(body.replace(/formatData = /g, '').replace(/;/g, '').replace(/&amp/g, '&')));
        }else {
            res.send('error');
        }
    })
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});