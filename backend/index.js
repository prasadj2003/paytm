const express = require("express");
const app = express();
const rootRouter = require("./routes/index");


app.use(express.json());
app.use(cors());

app.use("/api/v1", rootRouter)


app.listen(3000, () => {
    console.log("app listening on port 3000")
})