const db = require('../config/db');

exports.getAllInvitations = async (req, res, next) => {
  try {
    const { category } = req.query;
    const invitations = await db.invitations.find({ category });
    return res.status(200).json({
      success: true,
      count: invitations.length,
      data: invitations
    });
  } catch (err) {
    next(err);
  }
};

exports.getInvitationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const invitation = await db.invitations.findById(id);
    if (!invitation) {
      return res.status(404).json({
        success: false,
        error: 'Invitation not found'
      });
    }
    return res.status(200).json({
      success: true,
      data: invitation
    });
  } catch (err) {
    next(err);
  }
};
