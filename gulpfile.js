var gulp = require('gulp');
var requireDir = require('require-dir');

requireDir('./tasks');

gulp.task('build', ['assets', 'images', 'fonts', 'html5', 'sass-build', 'vendors', 'scripts', 'copy', 'watch']);
gulp.task('default', ['build']);
