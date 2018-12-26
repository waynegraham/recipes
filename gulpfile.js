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
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: siteRoot,
      injectChanges: true
    },
    notify: true,
    port: 3000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

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
function jekyll() {
  return cp.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit" });
}

// Watch files
function watchFiles() {
  gulp.watch("./_sass/**/*", css);
  gulp.watch("./assets/js/**/*", gulp.series(scriptsLint, scripts));
  gulp.watch(
    [
      "./_data/**.*",
      "./_includes/**/*",
      "./_layouts/**/*",
      "./_recipes/**/*",
    ],
    gulp.series(jekyll, browserSyncReload)
  );
  gulp.watch("./assets/img/**/*", images);
}

// Tasks
gulp.task("images", images);
gulp.task("css", css);
gulp.task("js", gulp.series(scriptsLint, scripts));
gulp.task("jekyll", jekyll);
gulp.task("clean", clean);

// build
gulp.task(
  "build",
  gulp.series(clean, gulp.parallel(css, images, jekyll, "js"))
);

gulp.task(
  "default",
  gulp.series(clean, gulp.parallel(css, images, jekyll, watchFiles, browserSync))
);

// watch
gulp.task("watch", gulp.parallel(watchFiles, browserSync));

// OLD

// var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
// var messages = {
//     jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
// };
//
// var sassFiles = '_sass/**/*.?(s)css';
// var siteRoot = './_site/';
//
// var paths = {
//    styles: {
//       src: '_sass/**/*.?(s)css',
//       dest: '_site/css',
//       destsecond: 'css'
//    },
//    scripts: {
//       src: 'js/src/*.js',
//       dest: '_site/js/dist/',
//       destsecond: 'js/dist/'
//    }
// };

/**
 * Build the Jekyll Site
 */
 // gulp.task('jekyll-build', function (done) {
 //     browserSync.notify(messages.jekyllBuild);
 //     return cp.spawn( jekyll , ['build', '--baseurl', ''], {stdio: 'inherit'})
 //         .on('close', done);
 // });

/**
 * Rebuild Jekyll & do page reload
 */
// gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
//     browserSync.reload();
// });

/**
 * Wait for jekyll-build, then launch the Server
 */
// function browserSync(done){
//    browserSync({
//       files: [siteRoot + '**'],
//       server: {
//          baseDir: siteRoot,
//          injectChanges: true
//       },
//       notify: true
//    });
//    done();
// }
// gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
//     browserSync({
//         files: [siteRoot + '**'],
//         server: {
//             baseDir: siteRoot,
//             injectChanges: true
//         },
//         notify: true
//     });
// });

// BrowserSync Reload (callback)
// function browserSyncReload(done) {
//    browsersync.reload();
//    done();
// }
//
// // Clean assets (returns a promise)
// function clean() {
//    return del(['./_site/assets/']);
// }
//
// // Lint scripts (returns a stream)
// function scriptsLint() {
//   return gulp
//     .src(["./assets/js/**/*", "./gulpfile.js"])
//     .pipe(plumber())
//     .pipe(eslint())
//     .pipe(eslint.format())
//     .pipe(eslint.failAfterError());
// }
//
// /**
//  * Compile JS files from js/scripts.js using gulp-include
//  */
// // function scripts() {
// //    return pump([
// //       gulp.src(['./js/src/scripts.js']),
// //       include(),
// //       gulp.dest('./js/src/build/')
// //    ]);
// // }
//
// // Transpile, concatenate and minify scripts (returns a stream)
// function scripts() {
//   return (
//     gulp
//       .src(["./assets/js/**/*"])
//       .pipe(plumber())
//       .pipe(webpackstream(webpackconfig), webpack)
//       .pipe(uglify())
//       // folder only, filename is specified in webpack config
//       .pipe(gulp.dest("./_site/assets/js/"))
//       .pipe(browsersync.stream())
//   );
// }
//
// // Jekyll (returns a child process)
// function jekyll() {
//   return cp.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit" });
// }
//
// // expose 'scripts' task to CLI
// gulp.task("js", gulp.series(scriptsLint, scripts));
//
// // build task
// gulp.task(
//   "build",
//   gulp.series(
//     clean,
//     gulp.parallel(css, images, jekyll, "js")
//   )
// );
// // gulp.task('scripts', function() {
// //     pump([
// //         gulp.src(['./js/src/scripts.js']),
// //         include(),
// //         gulp.dest('./js/src/build/'),
// //     ]);
// // });
//
// /**
//  * Compress and uglify JavaScript files
//  */
//  // gulp.task('compress', function (cb) {
//  //   pump([
//  //         gulp.src('js/build/*.js'),
//  //         sourcemaps.init(),
//  //         uglify(),
//  //         sourcemaps.write(),
//  //         gulp.dest('js')
//  //     ],
//  //     cb
//  //   );
//  // });
//
// /**
//  * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
//  */
// // gulp.task('sass', function () {
// //     return gulp.src('_scss/main.scss')
// //         .pipe(sass({
// //             includePaths: ['scss'],
// //             onError: browserSync.notify
// //         }))
// //         .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
// //         .pipe(gulp.dest('_site/css'))
// //         .pipe(browserSync.reload({stream:true}));
// //         // .pipe(gulp.dest('css'));
// // });
//
// /**
//  * Watch scss files for changes & recompile
//  * Watch html/md files, run jekyll & reload BrowserSync
//  */
// function watch(){
//
// }
// // gulp.task('watch', function () {
// //     gulp.watch('_scss/*.scss', ['sass', 'jekyll-rebuild']);
// //     gulp.watch('js/src/*.js', ['scripts', 'compress', 'jekyll-rebuild']);
// //     gulp.watch(['*.html', '*.json', '*.md', '_layouts/*', '_data/*', '_includes/*', '_posts/*', '_recipes/*'], ['jekyll-rebuild']);
// // });
//
// /**
//  * Default task, running just `gulp` will compile the sass,
//  * compile the jekyll site, launch BrowserSync & watch files.
//  */
// // gulp.task('default', gulp.parallel('browser-sync', 'watch'));
// gulp.task('default', gulp.parallel(browserSync, watch));
