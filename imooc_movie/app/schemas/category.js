var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CategorySchema = new Schema({
	name: String,
	movies: [{type: ObjectId, ref: 'Movie'}],
	meta: {
		createAt: {
			type: Date,
			default : Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
	
});


CategorySchema.pre('save', function(next){  //给模式添加方法
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}

	next();
});

CategorySchema.statics = {//定义静态方法
	fetch : function(cb){
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById : function(id,cb){
		return this
			.findOne({'_id':id})
			.exec(cb)
	}
}

module.exports = CategorySchema;



