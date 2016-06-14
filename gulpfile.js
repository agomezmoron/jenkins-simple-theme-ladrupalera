/**
 * @license
 * Copyright (c) 2016 Alejandro Gomez Moron
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  hashFilename = require('gulp-hash-filename'),
  gulpsync = require('gulp-sync')(gulp),
  del = require('del'),
  minifyCss = require('gulp-minify-css');

var paths = {
  sass: ['./scss/**/*.scss'],
  destCss: './src/css/'
};

// Default task
gulp.task('default', gulpsync.sync(['sass', 'sass-min']));

//This task clean the css directory
gulp.task('cleanCss', [], function () {
  del('./src/css/*');
});

//Build the CSS
gulp.task('sass', ['cleanCss'], function (done) {
  gulp.src(['./scss/jenkins-emergya-theme.scss'])
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(concat('jenkins-emergya-theme.css'))
    .pipe(gulp.dest(paths.destCss))
    .on('end', done);
});

//Build the minified CSS
gulp.task('sass-min', ['sass'], function (done) {
  gulp.src(paths.destCss + '**/*.css')
    .pipe(minifyCss({keepSpecialComments: 0}))
    .pipe((hashFilename({"format": "{name}.min{ext}"})))
    .pipe(gulp.dest(paths.destCss))
    .on('end', done);
});