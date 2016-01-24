'use-strict'

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var paths = {
    scss: './scss/*.scss',
    html: './*.html'
};

// Static server + watch scss/html files
gulp.task('serve', ['sass'], function() {

  browserSync.init({
    server: './'
  });

  gulp.watch(paths.scss, ['sass']);
  gulp.watch(paths.html).on('change', browserSync.reload);

});

//compile sass
gulp.task('sass', function () {
    return gulp.src(paths.scss)
        .pipe(sass({
            includePaths: ['sass']
        }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);