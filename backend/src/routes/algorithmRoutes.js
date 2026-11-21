const express = require('express');
const router = express.Router();
const algorithmController = require('../controllers/algorithmController');

router.post('/sort', algorithmController.handleSort);
router.post('/search', algorithmController.handleSearch);
router.post('/string-match', algorithmController.handleStringMatch);
router.post('/greedy-selection', algorithmController.handleGreedySelection);
router.post('/knapsack', algorithmController.handleKnapsack);
router.post('/benchmark', algorithmController.handleBenchmark);
router.get('/metrics', algorithmController.getMetrics);

module.exports = router;
