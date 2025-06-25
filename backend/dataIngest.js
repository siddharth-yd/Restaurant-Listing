require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Restaurant = require('./models/Restaurant');

const MONGO_URI = process.env.MONGO_URI;

async function ingestData() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    const filePath = path.join(__dirname, 'data', 'zomato_data.json');
    const rawData = fs.readFileSync(filePath);
    const jsonData = JSON.parse(rawData);

    const allRestaurants = [];

    jsonData.forEach(chunk => {
      const restaurants = Array.isArray(chunk.restaurants)
        ? chunk.restaurants.map(item => {
            const r = item.restaurant;
            const latitude = parseFloat(r.location.latitude);
            const longitude = parseFloat(r.location.longitude);

            const geoLocation = {
                type: "Point",
                coordinates: [longitude, latitude]
            };

            const locationDetails = {
                address: r.location.address,
                locality: r.location.locality,
                city: r.location.city,
                city_id: r.location.city_id,
                zipcode: r.location.zipcode,
                country_id: r.location.country_id
            };

            return {
                ...r,
                location: geoLocation,
                location_details: locationDetails
            };
            })
        : [];
      allRestaurants.push(...restaurants);
    });

    await Restaurant.deleteMany({});
    console.log("Old data cleared");

    await Restaurant.insertMany(allRestaurants);
    console.log(`Inserted ${allRestaurants.length} restaurants into MongoDB`);

    mongoose.disconnect();
  } catch (error) {
    console.error("Error loading data:", error);
    mongoose.disconnect();
  }
}

ingestData();
