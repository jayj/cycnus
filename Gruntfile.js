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
			minify: {
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
	grunt.registerTask('default', ['watch']);

	// Build task
	grunt.registerTask('build', [ 'clean:build', 'copy:build', 'cssmin', 'compress:build' ]);

};
