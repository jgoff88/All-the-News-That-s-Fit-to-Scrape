var Note = require("../models/Note");
var date = require("../scripts/date");

module.exports = {
    get: function (data, cb) {
        var newNote = {
            _headlineId: data,
            _id,
            date: date(),
            noteText: data.noteText
        };

        Note.create(newNote, function () {
            if (err) {
                console.log(err);
            } else {
                console.log(doc);
                cb(doc);
            }
        });
    },
    delete: function (query, cb) {
        Note.remove({
            _id: data._id
        }, cb);
    }
};