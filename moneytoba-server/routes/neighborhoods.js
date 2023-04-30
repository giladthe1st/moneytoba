const express = require('express');
const router = express.Router();
const Neighborhood = require('../models/Neighbourhood');

router.get('/', async (req, res) => {
  try {
    const neighborhoods = await Neighborhood.find({}).lean();
    res.json(neighborhoods);
  } catch (error) {
    console.error('Error fetching neighborhoods:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
