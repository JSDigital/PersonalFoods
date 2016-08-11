/**
 * Created by jsgarbi on 3/12/15.
 */

var pkg = require('../package.json');
var dirs = pkg['configs'].directories;

var gulp 		  = require('gulp');
var prefix       = require('gulp-autoprefixer');
var sass 		  = require('gulp-ruby-sass');

gulp.task('sass', function(){
	return sass(dirs.src.css)
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe(prefix('last 2 version', '> 5%', 'safari 5', 'ie 8', 'ie 7', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest(dirs.public.css));
});

gulp.task('sass-build', function(){
	return sass(dirs.src.css, {style:'compressed'})
		.on('error', function (err) {
			console.error('Error!', err.message);
		})
		.pipe(prefix('last 2 version', '> 5%', 'safari 5', 'ie 8', 'ie 7', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest(dirs.public.css));
});