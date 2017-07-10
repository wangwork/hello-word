var gulp = require('gulp'),
    uglify = require('gulp-uglify');

var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var gtm  = require('gulp-gtm');

var pkg = require('./package.json');
var dirs = pkg['configs'].directories;

// ---------------------------------------------------------------------
// | Helper tasks  1.文件生成和清理
// ---------------------------------------------------------------------


gulp.task('clean', function (done) {
    require('del')([
        dirs.archive,
        dirs.dist,
        dirs.src+"/css"
    ]).then(function () {
        done();
    });
});

// ---------------------------------------------------------------------
// | Helper tasks  2.less编译成css
// ---------------------------------------------------------------------
gulp.task('less:en', function () {
    return gulp.src(dirs.src+'/less/style.less')
        .pipe(plugins.less())
        .pipe(plugins.css())
        .pipe(plugins.rename("__en.css"))
        .pipe(gulp.dest(dirs.src+"/css"));
});

gulp.task('css', [
    'less:en',
]);


gulp.task('less:en-b', function () {
  return gulp.src(dirs.src+'/less/style-b.less')
    .pipe(plugins.less())
    .pipe(plugins.css())
    .pipe(plugins.rename("__en.css"))
    .pipe(gulp.dest(dirs.src+"/css"));
});

// ---------------------------------------------------------------------
// | Helper tasks  复制项目文件到dist                                                  |
// ---------------------------------------------------------------------
gulp.task('copy', [
    'copy:html',
    'copy:css.en',
    //'copy:img',
    'copy:font',
    'copy:js',
    'copy:other'
]);


gulp.task('copy:html', function () {  //在复制JS的时候替换版本号
    return gulp.src(dirs.src + '/index.html')
        .pipe(plugins.replace(/__en/g, "en-"+pkg.version))
        .pipe(plugins.replace(/__main/g, "vinci-"+pkg.version))
        .pipe(gulp.dest(dirs.dist));
});

gulp.task('copy:js', function () {
    var banner = '/*! pkg.name v' + pkg.version +
        ' | ' + pkg.homepage + ' */\n\n';
    return gulp.src(dirs.src + '/js/__main.js')
        .pipe(plugins.header(banner))
        .pipe(plugins.rename('vinci-'+pkg.version+'.js'))
        .pipe(gulp.dest(dirs.dist + '/js'));
});


gulp.task('copy:css.en', function () {

    var banner = '/*! pkg.name v' + pkg.version +
                    ' | ' + pkg.homepage + ' */\n\n';

    return gulp.src(dirs.src + '/css/__en.css')
               .pipe(plugins.header(banner))
               .pipe(plugins.autoprefixer({
                   browsers: ['last 2 versions', 'ie >= 8', '> 1%'],
                   cascade: false
               }))
               .pipe(plugins.rename('en-'+pkg.version+'.css'))
               .pipe(gulp.dest(dirs.dist + '/css'));
});

gulp.task('copy:img', function () {
    return gulp.src([
        // Copy all images
        dirs.src + '/img/**/*',
    ]).pipe(gulp.dest(dirs.dist+'/img'));
});

gulp.task('copy:font', function () {
  return gulp.src([
    // Copy all images
    dirs.src + '/font/**/*',
  ]).pipe(gulp.dest(dirs.dist+'/font'));
});

gulp.task('copy:other', function () {
    return gulp.src([dirs.src + '/favicon.ico'])
        .pipe(gulp.dest(dirs.dist));
});


gulp.task('copy:misc', function () {
    return gulp.src([

        // Copy all files
        dirs.src + '/**/*',

        // Exclude the following files
        // (other tasks will handle the copying of these files)
        '!' + dirs.src + '/css/main.css',
        '!' + dirs.src + '/index.html'

    ], {

        // Include hidden files by default
        dot: true

    }).pipe(gulp.dest(dirs.dist));
});



// ---------------------------------------------------------------------
// | Google tag manager
// ---------------------------------------------------------------------

gulp.task('gtm', function(){
  gulp.src(dirs.dist+'/index.html')
    .pipe(gtm({containerId: 'GTM-MXDSWD'}))
    .pipe(gulp.dest(dirs.dist));
});

gulp.task('lint:js', function () {
    return gulp.src([
        'gulpfile.js',
        dirs.src + '/js/*.js',
        dirs.test + '/*.js'
    ]).pipe(plugins.jscs())
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter('jshint-stylish'))
      .pipe(plugins.jshint.reporter('fail'));
});

var pump = require('pump');

gulp.task('compress', function (cb) {
  pump([
      gulp.src(dirs.dist+'/js/*'),
      uglify(),
      gulp.dest(dirs.dist+"/js")
    ],
    cb
  );
});

gulp.task('build', function (done) {
    runSequence(
        'clean', 'css', 'copy', 'gtm', 'compress',
    done);
});

gulp.task('b', function (done) {
  runSequence(
    'clean', 'less:en-b', 'copy', 'gtm', 'compress',
    done);
});

gulp.task('default', ['build']);


// ---------------------------------------------------------------------
// | Watch less  监控less变化
// ---------------------------------------------------------------------

var watchLess= require('gulp-watch-less'),
    less = require('gulp-less')
    rename = require('gulp-rename');

gulp.task('watch_less', function () {

    return gulp.src(dirs.src+'/less/style.less')
        .pipe(watchLess(dirs.src+'/less/style.less'))
        .pipe(less())
        .pipe(rename("__en.css"))
        .pipe(gulp.dest(dirs.src+"/css"));
});

gulp.task('dev_less', function () {

    return gulp.src(dirs.src+'/less/style.less')
        .pipe(less())
        .pipe(rename("__en.css"))
        .pipe(gulp.dest(dirs.src+"/css"));
});
