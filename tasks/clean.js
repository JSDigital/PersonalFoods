var gulp = require('gulp');

gulp.task('clean', ['assets:clean', 'fonts:clean', 'html5:clean', 'images:clean', 'vendors:clean', 'scripts:clean']);