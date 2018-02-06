require("dotenv").config();

var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");

// Function for Twitter tweets
var tweetMe = function() {

    var client = new Twitter(keys.twitter);

    var params = { screen_name: 'ughh_give' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            // console.log(tweets);
            for (i = 0; i < tweets.length; i++) {
                console.log(' ');
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
                console.log();
            }
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
            return console.log('Error occurred: ' + err);
        }

        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log('artist(s): ' + songs[i].artists.map(artistNames));
            console.log('song name: ' + songs[i].name);
            console.log('preview song: ' + songs[i].preview_url);
            console.log('album: ' + songs[i].album.name);
            console.log('---------------------------------------------------')
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

            console.log();
            console.log("Movie Title: " + movie.Title);
            console.log("Release Year: " + movie.Year);
            console.log("IMDB Rating: " + movie.imdbRating);
            console.log("Country Produced In: " + movie.Country);
            console.log("Language: " + movie.Language);
            console.log("Plot: " + movie.Plot);
            console.log("Actors: " + movie.Actors);

            for (var i = 0; i < movie.Ratings.length; i++) {
                if (movie.Ratings[i].Source === "Rotten Tomatoes") {
                    console.log("* Rotten Tomatoes Rating:     " + movie.Ratings[i].Value);
                    if (movie.Ratings[i].Website !== undefined) {
                        console.log("* Rotten Tomatoes URL:        " + movie.Ratings[i].Website);
                    }
                }
            }
            console.log();
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
        case 'spotify-this-song':
            spotifyMe(functionData);
            break;
        case 'movie-this':
            movieMe(functionData);
            break;
        case 'random-me':
            randomMe(functionData);
            break;
        default:
            console.log("LIRI don't know!")
    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);