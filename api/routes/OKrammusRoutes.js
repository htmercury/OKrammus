'use strict';
module.exports = function (app) {
    var OKrammus = require('../controllers/OKrammusController');

    // todoList Routes
    app.route('/tasks')
        .get(OKrammus.list_all_tasks)
        .post(OKrammus.create_a_task);


    app.route('/tasks/:taskId')
        .get(OKrammus.read_a_task)
        .put(OKrammus.update_a_task)
        .delete(OKrammus.delete_a_task);
};
