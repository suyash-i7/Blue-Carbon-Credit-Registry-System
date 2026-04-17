const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { getPendingUsers, getAllUsers, approveUser, getAllProjects, approveProject, getTokenRequests, approveTokenRequest } = require('../controllers/adminController');

router.use(protect);
router.use(authorize('admin'));

router.get('/pending-users', getPendingUsers);
router.get('/users', getAllUsers);
router.post('/approve-user', approveUser);

router.get('/projects', getAllProjects);
router.post('/approve-project', approveProject);

router.get('/token-requests', getTokenRequests);
router.post('/approve-request', approveTokenRequest);

module.exports = router;
