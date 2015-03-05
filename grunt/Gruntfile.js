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
		'controllers/navigation-controller.js',
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
				tasks: ['uglify:include', 'copy']
			},
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['compass', 'uglify:include', 'uglify:app', 'uglify:min', 'watch']
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
			include: {
				options: {
					mangle: false,
					compress: false,
					beautify: true,
					preserveComments: 'all',
					banner: banner
				},
				files: {
					'../dist/include.js': ['../www/include.js']
				}
			},
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
		copy: {
			main: {
				files: [
					{ cwd: '../www/js/', expand: true, src: '*', dest: '../dist/js/', filter: 'isFile' },
					{ cwd: '../www/css/', expand: true, src: '*', dest: '../dist/css/', filter: 'isFile' },
					{ cwd: '../www/js/lib/', expand: true, src: '**', dest: '../dist/js/lib/' },
					{ cwd: '../www/css/lib/', expand: true, src: '**', dest: '../dist/css/lib/' },
					{ cwd: '../www/img/', expand: true, src: '**', dest: '../dist/img/' },
					{ cwd: '../www/partials/', expand: true, src: '**', dest: '../dist/partials/' },
					{ cwd: '../www/', expand: true, src: 'index.html', dest: '../dist/' },
				],
			},
		},
		connect: {
			server: {
				options: {
					port: serverPort,
					base: '../dist',
					open: 'http://localhost:' + serverPort,
					livereload: true
				}
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');

	// Default task(s).
	grunt.registerTask('default', ['compass', 'uglify:include', 'uglify:app', 'uglify:min', 'copy', 'connect', 'watch']);
};


