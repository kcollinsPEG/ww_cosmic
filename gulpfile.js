// include modules
require('jshint-stylish');
var gulp = require('gulp');
var	sass = require('gulp-sass');
var	sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');

var cssInput = './src/scss/**/*.scss';
var cssOutput = './dist/css';
var jsOutput = './dist/js';
var jsInput = [
	'./src/js/navigation.js',
	'./src/js/date.js',
	'./src/js/select2.js',
	'./src/js/file.js',
	'./src/js/faq-control.js',
	'./src/js/lg-video.js',
	'./src/js/gallery.js',
	'./src/js/faq.js',
	'./src/js/forms.js',
	'./src/js/filterizr.js',
	'./src/js/popup.js',
	'./src/js/arrow-scroll.js',
	'./src/js/blog.js'

];

// CSS output [compressed, nested, expanded, compact]
var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'compressed'
};

// sass task
gulp.task('sass', function() {
	gulp.src(cssInput)
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(cssOutput));
});

gulp.task('js', function() {
	gulp.src(jsInput)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest(jsOutput));
});

// default gulp task this process will remain active and react to your file changes
// you won't need to type it again.
gulp.task('default', ['sass', 'js'], function() {
	// watch for scss changes
	gulp.watch(cssInput, function() {
		gulp.start('sass');
	});

	// watch for js changes
	gulp.watch(jsInput, function() {
		gulp.start('js');
	});
});
