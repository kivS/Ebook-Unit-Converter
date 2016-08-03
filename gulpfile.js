var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var watchify = require('watchify');
var browserify = require('browserify');
var assign = require('lodash.assign');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');



gulp.task('dev', function(){
	browserSync.init({
		server:{
			baseDir: './'
		}
	});

	gulp.watch(['*.html','dist/my.js']).on('change', browserSync.reload);

	gulp.watch(['myModules/**/*.js','my.js'],['bundle-dev']);

	gulp.watch(['my.sass']).on('change', function(){
		return gulp.src(['my.sass'])
			.pipe(sass())
			.pipe(gulp.dest('dist'))
			.pipe(browserSync.stream()); // inject it to browser
	});


});


gulp.task('bundle-dev', function (){
	// add custom browserify options here
	var customOpts = {
	  entries: ['my.js'],
	  debug: true,
	  transform: ['babelify']

	};
	var opts = assign({}, watchify.args, customOpts);
	var b = watchify(browserify(opts)); 

	b.on('log', gutil.log); // output build logs to terminal

	return b.bundle()
	  // log errors if they happen
	  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
	  .pipe(source('my.js'))
	  .pipe(gulp.dest('./dist'));

});