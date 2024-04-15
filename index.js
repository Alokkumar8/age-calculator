const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const path = require("path");

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.use('/img',express.static(path.join(__dirname, 'public/img')));
app.use('/js',express.static(path.join(__dirname, 'public/js')));
app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.use('/lib',express.static(path.join(__dirname, 'public/lib')));
app.use('/mail',express.static(path.join(__dirname, 'public/mail')));
app.use('/scss',express.static(path.join(__dirname, 'public/scss')));

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/category", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(path.join(__dirname, "category.html"));
});

app.get("/contact", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.sendFile(path.join(__dirname, "contact.html"));
});

app.get("/api-get-age", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  var d1 = req.body.day;
  var m1 = req.body.month;
  var y1 = req.body.year;

  var date = new Date();
  var d2 = date.getDate();
  var m2 = 1 + date.getMonth();
  var y2 = date.getFullYear();
  var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if(d1 > d2){
  	d2 = d2 + month[m2 - 1];
  	m2 = m2 - 1;
  }
  if(m1 > m2){
  	m2 = m2 + 12;
  	y2 = y2 - 1;
  }
  var d = d2 - d1;
  var m = m2 - m1;
  var y = y2 - y1;

  res.json({ "age" : 'Your Age is '+y+' Years '+m+' Months '+d+' Days'});
});



module.exports = app;
