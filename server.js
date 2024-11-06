// Setup the connection to MongoDB Atlas and Basic Server Configs
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const uri = "mongodb://localhost:27017/artGallery"; 

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Import painting model
const Painting = require('./models/Painting');

// Implement API Endpoints

// GET /api/paintings: Retrieve all the paintings
app.get('/api/paintings', async (req, res) => {
    try {
        const paintings = await Painting.find();
        res.json(paintings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching paintings", error });
    }
});

// GET /api/paintings/:id: Retrieve a painting by ID
app.get('/api/paintings/:id', async (req, res) => {
    try {
        const painting = await Painting.findById(req.params.id);
        if (!painting) return res.status(404).json({ message: "Painting not found" });
        res.json(painting);
    } catch (error) {
        res.status(500).json({ message: "Error fetching painting", error });
    }
});