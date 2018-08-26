
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

gulp.task('copyStyles',function(){
	return gulp.src('./assets/css/normalize.css')
	.pipe(gulp.dest('./dist/assets/css'));
});
gulp.task('copyJson',function(){
	return gulp.src('./news.json')
	.pipe(gulp.dest('./dist'));
});
gulp.task('copyArticles',function(){
	return gulp.src('./*{pdf,ico}')
	.pipe(gulp.dest('./dist'));
});
gulp.task('copyIcons',function(){
	return gulp.src('./assets/icons/png/*.png')
	.pipe(gulp.dest('./dist//assets/icons/png'));
});
gulp.task('copyIndex',function(){
	return gulp.src('./index.html')
	.pipe(gulp.dest('./dist'));
});


gulp.task('clean', function(){
	return del(['dist']);
});

gulp.task('es6',function(){
	return gulp.src('./assets/scripts/*.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest('./dist/assets/scripts'));
});

gulp.task('css', function(){
	return gulp.src('./assets/css/styles.css') 
	//.pipe(concat('concatStyle.css')) 
	.pipe(cleanCSS()) 
	.pipe(gulp.dest('./dist/assets/css')); 
});

/*gulp.task("uglify", function () {
	return gulp.src('./dist/assets/js/not_uglified_yet/*.js')
	//.pipe(concat('concatScripts.js')) 
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});*/

gulp.task('img',function(){
	return gulp.src('./assets/img/*.{jpg,jpeg,png,gif}') 
	.pipe(changed('./dist/assets/img')) 
	.pipe(imagemin()) 
	.pipe(gulp.dest('./dist/assets/img')); 

});




gulp.task('default', ['serve']);
gulp.task('build',function(){
	sequence('clean',['css','es6','img','copyStyles','copyJson','copyArticles','copyIcons','copyIndex']);
});