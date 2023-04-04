const mongoose = require('mongoose');
const Schema = mongoose.Schema

let composerSchema = new Schema ({
    firstName: {type: string},
    lastName: {type: string}
});

module.exports = mongoose.model('Composer', composerSchema);