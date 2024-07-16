const express = require('express');
const { getStatistics } = require('../controllers/statisticsController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getStatistics);

module.exports = router;
