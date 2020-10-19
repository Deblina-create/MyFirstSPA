const gulp = require('gulp');
const { src, series, parallel, dest, watch } = require('gulp');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const htmlPath = 'src/*.html';
const scssPath = 'src/styles/scss/*.scss';
sass.compiler = require('node-sass');
const cssmin = require('gulp-cssmin');

// Copy All HTML files
function copyHtmlTask(){
    return src('src/*.html')
      .pipe(gulp.dest('dist'));
}



// Optimize Images
function imageMinTask(){
    return src('src/assets/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/assets'));

}


// Compile Sass
function sassTask(){
    return src('src/styles/scss/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('intermediate/styles/css'));
}
 
// minify css
function cssMinify(){
    return src('intermediate/styles/css/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('dist/styles'));
}


//watch for scss and html changes
function watchTask(){
  watch([htmlPath, scssPath], { interval: 300 }, series(parallel(copyHtmlTask, sassTask), cssMinify));
}






exports.copyHtml = copyHtmlTask;
exports.imageMin = imageMinTask;
exports.sass = sassTask;
exports.cssMinify = cssMinify;
exports.default = series(parallel(copyHtmlTask, imageMinTask, sassTask), cssMinify, watchTask);