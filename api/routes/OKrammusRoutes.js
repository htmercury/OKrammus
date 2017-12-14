'use strict';
module.exports = function (app) {
    var OKrammus = require('../controllers/OKrammusController');

    // OKrammus Routes
    app.route('/champions')
        .get(OKrammus.list_all_champions)
        .post(OKrammus.create_a_champion);


    app.route('/champions/:taskId')
        .get(OKrammus.read_champion_status)
        .put(OKrammus.replace_champion_status)
        .delete(OKrammus.delete_a_champion);

    app.route('/random')
        .get(OKrammus.random_champion);

    app.route('/random/:taskId')
        .get(OKrammus.random_champions);

    app.route('/specific/:taskId')
        .get(OKrammus.specific_champion);

    // OTHER ROUTES

    var User = require('../user/UserController');
    app.route('/users')
        .post(User.create_new_user)
        .get(User.return_all_users);
    app.route('/users/:id')
        .get(User.get_this_user)
        .delete(User.delete_this_user)
        .put(User.update_this_user);

    var Auth = require('../auth/AuthController');
    app.route('/api/auth/register')
        .post(Auth.register_user);
    app.route('/api/auth/me')
        .get(Auth.check_me);
    app.route('/app/auth/login')
        .post(Auth.login);
};
