var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
    name: {type: String, unique: true},
    password: String
});
var UserModel = mongoose.model('users', userSchema);
module.exports = UserModel