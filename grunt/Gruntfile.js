module.exports = function (grunt) {
	var serverPort = 8080;
	var testServerPort = 8081;
	//**************************************************************
	//	js files to combine into app.js && app.min.js (in order)
	//**************************************************************
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
		'controllers/home-controller.js',
		'controllers/content-page-controller.js'
	];

	jsFiles = jsFiles.map(function (jsFile) {
		return '../www/js/source/' + jsFile;
	});

	//**************************************************************
	//	Banner to place on top of all js files
	//**************************************************************
	var banner =
			'//************************************************************************************\n' +
			'// \tApp Roller 1.0 \n' +
			'// \tDaniel Lewis (dlewis@sympletech.com) \n' +
			'// \n' +
			'// \tCompiled On : ' + (new Date()).toUTCString() + '\n'+
			'//************************************************************************************\n\n\n';


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
			testRefresh: {
				options: { livereload: true },
				files: ['../tests/**/*'],
				tasks: []
			},
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['compass', 'uglify:include', 'uglify:app', 'uglify:min', 'copy', 'watch']
			}
		},
		//**************************************************************
		//	Compass (SCSS) Configuration
		//**************************************************************
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
		//**************************************************************
		//	Javascript build and minify settings (Uglify)
		//**************************************************************
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
		//**************************************************************
		//	Cleans the dist and test dirs on first run
		//**************************************************************
		clean: {
			options: {
				force: true
			},
			build: ["../dist", "../tests/js/"],
		},
		//**************************************************************
		//	Deployment section - Copies files to the dist and test dirs
		//**************************************************************
		copy: {
			main: {
				files: [
					{ cwd: '../www/js/', expand: true, src: '*', dest: '../dist/js/', filter: 'isFile' },
					{ cwd: '../www/css/', expand: true, src: '*', dest: '../dist/css/', filter: 'isFile' },
					{ cwd: '../www/js/lib/', expand: true, src: '**', dest: '../dist/js/lib/' },
					{ cwd: '../www/css/lib/', expand: true, src: '**', dest: '../dist/css/lib/' },
					{ cwd: '../www/img/', expand: true, src: '**', dest: '../dist/img/' },
					{ cwd: '../www/partials/', expand: true, src: '**', dest: '../dist/partials/' },
					{ cwd: '../www/', expand: true, src: 'index.html', dest: '../dist/' }
				],
			},
			tests: {
				files: [
					{ cwd: '../www/js/', expand: true, src: '*', dest: '../tests/js/', filter: 'isFile' },
					{ cwd: '../www/js/lib/', expand: true, src: '**', dest: '../tests/js/lib/' },
					{ cwd: '../www/', expand: true, src: 'include.js', dest: '../tests/' }
				],
			}
		},
		//**************************************************************
		//	Development and Test Server Settings
		//**************************************************************
		connect: {
			server: {
				options: {
					port: serverPort,
					base: '../dist',
					open: 'http://localhost:' + serverPort,
					livereload: true
				}
			},
			testServer: {
				options: {
					port: testServerPort,
					base: '../tests',
					open: 'http://localhost:' + testServerPort,
					livereload: true
				}
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');

	// Default task(s).
	grunt.registerTask('default', ['clean', 'compass', 'uglify:include', 'uglify:app', 'uglify:min', 'copy', 'connect', 'watch']);
};


