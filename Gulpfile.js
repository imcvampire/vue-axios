// Gulp
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const file = require('gulp-file');
const filter = require('gulp-filter');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require ('gulp-uglify');
const clean = require('gulp-clean');
const commonjs = require('@rollup/plugin-commonjs')

// Rollup
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const { nodeResolve }= require('@rollup/plugin-node-resolve')

// Misc
const runSequence = require('run-sequence');

// Const
const buildPath = 'dist/';

function _generate(bundle){
  return bundle.generate({
    format: 'commonjs',
  });
}

function bundle(opts) {
  return rollup({
    input: 'src/index.js',
    plugins: [
      nodeResolve({ browser: true }),
      commonjs(),
      babel({
        presets: [
          ["@babel/env"]
        ],
        sourceMaps: true
      })
    ]
  }).then(bundle => {
    return _generate(bundle);
  });
}

gulp.task('build', function(){
  return bundle().then(gen => {
    return file('vue-axios.es5.js', gen.code, {src: true})
      // .pipe(plumber())
      // .pipe(sourcemaps.init({loadMaps: true}))
      // .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(buildPath))
      // .pipe(filter(['*', '!**/*.js.map']))
      // .pipe(rename('vue-axios.min.js'))
      // .pipe(sourcemaps.init({loadMaps: true}))
      // .pipe(uglify({
        // preserveComments: 'license'
      // }))
      // .pipe(sourcemaps.write('./'))
      // .pipe(gulp.dest(buildPath));
  });
});

gulp.task('clean', function() {
  return gulp.src('dist/*').pipe(clean({
    force: true
  }));
})

gulp.task('default', gulp.series('clean', 'build'))

