var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var watchify = require('watchify');
var browserify = require('browserify');
var assign = require('lodash.assign');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var htmlreplace = require('gulp-html-replace');
var htmlmin = require('gulp-htmlmin');



/******************************************************************************************************
 * 											 <Dev> 
 *
 * ****************************************************************************************************
 */

gulp.task('dev',['dev-js','dev-css'], function(){
	browserSync.init({
		server:{
			baseDir: './'
		}
	});

	gulp.watch(['*.html','dev-build/my.js']).on('change', browserSync.reload);

	gulp.watch(['myModules/**/*.js','my.js'],['dev-js']);

	gulp.watch(['my.sass'],['dev-css']);


});

gulp.task('dev-css',function(){
	return gulp.src(['my.sass'])
		.pipe(sass())
		.pipe(autoprefixer({browsers:['last 2 versions']}))
		.pipe(gulp.dest('dev-build'))
		.pipe(browserSync.stream()); // inject it to browser
});

gulp.task('dev-js', function (){
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
	  .pipe(gulp.dest('./dev-build'));

});






/******************************************************************************************************
 * 											 <Build> 
 *
 * ****************************************************************************************************
 */

gulp.task('build',['build-js','build-css','build-html']);


gulp.task('build-js', function(){
	console.log("Running in %s environment \n Wait a little...",process.env.NODE_ENV);
	return browserify({
		entries:'my.js',
		debug:false,
		transform: ['babelify']
	})
	.bundle()
	.pipe(source('my.js'))
	.pipe(buffer())
	.pipe(uglify({compress:{
		drop_console:true
	}}))
	.pipe(gulp.dest('./dist-build'));
});

gulp.task('build-css',function(){
	return gulp.src('my.sass')
		   	   .pipe(sass())
		   	   .pipe(autoprefixer({browsers:['last 2 versions']}))
		   	   .pipe(cleanCSS())
		   	   .pipe(gulp.dest('./dist-build'));
});

gulp.task('build-html', function(){
	return gulp.src('index.html')
		.pipe(htmlreplace({
			'css': 'my.css',
			'js': 'my.js'
		}))
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist-build'));
});