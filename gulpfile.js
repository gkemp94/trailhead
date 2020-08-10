const { src, watch, dest, parallel, series } = require('gulp');
const { name } = require('./package.json');
const { spawn } = require('child_process');

const browserSync = require('browser-sync').create();

const sass = require('gulp-sass');

const SASS_GLOB = './src/**/*.scss'
const HTML_GLOB = './src/**/*.{js,md,html,json,png}';
const DIST_GLOB = './dist/**/**.**';

function scss() {
  return src(SASS_GLOB)
    .pipe(sass())
    .pipe(dest('./dist/'));
}

function copy() {
  return src(HTML_GLOB)
    .pipe(dest('./dist'))
}

function initBrowserSync() {
  browserSync.init({
    notify: false,
    proxy: {
      target: 'https://www.eventhorizon.dev/trailhead',
      middleware: function (req, res, next) {
        console.log(req.url);
        req.url = req.url + `?hsCacheBuster=${Math.round(Math.random()*1000)}`;
        next();
    }
    }
  });
  watch(DIST_GLOB, { delay: 1000 }, function reload(cb) {
    browserSync
    browserSync.reload();
    cb();
  })
}

function deploy(cb) {
 const ls = spawn('hs', ['watch', '--portal=eventhorizon', './dist', `./themes/${name}`, '--remove', '--disable-initial', '--mode=publish']);
 // ls.stdout.pipe(process.stdout);
 ls.stderr.pipe(process.stderr);
 ls.on('close', cb);
}

function build() {
  watch(SASS_GLOB, { ignoreInitial: false }, scss);
  watch(HTML_GLOB, { ignoreInitial: false }, copy);
}

exports.default = series(parallel(initBrowserSync, build, deploy))
