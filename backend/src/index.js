const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const patientRoutes = require('../routes/route');

const app = express();
const PORT = 8001;
const cors = require("cors");
app.use(cors());
app.use(express.json());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://127.0.0.1:27017/patientDB')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));


app.use('/api/patients', patientRoutes);
app.get("/test", (req, res) => {
  res.send("Backend alive");
});

app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});

