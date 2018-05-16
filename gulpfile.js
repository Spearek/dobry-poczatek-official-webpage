var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass',function() {
    return gulp.src('./assets/scss/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('./assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], function(){

    browserSync.init({
        server: './'
    });
    gulp.watch('./assets/scss/styles.scss', ['sass']);
    gulp.watch('./*.html'.on('change', browserSync.reload));
});

gulp.task('default', ['serve']);