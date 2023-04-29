const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Neighborhood = require('../models/Neighbourhood.js');

// Load environment variables from .env file
function loadEnvVariables() {
  const dotenv = require('dotenv');
  const envFilePath = path.join('D:/git/moneytoba/moneytoba-server', '.env');
  const envConfig = dotenv.parse(fs.readFileSync(envFilePath));

  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}

// Connect to MongoDB
async function connectToDb(mongoUri) {
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// Query all neighborhoods and display them
async function displayImportedData() {
  const neighborhoods = await Neighborhood.find({});
  console.log('Total neighborhoods imported:', neighborhoods.length);
  console.log('Neighborhood data:\n', neighborhoods);
}

// Close the MongoDB connection
function closeConnection() {
  mongoose.connection.close();
}

async function main() {
  try {
    loadEnvVariables();
    const mongoUri = process.env.MONGO_URI;
    await connectToDb(mongoUri);
    await displayImportedData();
    closeConnection();
  } catch (error) {
    console.error('Error while fetching data:', error.message);
    closeConnection();
  }
}

main();
