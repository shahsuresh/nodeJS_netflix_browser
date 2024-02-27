import express from "express";
import connectDB from "./connect.db.js";
import movie from "./netflix.model.js";
import bodyParser from "body-parser";
import path from "path";

const app = new express();
// Parse incoming requests with JSON payloads
app.use(bodyParser.json());
// Serve static files to app
app.use(express.static(path.join("")));
// Parse incoming requests with URL-encoded payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// make app understand json
app.use(express.json());
//?===========database connection=================
connectDB();
//?=====================routes====================
//add new movie details in database table
app.post("/movie/add", async (req, res) => {
  try {
    let name = req.body.name;
    let length = req.body.length;
    let actorName = req.body.actorName;
    let rating = req.body.rating;

    let newMovie = {
      name: name,
      length: length,
      actorName: actorName,
      rating: rating,
    };

    await movie.create(newMovie);
    res
      .status(201)
      .send(
        `<center><h1>${newMovie.name}</h1> movie added Successfully</center>`
      );
    //return res.redirect("/index.html");
  } catch (error) {
    console.log(error.message);
  }
});
//route for onloading page
app.get("/", (req, res) => {
  res.sendFile("/index.html");
  // res.set({
  //   "Access-control-Allow-Origin": "*",
  // });
});

// assign port to the app
const PORT = 4001;
app.listen(PORT, () => {
  console.log(`App is listening at: http://localhost:${PORT}`);
});
