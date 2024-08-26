const express = require("express");
const app = express();

const router = express.Router();

app.use(express.json());

router.use("/api/v1", mainRouter)


app.listen(3000, () => {
    console.log("app listening on port 3000")
})