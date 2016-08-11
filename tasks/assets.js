var pkg 		= require('../package.json');
var dirs 		= pkg['configs'].directories;
var argv       = require('minimist')(process.argv.slice(2))

var Config = {
	cache: (typeof argv.cache !== 'undefined' ? !!argv.cache : false),
	imagemin: {
		optimizationLevel: 3,
		progressive: true,
		interlaced: true
	}
}

var imagemin   = require('gulp-imagemin');
var del        = require('del');
var gulp 		= require('gulp');
var gulpifelse = require('gulp-if-else')


gulp.task('assets:clean', function(next){
	del(dirs.public.assets + '/**', next);
});

gulp.task('assets', ['assets:clean'], function(){
	return gulp.src(dirs.src.assets + '/**/*')
		.pipe(gulpifelse(
			Config.cache, function(){
				return cache(imagemin(Config.imagemin)) // if
			}, function(){
				return imagemin(Config.imagemin) // else
			}
		))
		.pipe(gulp.dest(dirs.public.assets + '/'));
});