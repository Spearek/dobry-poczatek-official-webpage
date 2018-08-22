
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps'); 
var autoprefixer = require('gulp-autoprefixer');	
var cleanCSS = require('gulp-clean-css');	
var concat = require('gulp-concat');
var imagemin = require ('gulp-imagemin');
var changed = require ('gulp-changed');
var uglify = require('gulp-uglify-es').default;
var babel = require('gulp-babel');
var del = require('del');
var sequence = require('run-sequence');



gulp.task('reload', function(){
	browserSync.reload();
});


gulp.task('serve', ['sass'], function(){  

	browserSync({
		server: './'  
	});

	gulp.watch('./*.html', ['reload']); 
	gulp.watch('./assets/scripts/*.js', ['reload']);  
	gulp.watch('./assets/scss/styles.scss', ['sass']); 
	
});



gulp.task('sass', function(){
	return gulp.src('./assets/scss/styles.scss')
	.pipe(sourcemaps.init()) 
	.pipe(sass().on('error', sass.logError)) 

	.pipe(autoprefixer({
		browsers: ['last 3 versions'] //wybieramy w tablicy zasade na podstawie czego ma autoprefixować. NA GH repo jest więcej możliwości wypisanych po czym możemy wybierać.
	}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./assets/css')) 
	.pipe(browserSync.stream());

});




/* Do builda */

gulp.task('clean', function(){
	return del(['dist']);
});

gulp.task('es6',function(){
	return gulp.src('./assets/scripts/*.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest('./dist/js/compiled js'));
});

gulp.task('css', function(){
	return gulp.src('./assets/css/*.css') 
	.pipe(concat('concatStyle.css')) 
	.pipe(cleanCSS()) 
	.pipe(gulp.dest('./dist/css')); 
});

gulp.task("uglify", function () {
	return gulp.src('./dist/js/compiled js/*.js')
	.pipe(concat('concatScripts.js')) 
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('img',function(){
	return gulp.src('./assets/img/*.{jpg,jpeg,png,gif}') 
	.pipe(changed('./dist/img')) 
	.pipe(imagemin()) 
	.pipe(gulp.dest('./dist/img')); 

});




gulp.task('default', ['serve']);
gulp.task('build',function(){
	sequence('clean','es6',['css','uglify','img']);
});