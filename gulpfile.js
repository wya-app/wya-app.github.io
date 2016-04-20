'use-strict'

var gulp = require('gulp');
var config = require('./gulpConfig.json');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var ngAnnotate = require('gulp-ng-annotate');
var del = require('del');
var runSequence = require('run-sequence');
var useref = require('gulp-useref');
var minifyCss = require('gulp-minify-css');
var ngHtml2Js = require('gulp-ng-html2js');
var merge = require('merge-stream');


var paths = {
    scss: './scss/*.scss',
    html: './*.html',
    vendors: './vendors/*.js',
    scripts: ['./main.js', './controllers/*.js','./services/*.js','./factories/*.js']
};

// Static server + watch scss/html files
gulp.task('serve', ['sass'], function() {

  browserSync.init({
    server: './dist'
  });

  gulp.watch(paths.scss, ['sass']);
  gulp.watch(paths.html).on('change', browserSync.reload);

});

//compile sass
gulp.task('sass', function () {
    return gulp.src(paths.scss)
        .pipe($.sass())
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('minifyCSS',['scripts'], function(){
    return gulp.src('dist/css/styles.css')
    .pipe(minifyCss())
    .pipe(browserSync.stream());
});

gulp.task('minifyJS',['minifyCSS'], function(){
    return gulp.src(['dist/app.js'])
    .pipe(ngAnnotate())
    .pipe($.uglify())
    .pipe(gulp.dest('dist'));
})

gulp.task('views', function(){
    return gulp.src('./views/*.html')
    .pipe($.htmlmin({
        removeComments: true,
        collapseWhitespace: true,
    }))
    .pipe(ngHtml2Js({
        moduleName: "WYA-App",
    }))
    .pipe($.concat('views.js'))
    .pipe(ngAnnotate())
    .pipe($.uglify())
    .pipe(gulp.dest('dist/views/'));
});

gulp.task('assets', function() {
    var vids = gulp.src('./videos/*')
    .pipe(gulp.dest('dist/videos'));

    var img = gulp.src('./images/*')
    .pipe($.imagemin())
    .pipe(gulp.dest('dist/images'));

    return merge(vids, img);
});

gulp.task('scripts', function() {
    return scripts();
})

function scripts(dist) {
    return gulp.src('./index.html')
    .pipe($.useref())
    .pipe($.if('*.html', $.htmlmin({
        removeCommets: true,
        collapseWhitespace: true,
        minifyCss: true
    })))
    .pipe(gulp.dest('dist'))
}

gulp.task('clean', function() {
    del([
        'dist'
    ]);
});


gulp.task('build', function(done){
    runSequence(
        'clean',
        'minifyJS',
        'views',
        'assets',
        'serve',
        done
    )
});

gulp.task('default', ['build']);
