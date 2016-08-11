var pkg = require('../package.json');
var dirs = pkg['configs'].directories;
var gulp 		  = require('gulp');

var livereload   = require('gulp-livereload');

var Config = {
	port: 8080,
	livereload_port: 35729
}

gulp.task('liveload', function(){
	livereload.listen(Config.livereload_port, function(err) {
		if(err) gutil.log('Livereload error:', err);
	})
});