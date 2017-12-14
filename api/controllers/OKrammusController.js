'use strict';


var mongoose = require('mongoose'),
    Task = mongoose.model('Champions');

exports.list_all_champions = function (req, res) {
    Task.find({}, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.create_a_champion = function (req, res) {
    var new_task = new Task(req.body);
    new_task.save(function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.read_champion_status = function (req, res) {
    Task.findById(req.params.taskId, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.replace_champion_status = function (req, res) {
    Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_a_champion = function (req, res) {
    Task.remove({
        _id: req.params.taskId
    }, function (err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};


exports.random_champion = function (req, res) {
    Task.find({}, function (err, task) {
        if (err)
            res.send(err);
        res.json(task[Math.floor(Math.random() * task.length)]);
    });
};


exports.random_champions = function (req, res) {
    Task.find({}, function (err, task) {
        if (err)
            res.send(err);
        var used = [];
        var result = [];
        for (var i = 0; i < req.params.taskId; i++) {
            let randIndex = Math.floor(Math.random() * task.length);
            result = result.concat(task[randIndex]);
            if (used.includes(randIndex) && result.length < task.length) {
                result.splice(-1, 1);
                i--;
            }
        }
        res.json(
            result
        );
    });
};

exports.specific_champion = function (req, res) {
    Task.find({name : translate_champion(req.params.taskId)}, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

function translate_champion(s)
{
    var temp = s.toLowerCase().split("");
    var result = s[0].toUpperCase();
    for (var i = 1; i < temp.length; i++)
    {
        if (temp[i] === ".")
            continue;
        else if (temp[i] === "-")
        {
            result += " ";
            result += temp[i + 1].toUpperCase();
            i++;
        }
        else
            result += temp[i];
    }

    return result;

}