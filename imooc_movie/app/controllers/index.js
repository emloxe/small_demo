// 负责和首页进行交互
var Movie = require('../models/movie');
var Category = require('../models/category');

exports.index = function(req, res){  //匹配规则
	Category
		.find({})
		.populate({path: 'movies', options: {limit: 5}})
		.exec(function(err, categories){
			if (err) { console.log(err)}

			res.render('index',{ //返回index
			title : 'imooc 首页',
			categories: categories
			});

		});

}


// results
exports.search = function(req, res){  //匹配规则
	var catId = req.query.cat;
	var q = req.query.q;
	var page = parseInt(req.query.p,10) || 0;
	var count = 2;
	var index = page*count;

	if (catId) {

		Category
			.find({_id: catId})
			.populate({
				path: 'movies',
				select: 'title poster',
			})
			.exec(function(err, categories){
				if (err) { console.log(err)}
				var category = categories[0] || {};
				var movies = category.movies || [];
				var results = movies.slice(index, index + count);
				
				res.render('results',{ //返回index
					title : 'imooc 结果列表页面',
					keyword: category.name,
					movies: results,
					currentPage: page,
					totalPage: Math.ceil(movies.length/count),
					query: 'cat='+catId
				});

			});
		}else{
			Movie
				.find({title: new RegExp(q+'.*','i')})
				.exec(function(err, movies){
					if (err) { console.log(err)}
					
					var results = movies.slice(index, index + count)
					
					res.render('results',{ //返回index
						title : 'imooc 结果列表页面',
						keyword: q,
						movies: results,
						currentPage: page,
						totalPage: Math.ceil(movies.length/count),
						query: 'q='+q
					});

				});
		}

	

}
