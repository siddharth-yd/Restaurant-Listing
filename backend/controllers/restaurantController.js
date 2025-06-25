const Restaurant = require('../models/Restaurant');

// GET /api/restaurants/:id
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ id: parseInt(req.params.id) });
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/restaurants
exports.getRestaurants = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      q,
      country,
      minCost,
      maxCost,
      cuisine,
      lat,
      lng,
      radius = 3
    } = req.query;

    const query = {};

    if (q) {
      query.$or = [
        { name: new RegExp(q, 'i') },
        { 'location_details.address': new RegExp(q, 'i') }
      ];
    }

    if (country) query['location_details.city'] = new RegExp(country, 'i');

    if (cuisine) query.cuisines = new RegExp(cuisine, 'i');
    if (minCost !== undefined && minCost !== '') {
        query.average_cost_for_two = query.average_cost_for_two || {};
        query.average_cost_for_two.$gte = parseInt(minCost);
    }

    if (maxCost !== undefined && maxCost !== '') {
        query.average_cost_for_two = query.average_cost_for_two || {};
        query.average_cost_for_two.$lte = parseInt(maxCost);
    }
    
    if (!isNaN(parseFloat(lat)) && !isNaN(parseFloat(lng)) && !isNaN(parseFloat(radius))) {
        const radiusInRadians = parseFloat(radius) / 6378.1; // Earth's radius in km
        query.location = {
            $geoWithin: {
            $centerSphere: [[parseFloat(lng), parseFloat(lat)], radiusInRadians]
        }
    };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Restaurant.countDocuments(query);
    const data = await Restaurant.find(query).skip(skip).limit(parseInt(limit));

    res.json({ total, page: parseInt(page), data });
  } catch (err) {
    console.error("Restaurant query failed:", err);
    res.status(500).json({ error: err.message });
  }
};
