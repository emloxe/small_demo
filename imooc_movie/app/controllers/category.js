var Category = require('../models/category')

// admin new page
exports.new = function(req, res){  //匹配规则
	res.render('category_admin',{ //返回admin
		title : 'imooc 后台分类录入页',
		category: {}
	});
};


// admin post category
exports.save = function(req, res){
	var _category = req.body.category;

	var category = new Category(_category);

		category.save(function(err, category){
			if (err) {console.log(err)}

			res.redirect('/admin/category/list')
		});
	
};

// category list page
exports.list = function(req, res){  //匹配规则
 
	Category.fetch(function(err, categories){
		if (err) {console.log(err);}

		res.render('categorylist',{ 
			title : 'imooc 分类 列表页',
			categories : categories
		});
	})
	
};


// list delete movie
exports.del = function(req,res){
	var id = req.query.id;

	if (id) {
		Movie.remove({_id :　id},function(err,movie){
			if (err) {
				console.log(err);
			}else{
				res.json({success : 1});
			}
		})
	}
};


