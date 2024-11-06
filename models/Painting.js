const mongoose = require('mongoose');

const paintingSchema = new mongoose.Schema({
    PaintingID: Number,
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
    ShapeID: Number,                    
    MuseumLink: String,
    AccessionNumber: String,
    CopyrightText: String,
    Excerpt: String,
    WikiLink: String,
    JsonAnnotations: Object,            
    ShapeName: String
});

module.exports = mongoose.model('Painting', paintingSchema);