/**
 * Created by jsgarbi on 3/12/15.
 */
var gulp = require('gulp');
var pkg 		  = require('../package.json');
var dirs 		  = pkg['configs'].directories;


gulp.task('copy', function () {
	return gulp.src([

		// Copy all files
		dirs.src.root + '/**/*',

		// Exclude the following files
		// (other tasks will handle the copying of these files)
		'!' + dirs.src.root + '/css/**',
		'!' + dirs.src.root + '/**/*.html',
		'!' + dirs.src.root + '/img/**',
		'!' + dirs.src.root + '/js/**'

	], {

		// Include hidden files by default
		dot: true

	}).pipe(gulp.dest(dirs.public.root));
});
