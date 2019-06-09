const express = require("express");
const app = express();
const port = 3000;

const controller = require("./lib/controller.js");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({
    extended: false
}));

app.get("/", (req, res) => {
    let movies = controller.getAllMovies();
    res.render("index", { movies: movies});
});

app.get("/create", (req, res) => {
    controller.saveMovie(req.query.title).then(movie => {
        if(movie){
            res.render("index", { movies: [movie] });
        } else {
            res.redirect("/");
        }
    });
});

app.get("/movie/:id", (req, res) => {
    controller.getMovieById(req.params.id);
    res.end();
});

app.post("/movie/:id/delete", (req, res) => {
    controller.deleteMovie(req.params.id);
    res.end();
});

app.get("/movie/:id/edit", (req, res) => {
    controller.getMovieById(req.params.id);
    res.end();
});

app.post("/movie/:id/update", (req, res) => {
    controller.updateMovie(req.params.id, req.body);
    res.end();
});

app.listen(port, () => console.log("Listening on port " + port));
