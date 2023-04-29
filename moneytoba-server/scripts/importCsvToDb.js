const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
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
async function connectToMongoDB(mongoUri) {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    mongoose.connection.close();
  }
}

// Save neighborhood data to MongoDB
async function saveNeighborhoodData(row) {
  if (
    !row['Comm Name'] ||
    !row['Neigh Name'] ||
    !row.Geometry ||
    isNaN(row['Latitude (generated)']) ||
    isNaN(row['Longitude (generated)']) ||
    isNaN(row.Count)
  ) {
    console.warn('Invalid data found in row:', row);
    return;
  }

  const neighborhood = new Neighborhood({
    commName: row['Comm Name'],
    neighName: row['Neigh Name'],
    geometry: row.Geometry,
    latitude: parseFloat(row['Latitude (generated)']),
    longitude: parseFloat(row['Longitude (generated)']),
    count: parseInt(row.Count),
  });

  await neighborhood.save();
}



// Import CSV data to MongoDB
async function importCsvToDb(mongoUri, csvFilePath) {
  await connectToMongoDB(mongoUri);

  const readStream = fs.createReadStream(csvFilePath);
  const promises = [];

  readStream
    .pipe(csvParser())
    .on('data', (row) => {
      promises.push(saveNeighborhoodData(row));
    })
    .on('end', async () => {
      try {
        await Promise.all(promises);
        console.log('CSV file imported successfully');
      } catch (error) {
        console.error('Error importing CSV file:', error.message);
      } finally {
        mongoose.connection.close();
      }
    })
    .on('error', (error) => {
      console.error('Error reading CSV file:', error.message);
      mongoose.connection.close();
    });
}

// Main function
async function main() {
  loadEnvVariables();

  const mongoUri = process.env.MONGO_URI;
  const csvFilePath = path.join(__dirname, 'Map_data.csv');

  await importCsvToDb(mongoUri, csvFilePath);
}

main();
