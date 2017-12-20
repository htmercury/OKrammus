var User = require('./User');
var bcrypt = require('bcryptjs');

// CREATES A NEW USER
exports.create_new_user = function (req, res) {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
};

// RETURNS ALL THE USERS IN THE DATABASE
exports.return_all_users = function (req, res) {
    User.find({}, { _id: 0, __v: 0, password: 0 }, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
};

// UPDATES THE USER ASSOCIATED WITH THE GIVEN TOKEN
exports.update_me = function (req, res, next) {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    req.body.password = hashedPassword;
    if (req.body.email)
        delete req.body.email;
    User.findByIdAndUpdate(req.userId, req.body, { new: true }, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
};

// GETS A SINGLE USER FROM THE DATABASE
exports.get_this_user = function (req, res) {
    User.findById(req.params.id, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
};

// DELETES A USER FROM THE DATABASE
exports.delete_this_user = function (req, res, next) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: " + user.name + " was deleted.");
    });
};

// UPDATES A SINGLE USER IN THE DATABASE
exports.update_this_user = function (req, res, next) {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
};