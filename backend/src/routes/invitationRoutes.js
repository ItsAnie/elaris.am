const express = require('express');
const router = express.Router();
const invitationController = require('../controllers/invitationController');

router.get('/', invitationController.getAllInvitations);
router.get('/:id', invitationController.getInvitationById);

module.exports = router;
