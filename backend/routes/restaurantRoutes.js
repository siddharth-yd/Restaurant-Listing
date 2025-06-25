const express = require('express');
const router = express.Router();
const {
  getRestaurantById,
  getRestaurants
} = require('../controllers/restaurantController');

router.get('/:id', getRestaurantById);
router.get('/', getRestaurants);

module.exports = router;
