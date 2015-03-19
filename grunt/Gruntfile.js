module.exports = function (grunt) {
	var serverPort = 8080;
	var testServerPort = 8081;
	//**************************************************************
	//	js files to combine into app.js && app.min.js (in order)
	//**************************************************************
	var jsFiles = [
		'app.js',
		'routes.js',
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
			'/**************************************************************************************\n' +
			' * \tApp Roller 1.0 \n' +
			' * \tDaniel Lewis (dlewis@sympletech.com) \n' +
			' * \n' +
			' * \tCompiled On : ' + (new Date()).toUTCString() + '\n'+
			' **************************************************************************************/\n\n\n';


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			sass: {
				options: { livereload: true },
				files: ['../www/css/source/**/*.scss'],
				tasks: ['sass', 'usebanner']
			},
			uglifyJS: {
				options: { livereload: true },
				files: ['../www/js/source/**/*'],
				tasks: ['uglify']
			},
			refresh: {
				options: { livereload: true },
				files: ['../www/**/*'],
				tasks: ['copy']
			},
			testRefresh: {
				options: { livereload: true },
				files: ['../tests/**/*'],
				tasks: []
			},
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['sass', 'usebanner', 'uglify', 'copy', 'watch']
			}
		},
		//**************************************************************
		//	SASS Configuration
		//**************************************************************
		sass: {
			dist: {
				options: {
					style: 'compressed',
					sourcemap: 'auto',
				},
				files: [{
					expand: true,
					cwd: '../www/css/source/',
					src: ['*.scss'],
					dest: '../www/css/',
					ext: '.css'
				}]
			}
		},
		//**************************************************************
		//	Banner - Needed to add banner to CSS files
		//**************************************************************
		usebanner: {
			options: {
				position: 'top',
				banner: banner
			},
			files: {
				src: ['../www/css/app.css']
			}
		},

		//**************************************************************
		//	Javascript build and minify settings (Uglify)
		//**************************************************************
		uglify: {
			main: {
				options: {
					compress: false,
					mangle : false,
					sourceMap : true,
					banner: banner
				},
				files: {
					'../www/js/app.js': jsFiles
				}
			},
		},
		//**************************************************************
		//	Cleans the dist and test dirs on first run
		//**************************************************************
		clean: {
			options: {
				force: true
			},
			build: ["../tests/js/"],
		},
		//**************************************************************
		//	Deployment section - Copies files to the dist and test dirs
		//**************************************************************
		copy: {
			tests: {
				files: [
					{ cwd: '../www/', expand: true, src: 'include.js', dest: '../tests/' },
					{ cwd: '../www/js/', expand: true, src: '*', dest: '../tests/js/', filter: 'isFile' },
					{ cwd: '../www/js/source/', expand: true, src: '**', dest: '../tests/js/source/' },
					{ cwd: '../www/css/', expand: true, src: '*', dest: '../tests/css/', filter: 'isFile' },
					{ cwd: '../www/', expand: true, src: 'include.js', dest: '../tests/' }
				],
			},
		},
		//**************************************************************
		//	Development and Test Server Settings
		//**************************************************************
		connect: {
			testServer: {
				options: {
					port: testServerPort,
					base: '../tests',
					open: 'http://localhost:' + testServerPort + '#tests',
					livereload: true
				}
			},
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
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-banner');
	grunt.loadNpmTasks('grunt-contrib-connect');

	// Default task(s).
	grunt.registerTask('default',
		['clean', 'sass', 'usebanner', 'uglify', 'copy', 'connect:server', 'watch']);

	grunt.registerTask('withtests',
		['clean', 'sass', 'usebanner', 'uglify', 'copy', 'connect', 'watch']);
};


