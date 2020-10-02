// Load plugins
const autoprefixer  = require("autoprefixer");
const browsersync   = require("browser-sync").create();
const cp            = require("child_process");
const cssnano       = require("cssnano");
const del           = require("del");
const eslint        = require("gulp-eslint");
const gulp          = require("gulp");
const imagemin      = require("gulp-imagemin");
const newer         = require("gulp-newer");
const plumber       = require("gulp-plumber");
const postcss       = require("gulp-postcss");
const rename        = require("gulp-rename");
const sass          = require("gulp-sass");
const webpack       = require("webpack");
const webpackconfig = require("./webpack.config.js");
const webpackstream = require("webpack-stream");

const siteRoot = './_site/';

// BrowserSync
// function browserSync(done) {
//   browsersync.init({
//     server: {
//       baseDir: siteRoot,
//       injectChanges: true
//     },
//     notify: true,
//     port: 3000
//   });
//   done();
// }
//
// // BrowserSync Reload
// function browserSyncReload(done) {
//   browsersync.reload();
//   done();
// }

// Clean assets
function clean() {
  return del(["./_site/assets/"]);
}

// Optimize Images
function images() {
  return gulp
    .src("./assets/img/**/*")
    .pipe(newer("./_site/assets/img"))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest("./_site/assets/img"));
}

// CSS task
function css() {
  return gulp
    .src("./assets/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(gulp.dest("./_site/assets/css/"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest("./_site/assets/css/"))
    .pipe(browsersync.stream());
}

// Lint scripts
function scriptsLint() {
  return gulp
    .src(["./assets/js/**/*", "./gulpfile.js"])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

// Transpile, concatenate and minify scripts
function scripts() {
  return gulp
      .src(["./assets/js/**/*"])
      .pipe(plumber())
      .pipe(webpackstream(webpackconfig, webpack))
      // folder only, filename is specified in webpack config
      .pipe(gulp.dest("./_site/assets/js/"))
      .pipe(browsersync.stream());
}

// Jekyll
// function jekyll() {
//   return cp.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit" });
// }

// Watch files
function watchFiles() {
  //gulp.watch("./_sass/**/*", css);
  gulp.watch("./assets/js/**/*", gulp.series(['scriptsLint', 'scripts']));
  // gulp.watch(
  //   [
  //     "./_data/**.*",
  //     "./_includes/**/*",
  //     "./_layouts/**/*",
  //     "./_recipes/**/*",
  //   ],
    // gulp.series(jekyll, browserSyncReload)
  // );
  gulp.watch("./assets/img/**/*", images);
  gulp.watch("./assets/img/**/*", images);
}


// Tasks
gulp.task("images", images);
gulp.task('scripts', scripts);
gulp.task('scriptsLint', scriptsLint);
gulp.task("css", css);
gulp.task("js", gulp.series(['scriptsLint', 'scripts']));
// gulp.task("jekyll", jekyll);
gulp.task("clean", clean);

// build
gulp.task(
  "build",
  gulp.series(clean, gulp.parallel(css, images, "js"))
);

gulp.task(
  "default",
  build
  // gulp.series(clean, gulp.parallel(watchFiles));
  //gulp.series(clean, gulp.parallel(css, images, jekyll, watchFiles, browserSync))
);

// watch
gulp.task("watch", gulp.parallel(watchFiles));
