'use strict';
module.exports = function (app) {
    var OKrammus = require('../controllers/OKrammusController');
    var VerifyToken = require('../auth/VerifyToken');
    var VerifyAdmin = require('../auth/VerifyAdmin');

    app.route('/')
        .get(function (req, res) {
            res.redirect('https://htmercury.github.io/okrammus');
        });

    // OKrammus Routes
    app.route('/champions')
        .get(OKrammus.list_all_champions)
        .post(VerifyToken, OKrammus.create_a_champion);


    app.route('/champions/:taskId')
        .get(OKrammus.read_champion_status)
        .put(VerifyToken, OKrammus.replace_champion_status)
        .delete(VerifyToken, OKrammus.delete_a_champion);

    app.route('/random')
        .get(OKrammus.random_champion);

    app.route('/random/:taskId')
        .get(OKrammus.random_champions);

    app.route('/specific/:taskId')
        .get(OKrammus.specific_champion);

    // OTHER ROUTES

    var User = require('../user/UserController');
    app.route('/users')
        .get(User.return_all_users);
    app.route('/users/me')
        .put(VerifyToken, User.update_me);
    app.route('/users/:id')
        .get(User.get_this_user)
        .delete(VerifyToken, VerifyAdmin, User.delete_this_user)
        .put(VerifyToken, VerifyAdmin, User.update_this_user);

    var Auth = require('../auth/AuthController');
    app.route('/api/auth/register')
        .post(VerifyToken, VerifyAdmin, Auth.register_user);
    app.route('/api/auth/me')
        .get(VerifyToken, Auth.check_me);
    app.route('/app/auth/login')
        .post(Auth.login);
};
