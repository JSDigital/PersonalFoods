/**
 * Created by jsgarbi on 3/12/15.
 */
var pkg = require('../package.json');
var dirs = pkg['configs'].directories;

var gulp 		  = require('gulp');
var watch        = require('gulp-watch');
var livereload   = require('gulp-livereload');

gulp.task('watch', function(){
	watch(dirs.src.css + '/**/*.scss', function(){
		gulp.start('sass');
	});

	gulp.watch([
		dirs.src.images + '/**/*.png',
		dirs.src.images + '/**/*.jpg',
		dirs.src.images + '/**/*.jpeg',
		dirs.src.images + '/**/*.gif'
		], function(evt){

		gulp.start('images');
		gulp.start('assets');
		livereload.changed(evt.path);
	});

	gulp.watch([
		dirs.src.js + '/**/*.js'
	], function(evt){
		gulp.start('scripts');
		livereload.changed(evt.path);
	});

	gulp.watch([
		dirs.src.root + '/**/*.html'
	], function(evt){
		gulp.start('html5');
		livereload.changed(evt.path);
	});
});