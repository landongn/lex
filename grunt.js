//Grunt Task / Builder

module.exports = function(grunt) {

  // Project configuration.
	grunt.initConfig({
		concat: {
			dist: {
				src: ['vendor/handlebars.js', 'lib/razor.js', 'vendor/emitter.js'],
				dest: 'dist/razor.js'
			}
		},
		lint: {
			files: ['grunt.js', 'lib/**/*.js', 'vendor/**/*.js']
		},
		min: {
			dist: {
				src: ['dist/razor.js'],
				dest: 'dist/rzr.js'
			}
		}
	});

};