module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
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

	// Loads task
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');

	// Default task
	grunt.registerTask('default', ['sass']);

	// Build task
	grunt.registerTask('build', [ 'clean:build', 'copy:build', 'cssmin', 'compress:build' ]);

};
