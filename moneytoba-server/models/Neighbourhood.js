const mongoose = require("mongoose")
const neighborhoodSchema = new mongoose.Schema({
  commName: {
    type: String,
    required: true
  },
  neighName: {
    type: String,
    required: true
  },
  geometry: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
});


const Neighborhood = mongoose.model("Neighborhood", neighborhoodSchema)
module.exports = Neighborhood;