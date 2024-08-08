const express = require("express");
const connect = require("./connection/connect.js");
const cors = require("cors");
const mainRouter = require("./routes/index.js")
const app = express();

app.use(express.json());
app.use(cors());



//connect to DB
connect();

//routes
app.use("/api/v1", mainRouter)



app.listen(3000, ()=> {
    console.log("server started on server 3000...");
})

