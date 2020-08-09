const { src, watch, dest } = require('gulp');
const sass = require('gulp-sass');

const SASS_GLOB = './src/**/*.scss'
const HTML_GLOB = './src/**/*.{js,md,html,json}';

function scss() {
  return src(SASS_GLOB)
    .pipe(sass())
    .pipe(dest('./dist/'));
}

function copy() {
  return src(HTML_GLOB)
    .pipe(dest('./dist'))
}

exports.default = function() {
  watch(SASS_GLOB, { ignoreInitial: false }, scss);
  watch(HTML_GLOB, { ignoreInitial: false }, copy);
}
