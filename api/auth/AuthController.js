var User = require('../user/User');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config');

exports.register_user = function (req, res, next) {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    },
        function (err, user) {
            if (err)
                return res.status(500).send("There was a problem registering the user. Either username was used or bad password.");
            // create a token
            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 7200 // expires in 2 hours
            });
            res.status(200).send({ auth: true, token: token });
        });
};

exports.check_me = function (req, res, next) {
        User.findById(req.userId, { password: 0 }, function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");

            res.status(200).send(user);
        });
};

exports.login = function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
    });
};