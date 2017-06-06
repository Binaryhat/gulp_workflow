/*==============================================================================

    Author Name     :   Fullstackdev(Mahesh Langote)
    Product Name    :   Default workflow
    File Name       :   gulpfile.js
==============================================================================    */

var gulp = require('gulp'),
	cleanCSS = require('gulp-clean-css'),
	sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    concateCss = require('gulp-concat-css'),
    uglify = require('gulp-uglify'),
    filter = require('gulp-filter'),
//     imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    notify = require('gulp-notify'),
    jshint = require('gulp-jshint'),
    insert = require('gulp-insert'),
// minifyCss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    del=require('del'),
    wait=require('gulp-wait'),
    browserSync = require('browser-sync'),
    reload=browserSync.reload;

var cache = require('gulp-cache');

/*====================================
=            clear  cache            =
====================================*/
    gulp.task('clear', function (done) {
      return cache.clearAll(done);
    });



    /*==================================
    =            minify css            =
    ==================================*/
    gulp.task('minifyCss', function() {
      return gulp.src(['app/css/*.css','!app/css/*.min.css'])
      	.pipe(rename({suffix:'.min'}))
        .pipe(cleanCSS())
        .pipe(gulp.dest('app/css/'));
    });


    /*=====================================
    =            Scripts tasks            =
    =====================================*/

    gulp.task('scripts',function(){
    	return gulp.src(['app/js/scripts.js'])
    	.pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
    		.pipe(gulp.dest('app/JS'))
    		.pipe(reload({stream:true}));
    });

    
   
/*=========================================
=            Concat js          =
=========================================*/

gulp.task('concatejs', function() {
  return gulp.src(['app/js/jquery.min.js', 'app/js/bootstrap.min.js', 
                    'app/js/jquery.magnific-popup.min.js', 
                    'app/js/typed.min.js', 
                    'app/js/validator.min.js',
                    'app/js/jquery.mb.YTPlayer.min.js',
                    'app/js/myvcard.min.js'])
    .pipe(concat('mainscript.js'))
    .pipe(gulp.dest('Min/js/'));
});

/*==================================
=            concat css            =
==================================*/

gulp.task('concateCss', function () {
  return gulp.src(['app/css/bootstrap.css','app/css/magnific-popup.css','app/css/myvcard.css'])
    .pipe(concateCss("bundle.css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest('Min/css/'));
});



    /*============================
    =            Sass            =
    ============================*/
    var sassOptions = {
        errLogToConsole: true,
        outputStyle: 'expanded',
        includePaths: '/app/scss'
    };
    
    gulp.task('MySass', function () {
      return gulp.src('app/scss/*.scss')
        .pipe(wait(1500))
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
    		.pipe(gulp.dest('app/css/'))
    		.pipe(reload({stream:true}));
        //.pipe(gulp.dest('./css'));
    });


    /*==================================
    =            HTML Tasks            =
    ==================================*/
    gulp.task('html',function(){
    	return gulp.src('app/**/*.html')
    	.pipe(reload({stream:true}));
    });



    /*==================================

    =            watch task            =
    ==================================*/

    gulp.task('watch',function(){
    	gulp.watch('app/js/**/*.js',['scripts']);
    	gulp.watch('app/scss/**/*.scss',['MySass']);
    	gulp.watch('app/**/*.html',['html']);
    });


    /*====================================
    =            browser sync            =
    ====================================*/
    gulp.task('browserSync',function(){
    	browserSync({
    		server:{
    			baseDir:"./app/"
    		}
            
    	});
    });




    /*====================================
    =            Default task            =
    ====================================*/

    gulp.task('default',['scripts','MySass','html','browserSync','watch']);


    
// ======================================================================================================================================
// ======================================================================================================================================

    







