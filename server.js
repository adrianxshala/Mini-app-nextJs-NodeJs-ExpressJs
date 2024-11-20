const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = [];

app.post("/", (req, res) => {
  const { emri, mbiemri, mosha } = req.body;
  if (!emri || !mbiemri || !mosha) {
    return res.status(400).send("Të gjitha fushat janë të detyrueshme!");
  }
  data.push({ emri, mbiemri, mosha: parseInt(mosha, 10) });
  res.status(201).send("Të dhënat u shtuan me sukses!");
  
});


app.get("/api", (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Serveri po funksionon në http://localhost:${port}`);
});
