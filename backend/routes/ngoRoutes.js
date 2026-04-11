const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { submitProject, getOwnProjects } = require('../controllers/ngoController');

router.use(protect);
router.use(authorize('ngo'));

router.post('/projects', submitProject);
router.get('/projects', getOwnProjects);

module.exports = router;
