const express = require("express");
// create a server instance
const app = express();

// set costant to port
const port = process?.env.PORT || 3000;

//Other imports
const errorsHandler = require("./middlewares/errorsHandles");
const notFound = require("./middlewares/notFound");
const corsPolicy = require("./middlewares/corsPolicy");
const moviesRouter = require("./routers/moviesRouter");

app.use(express.static("public"));

app.use(corsPolicy);

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.use("/api/movies", moviesRouter);

app.use(errorsHandler);

app.use(notFound);

//server must listen on your host and your port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
