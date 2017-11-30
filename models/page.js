var mongoose = require('mongoose');
var schema = mongoose.Schema;

var pageSchema = new schema({
    title: String,
    author: String,
    description: String,
    content: String,
    createTime: String
});
var PageModel = mongoose.model('artical', pageSchema, 'artical');
module.exports = PageModel
