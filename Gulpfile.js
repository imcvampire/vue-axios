// Gulp
const gulp = require('gulp')
const plumber = require('gulp-plumber')
const file = require('gulp-file')
const filter = require('gulp-filter')
const uglify = require('gulp-uglify')
const clean = require('gulp-clean')

// Rollup
const { rollup } = require('rollup')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const { getBabelOutputPlugin } = require('@rollup/plugin-babel')
// Const
const buildPath = 'dist/'

/**
 * Generate scripts with commonjs module
 * @param {import('rollup').RollupBuild} bundle
 */

/**
 * Bundle index.js using rollup + babel
 */
async function bundle(name, format) {
  const bundle = await rollup({
    input: 'src/index.js',
    plugins: [
      nodeResolve({ browser: true }),
      getBabelOutputPlugin({
        allowAllFormats: true,
        presets: [['@babel/preset-env', { modules: 'auto' }]],
        // sourceMaps: true,
      }),
    ],
  })
  return bundle.generate({
    format: format,
    name: name,
  })
}

gulp.task('build', async function () {
  const esmbundle = await bundle('VueAxios', 'esm')
  const commonbundle = await bundle('VueAxios', 'umd')
  const f = filter(['*', '!**/*.js.map'], { restore: true })
  const data = {
    'vue-axios.common.min.js': commonbundle,
    'vue-axios.esm.min.js': esmbundle,
  }

  for (const [name, bundle] of Object.entries(data)) {
    file(name, bundle.output.map((o) => o.code).join(' '), {
      src: true,
    })
      .pipe(plumber())
      .pipe(f)
      .pipe(uglify())
      .pipe(gulp.dest(buildPath))
  }
})

gulp.task('clean', function () {
  return gulp.src('dist/*').pipe(
    clean({
      force: true,
    }),
  )
})

gulp.task('default', gulp.series('clean', 'build'))
