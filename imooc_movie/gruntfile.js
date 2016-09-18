module.exports = function(grunt){

	grunt.initConfig({
		watch: {
			jade: {
				files: ['views/**'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['public/js/**','models/**/*.js','schemas/**/*.js'],
				// tasks: ['jshint'],
				options: {
					livereload: true
				}
			}
		},

		nodemon: {
			dev: {
				options: {
					file: 'app.js',
					args: [],
					ingniredFiles: ['REAME.md','node_modules/**','.ds_Store'],
					watchedEXtensions: ['js'],
					watchedFolders: ['./'],
					debug: true,
					delayTime: 1,
					env: {
						PORT: 3000
					},
					cwd: __dirname
				}
			}
		},

		concurrent: {
			tasks: ['nodemon','watch'],
			options: {
				logConcurrentOutput: true
			}
		}

	})

	grunt.loadNpmTasks('grunt-contrib-watch')   //只要有文件添加、修改、删除，去重新执行注册好的任务
	grunt.loadNpmTasks('grunt-nodemon') // 实时监听app.js
	grunt.loadNpmTasks('grunt-concurrent')

	grunt.option('force',true);
	grunt.registerTask('default',['concurrent']) //注册任务
}