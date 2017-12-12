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
};
