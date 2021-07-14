const express = require('express');
const bodyParser = require('body-parser');
const hospitalRoutes = require('./routes/hospitals');
const departmentRoutes = require('./routes/departments');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// for CORS issue
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/hospitals', hospitalRoutes);
app.use('/api/departments', departmentRoutes);

module.exports = app;
