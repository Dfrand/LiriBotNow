# LiriBot-node.js

LIRI is a Language Interpretation and Recognition Interface. Use LIRI to get your latest tweets, find out about a song, or a movie, or just choose a random action from your own random file.
___
## Installs

The package.json lists dependent node packages, but for your convenvice, these are the ones to install.

### Spotify
`npm install node-spotify-api`

### Request
`npm install request`

### Dotenv
`npm install dotenv`

### FS
`npm install fs`

### Simple Node Logger
`npm install simple-node-logger`
___
## Get Started

Here's a quick rundown of the commands you can use in LIRI.

### Get Tweets
Retrieves up to your latest 20 tweets:

`node liri.js my-tweets`

### Get Song Info
Retrieves song information for a track:

`node liri.js spotify-this "*American Woman*"`

### Get Movie Info
Retrieves movie information for a movie:

`node liri.js movie-this "*Get Out*"`

### Get Random Info
Gets random text inside a file and does what it says:

`node liri.js random-me`