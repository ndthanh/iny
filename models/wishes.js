var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
// var autoInc = require('mongoose-auto-increment');

var wishesSchema = new Schema({
	wishId: {type: Number, unique: true}
	,content: {type: String, require: true}
	,user: {type: String, default: "Anonymous"}
	,created: {type: Date, default: Date.now}
});

// wishesSchema.plugin(autoInc.plugin, {model: 'Wishes', field: 'wishId'});

module.exports = mongoose.model('Wishes', wishesSchema);