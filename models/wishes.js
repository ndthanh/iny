var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
// var autoInc = require('mongoose-auto-increment');

var wishesSchema = new Schema({
	wishId: {type: Number, unique: true}
	,title: {type: String, require: true}
	,content: {type: String, require: true}
	,user: {type: String, default: "Anonymous"}
	,created: {type: Date, default: Date.now}
	,background: {type: String, default: "#000000"} // url("blah.png") or #123456
});

// wishesSchema.plugin(autoInc.plugin, {model: 'Wishes', field: 'wishId'});

module.exports = mongoose.model('Wishes', wishesSchema);