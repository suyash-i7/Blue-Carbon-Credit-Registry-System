const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { buyTokens, getTokens } = require('../controllers/companyController');

router.use(protect);
router.use(authorize('company'));

router.post('/buy-tokens', buyTokens);
router.get('/tokens', getTokens);

module.exports = router;
