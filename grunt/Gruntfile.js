module.exports = function (grunt) {
	var serverPort = 8080;
	//js files to combine into app.js && app.min.js (in order)
	var jsFiles = [
		//--	Core
		'app.js',
		'routes.js',
		'helpers/browser-detector.js',
		'directives/modal.js',
		'factories/xssAjax-service.js',
		'factories/authorization-service.js',
		'controllers/header-controller.js',
		'controllers/home-controller.js'
	];

	jsFiles = jsFiles.map(function (jsFile) {
		return '../www/js/source/' + jsFile;
	});

	var banner =
			'//************************************************************************************\n' +
			'// \tApp Roller 1.0 \n' +
			'// \tDaniel Lewis (dlewis@sympletech.com) \n' +
			'// \n' +
			'// \tCompiled On : ' + (new Date()).toUTCString() + '\n'+
			'//************************************************************************************\n\n\n';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			sass: {
				options: { livereload: true },
				files: ['../www/css/source/**/*.scss'],
				tasks: ['compass']
			},
			uglifyJS: {
				options: { livereload: true },
				files: ['../www/js/source/**/*'],
				tasks: ['uglify:app', 'uglify:min']
			},
			refresh: {
				options: { livereload: true },
				files: ['../www/**/*'],
				tasks: []
			},
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['compass', 'uglify:app', 'uglify:min', 'watch']
			}
		},
		compass: {
			sass: {
				options: {
					sassDir: '../www/css/source/',
					cssDir: '../www/css/'
					//environment: 'production',
					//outputStyle: 'compressed'
				}
			}
		},
		uglify: {
			app: {
				options: {
					mangle: false,
					compress: false,
					beautify: true,
					preserveComments: 'all',
					banner: banner
				},
				files: {
					'../www/js/app.js': jsFiles
				}
			},
			min: {
				options: {
					compress: true,
					sourceMap: true,
					banner : banner
				},
				files: {
					'../www/js/app-min.js': jsFiles
				}
			}
		},
		connect: {
			server: {
				options: {
					port: serverPort,
					base: '../www',
					open: 'http://localhost:' + serverPort,
					livereload: true
				}
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');

	// Default task(s).
	grunt.registerTask('default', ['compass', 'uglify:app', 'uglify:min', 'connect', 'watch']);
};


