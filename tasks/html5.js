var pkg 		  = require('../package.json');
var dirs 		  = pkg['configs'].directories;

var gulp 		  = require('gulp');
var filter       = require('gulp-filter');
var minifyHtml   = require('gulp-minify-html');
var del          = require('del');

gulp.task('html5:clean', function(next){
	del([dirs.public.root + '/**/*.html'], next);
});

gulp.task('html5', ['html5:clean'], function(){
	var htmlFilter = filter('**/*.html');

	return gulp.src([dirs.src.root + '/**/*.html'])
		.pipe(htmlFilter)
		.pipe(minifyHtml())
		.pipe(htmlFilter.restore())
		.pipe(gulp.dest(dirs.public.root));
})