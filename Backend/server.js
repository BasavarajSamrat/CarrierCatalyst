require("dotenv").config();
require("./config/dbConfig");

const express = require("express");
const app = express();


const cors = require("cors");
app.use(express.json());
app.use(cors());

app.get("/", (req,res)=>{
  res.end("welcome to carrierCatalyst")
})

const categoryRoute = require("./routes/categoryRoute");
const usersRoute = require("./routes/usersRoute");
const examsRoute = require("./routes/examsRoute");
const resportsRoute = require("./routes/reportsRoute");


app.use("/api/users", usersRoute);
app.use("/api/exams", examsRoute);
app.use("/api/reports", resportsRoute);
app.use("/api/categories", categoryRoute);


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
