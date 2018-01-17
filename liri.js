require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs"); //file system
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var userCommand = process.argv[2];
var command = process.argv[3];


switch (userCommand) {
    case "movie-this":
        //for (var i = 2; i < command.length; i++) {
        //command = " " + command[i];
        //}
        movieName(command);

        break;

    case "my-tweets":
        getTweets();
        break;

    case "spotify-this-song":
        // for (var i = 2; i < command.length; i++) {
        //     command = " " + command[i];
        spotifyThis(command);
        break;

}

function getTweets() {
    var client = new twitter(keys.twitter);
    var params = {
        screen_name: "tokyorain27",
        count: 20,

    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            //console.log(tweets);
            for (i = 0; i < tweets.length; i++) {
                console.log("Created at: " + tweets[i].created_at);
                console.log("Text: " + tweets[i].text);
                console.log("Hashtags: " + tweets[i].hashtags);
                console.log('--------------------------------------');
            }
        } else {
            console.log(error);
        }
    });
}


function movieName() {
    console.log("testing");

    //      console.log(queryUrl);
    request(
        "http://www.omdbapi.com/?t=" +
        command +
        "&y=&plot=short&r=json&tomatoes=true&apikey=trilogy",
        function(error, response, body) {
            var body = JSON.parse(body);
            // If the request was successful...
            if (!error && response.statusCode === 200) {

                console.log("The title is: " + body.Title);
                console.log("Year Released: " + body.Year);
                console.log("Rated: " + body.Rated);
                console.log("The Rotten Tomato rating is: " + body.Ratings[1].Value);
                console.log("The language is: " + body.Language);
                console.log("The movie is about: " + body.Plot);
                console.log("The actors are: " + body.Actors);
            }

        }

    );
}

function spotifyThis() {
    var spotify = new Spotify(keys.spotify);
    spotify.search({
        type: "track",
        query: command
    }, function(
        err,
        data
    ) {
        if (err) {
            console.log("Error occurred: " + err);
            return;
        }
        console.log("");
        console.log("Spotify Song Info: ");
        console.log("--------------------------");
        console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
        console.log("Track Title: " + data.tracks.items[0].name);
        console.log("Link to Song: " + data.tracks.items[0].preview_url);
        console.log("Album Title: " + data.tracks.items[0].album.name);
        console.log("--------------------------");
    });
}