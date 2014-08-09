module.exports = function(grunt) {

	// Load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),
		// Compile Sass
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'style.css': 'style.scss'
				}
			}
		},
		// Watch for file changes
		watch: {
			sass: {
				files: [
					'**/*.scss'
				],
				tasks: [
					'sass'
				],
				options: {
					debounceDelay: 500
				}
			}
		},
		// Minify style.css into style.min.css
		cssmin: {
			build: {
				expand: true,
				src: ['*.css', '!*.min.css'],
				dest: 'build/',
				ext: '.min.css'
			}
		},
		// Copy to build folder
		copy: {
			build: {
				src: ['**', '!readme.md', '!.gitignore', '!node_modules/**', '!Gruntfile.js', '!package.json'],
				dest: 'build/',
			},
		},
		// Clean the build folder
		clean: {
			build: {
				src: ['build/']
			}
		},
		// Bump version numbers
		version: {
			css: {
				options: {
					prefix: 'Version\\:\\s'
				},
				src: [ 'style.scss' ],
			},
			php: {
				options: {
						prefix: '\@version\\s+'
				},
				src: [ 'functions.php' ],
			}
		},
		// Commit and tag the new version
		gitcommit: {
			version: {
				options: {
					message: 'New version: <%= pkg.version %>'
				},
				files: {
					src: ['style.scss', 'style.css', 'package.json', 'functions.php']
				}
			}
		},
		gittag: {
			version: {
				options: {
					tag: '<%= pkg.version %>',
					message: 'Tagging version <%= pkg.version %>'
				}
			}
		},
		gitpush: {
			version: {
				options: {
					tags: true
				}
			}
		}
		// Compress the build folder into an upload-ready zip file
		compress: {
			build: {
				options: {
					archive: 'build/cycnus.zip'
				},
				cwd: 'build/',
				src: ['**/*'],
				dest: 'cycnus/'
			}
		}
	});

	// Default task
	grunt.registerTask( 'default', [ 'watch' ] );

	// Pre-build task
	grunt.registerTask( 'pre-build', [ 'version', 'sass', 'gitcommit:version', 'gittag:version', 'gitpush:version' ]);

	// Build task
	grunt.registerTask( 'build', [ 'clean:build', 'copy:build', 'cssmin:build', 'compress:build' ]);

};
