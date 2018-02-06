require("dotenv").config();

var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");
var log = require('simple-node-logger').createSimpleFileLogger('./log.txt');
log.setLevel('all');

// Function for Twitter tweets
var tweetMe = function() {

    var client = new Twitter(keys.twitter);

    var params = { screen_name: 'ughh_give' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {

            for (i = 0; i < tweets.length; i++) {
                logOutput(' ');
                logOutput(tweets[i].created_at);
                logOutput(tweets[i].text);
            }
        } else {
            logOutput(error);
        }
    });
}

// Function for Spotify songs
var artistNames = function(artist) {
    return artist.name;
}

var spotifyMe = function(songName) {

    var spotify = new Spotify(keys.spotify);

    if (songName === undefined) {
        songName = "the sign ace of base";
    }

    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            return logOutput('Error occurred: ' + err);
        }

        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            logOutput(i);
            logOutput('artist(s): ' + songs[i].artists.map(artistNames));
            logOutput('song name: ' + songs[i].name);
            logOutput('album: ' + songs[i].album.name);
            logOutput('preview song: ' + songs[i].preview_url);
            logOutput('---------------------------------------------------')
        }
    });
}

// Function for OMDB movies
var movieMe = function(movieTitle) {

    if (movieTitle === undefined) {
        movieTitle = "mr nobody";
    }

    request('http://www.omdbapi.com/?apikey=trilogy&t=' + movieTitle + '&y=&plot=short&tomatoes=true&r=json', function(error, response, body) {
        if (!error && response.statusCode == 200) {

            var movie = JSON.parse(body);

            logOutput();
            logOutput("Movie Title: " + movie.Title);
            logOutput("Release Year: " + movie.Year);
            logOutput("IMDB Rating: " + movie.imdbRating);
            for (var i = 0; i < movie.Ratings.length; i++) {
                if (movie.Ratings[i].Source === "Rotten Tomatoes") {
                    logOutput("* Rotten Tomatoes Rating:     " + movie.Ratings[i].Value);
                    if (movie.Ratings[i].Website !== undefined) {
                        logOutput("* Rotten Tomatoes URL:        " + movie.Ratings[i].Website);
                    }
                }
            }
            logOutput("Country Produced In: " + movie.Country);
            logOutput("Language: " + movie.Language);
            logOutput("Actors: " + movie.Actors);
            logOutput("Plot: " + movie.Plot);
            logOutput();
        }
    });
}

var randomMe = function() {
    fs.readFile('random.txt', 'utf8', function(err, data) {
        if (err) throw err;

        var dataArr = data.split(',');

        if (dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length == 1) {
            pick(dataArr[0]);
        }
    });
}

// Function that allows user to select which search feature they want to use
var pick = function(caseData, functionData) {
    switch (caseData) {
        case 'my-tweets':
            tweetMe();
            break;
        case 'spotify-this':
            spotifyMe(functionData);
            break;
        case 'movie-this':
            movieMe(functionData);
            break;
        case 'random-me':
            randomMe(functionData);
            break;
        default:
            logOutput("LIRI don't know!")
    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

// Function that logs the results to log.txt
function logOutput(logText) {
    log.info(logText);
    console.log(logText);
}

runThis(process.argv[2], process.argv[3]);