function verifyAdmin(req, res, next) {
    var User = require('../user/User');
    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        if (!process.env.ADMIN.includes(user.name)) return res.status(403).send("Permission denied.");
        next();
    });
}
module.exports = verifyAdmin;