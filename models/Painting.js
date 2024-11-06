const mongoose = require('mongoose');

const paintingSchema = new mongoose.Schema({
    ArtistID: Number,
    FirstName: String,
    LastName: String,
    ImageFileName: String,
    Title: String,
    GalleryID: Number,
    GalleryName: String,
    GalleryCity: String,
    GalleryCountry: String,
    Latitude: Number,
    Longitude: Number,
    Description: String,
    YearOfWork: Number,
    Width: Number,
    Height: Number,
    Medium: String,
    Cost: Number,
    MSRP: Number,
});

module.exports = mongoose.model('Painting', paintingSchema);