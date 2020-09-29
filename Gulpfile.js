
const { src, dest, series } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglifyjs');
const rename = require('gulp-rename');
const clean = require('gulp-clean');

function build() {
  return src('src/index.js', { allowEmpty: true })
    .pipe(babel({
      presets: [
        '@babel/env'
      ]
    }))
    .pipe(rename('vue-axios.es5.js'))
    .pipe(dest('dist'))
    .pipe(uglify())
    .pipe(rename('vue-axios.min.js'))
    .pipe(dest('dist'));
}

function clear() {
  return src('dist/*').pipe(clean({
    force: true
  }));
}

exports.default = series(clear, build)
