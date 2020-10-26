// Gulp
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const file = require('gulp-file');
const filter = require('gulp-filter');
const merge = require('merge-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const commonjs = require('@rollup/plugin-commonjs')

// Rollup
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve')

// Const
const buildPath = 'dist/';

/**
 * Generate scripts with commonjs module
 * @param {import('rollup').RollupBuild} bundle
 */
function bundleCommonJs(bundle) {
  return bundle.generate({
    format: 'commonjs',
  });
}

/**
 * Bundle index.js using rollup + babel
 */
async function bundle() {
  const bundle = await rollup({
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
  });
  return bundleCommonJs(bundle);
}

gulp.task('build', async function () {
  const generatedBundle = await bundle();
  const f = filter(['*', '!**/*.js.map',], { restore: true });
  const data = ['vue-axios.es5.js', 'vue-axios.min.js'];
  const streams = data.map((name) => {
    return file(name, generatedBundle.output.map(o => o.code).join(" "), { src: true })
      .pipe(plumber())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(f)
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(buildPath));
  });

  return merge(streams);
});

gulp.task('clean', function () {
  return gulp.src('dist/*').pipe(clean({
    force: true
  }));
})

gulp.task('default', gulp.series('clean', 'build'))
