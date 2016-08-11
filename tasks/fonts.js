var gulp = require('gulp');
var pkg = require('../package.json');
var dirs = pkg['configs'].directories;
var del          = require('del');

gulp.task('fonts:clean', function(next){
	del(dirs.public.fonts + '/**', next);
});
gulp.task('fonts', ['fonts:clean'], function(){
	return gulp.src(dirs.src.fonts + '/**/*')
		.pipe(gulp.dest(dirs.public.fonts + '/'));
});