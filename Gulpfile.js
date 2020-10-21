// Gulp
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const file = require('gulp-file');
const filter = require('gulp-filter');
const rename = require('gulp-rename');
const merge = require('merge-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const commonjs = require('@rollup/plugin-commonjs')

// Rollup
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve')

// Misc
const runSequence = require('run-sequence');
const { tree } = require('gulp');

// Const
const buildPath = 'dist/';

function _generate(bundle) {
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

gulp.task('build', function () {
  return bundle().then(gen => {
    const f = filter(['*', '!**/*.js.map',], { restore: true });
    var data = ['ue-axios.es5.js', 'vue-axios.min.js'];
    var streams = [];
    streams = data.map( (name) =>{
      return file(name, gen.output.map(o => o.code).join(" "), { src: true })
      .pipe(plumber())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(f)
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(buildPath));
    });
    return merge(streams);
  });
});

gulp.task('clean', function () {
  return gulp.src('dist/*').pipe(clean({
    force: true
  }));
})

gulp.task('default', gulp.series('clean', 'build'))

