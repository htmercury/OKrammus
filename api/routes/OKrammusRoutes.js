'use strict';
module.exports = function (app) {
    var OKrammus = require('../controllers/OKrammusController');

    // todoList Routes
    app.route('/champions')
        .get(OKrammus.list_all_champions)
        .post(OKrammus.create_a_champion);


    app.route('/champions/:taskId')
        .get(OKrammus.read_a_champion_quotes)
        .put(OKrammus.replace_a_champion_quotes)
        .delete(OKrammus.delete_a_champion);
};
