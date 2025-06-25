const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  id: Number,
  name: String,
  url: String,
  cuisines: String,
  average_cost_for_two: Number,
  price_range: Number,
  currency: String,
  has_table_booking: Number,
  has_online_delivery: Number,
  is_delivering_now: Number,
  featured_image: String,
  thumb: String,
  user_rating: {
    aggregate_rating: String,
    rating_text: String,
    rating_color: String,
    votes: String
  },

  // GeoJSON location
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },

  // Store original address/location details separately
  location_details: {
    address: String,
    locality: String,
    city: String,
    city_id: Number,
    zipcode: String,
    country_id: Number
  },

  photos_url: String,
  menu_url: String,
  events_url: String,
  book_url: String,
  deeplink: String,
});

// Create a geospatial index for queries using this field
RestaurantSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Restaurant', RestaurantSchema);
