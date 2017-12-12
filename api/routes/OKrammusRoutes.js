'use strict';
module.exports = function (app) {
    var OKrammus = require('../controllers/OKrammusController');

    // OKrammus Routes
    app.route('/champions')
        .get(OKrammus.list_all_champions)
        .post(OKrammus.create_a_champion);


    app.route('/champions/:taskId')
        .get(OKrammus.read_champion_quotes)
        .put(OKrammus.replace_champion_quotes)
        .delete(OKrammus.delete_a_champion);
};
