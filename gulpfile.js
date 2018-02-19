var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var sourcemaps  = require('gulp-sourcemaps');
var include     = require('gulp-include');
//@see https://www.npmjs.com/package/gulp-uglify
var uglify      = require('gulp-uglify');
var pump        = require('pump');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

var sassFiles = '_sass/**/*.?(s)css';
var siteRoot = '_site/'

/**
 * Build the Jekyll Site
 */
 gulp.task('jekyll-build', function (done) {
     browserSync.notify(messages.jekyllBuild);
     return cp.spawn( jekyll , ['build', '--baseurl', ''], {stdio: 'inherit'})
         .on('close', done);
 });

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        files: [siteRoot + '**'],
        server: {
            baseDir: siteRoot,
            injectChanges: true
        },
        notify: true
    });
});

/**
 * Compile JS files from js/scripts.js using gulp-include
 */
gulp.task('scripts', function() {
    pump([
        gulp.src(['./js/src/scripts.js']),
        include(),
        gulp.dest('./js/src/build/'),
    ]);
});

/**
 * Compress and uglify JavaScript files
 */
 gulp.task('compress', function (cb) {
   pump([
         gulp.src('js/build/*.js'),
         sourcemaps.init(),
         uglify(),
         sourcemaps.write(),
         gulp.dest('js')
     ],
     cb
   );
 });

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('_scss/main.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}));
        // .pipe(gulp.dest('css'));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('_scss/*.scss', ['sass', 'jekyll-rebuild']);
    gulp.watch('js/src/*.js', ['scripts', 'compress', 'jekyll-rebuild']);
    gulp.watch(['*.html', '*.json', '*.md', '_layouts/*', '_data/*', '_includes/*', '_posts/*', '_recipes/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
