const _ = require("lodash");
const lodashId = require('lodash-id');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('database/db.json');
const db = low(adapter);

db._.mixin(lodashId);
db._.id = 'key';

let database = {
    getAllMovies: function() {
        return db.get("movies").value();
    },
    saveMovie: function(movie) {
        let data = {
            "title": "",
            "poster": "",
            "actors": "",
            "awards": "",
            "country": "",
            "director": "",
            "genre": "",
            "language": "",
            "plot": "",
            "rated": "",
            "released": "",
            "runtime": "",
            "imdbRating": ""
        };

        // Convert movie attributes names to camelCase. Note: it is not recursive.
        let normalizedData = _.mapKeys(movie, (value, key) => _.camelCase(key));
        for (prop in data) {
            data[prop] = normalizedData[prop];
        }

        const collection = db
            .defaults({ movies: [] })
            .get('movies');

        const newMovie = collection
            .insert({value: data})
            .write();

        return newMovie;
    },
    checkMovieExists: function(title) {
        const collection = db
            .defaults({ movies: [] })
            .get('movies');

        const foundMovie = collection
            .map("value")
            .find({title: "Planes"})
            .value();

        return foundMovie;
    },
    getMovieById: function(movieKey) {},
    deleteMovie: function(movieKey) {},
    updateMovie: function(movieKey, changedData) {}
};

module.exports = database;
