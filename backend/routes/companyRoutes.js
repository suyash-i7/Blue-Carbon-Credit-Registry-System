const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { requestTokens, getTokens } = require('../controllers/companyController');

router.use(protect);
router.use(authorize('company'));

router.post('/request-tokens', requestTokens);
router.get('/tokens', getTokens);

module.exports = router;
