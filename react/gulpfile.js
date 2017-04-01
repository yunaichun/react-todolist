/**
 * [gulp description]
 * @type {[type]}
 */
var gulp = require('gulp');
//打印工具
var gutil = require('gulp-util');

//启动build之前，需要先清理之前的build
var del = require('del');
//增量编译
var cached = require('gulp-cached');
//less文件处理
var less = require('gulp-less');
//css兼容性补全
var autoprefixer = require('gulp-autoprefixer');

//将webpack作为gulp的任务导入
var webpackConfig = require('./webpack.config.js');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var devConfig = Object.create(webpackConfig);
var devCompiler = webpack(devConfig);


/**
 * source dir
 */
var src = {
  root: 'src/',
  html: 'src/*.html',  
  style: 'src/style/*/*.less',                 
  assets: 'assets/**/*',                         
  vendor: ['src/js/vendor/**/*', 'src/js/bower_components/**/*']                        
};
var dist = {
  root: 'dist/',
  html: 'dist/',
  style: 'dist/style',
  assets: 'dist/assets',
  vendor: 'dist/vendor'
};


/**
 * ----------------------------------------------------
 *  tasks
 * ----------------------------------------------------
 */
/**
 * clean build dir
 */
function cleanBuild(done) {
  del.sync(dist.root);
  done();
}
/**
 * [html 将最新html文件copy到dist目录]
 */
function copyHtml() {
    return gulp.src(src.html)
      .pipe(gulp.dest(dist.html));
}
/**
 * [style 将最新less文件copy到dist目录]
 */
function compileStyle() {
    return gulp.src(src.style)
      //和newer类似，过滤出改变了的style
      .pipe(cached('style'))
      //处理less文件
      .pipe(less())
      //error事件
      .on('error', handleError)
      //自动补全浏览器兼容
      .pipe(autoprefixer({
        browsers: ['last 3 version']
      }))
      .pipe(gulp.dest(dist.style));
}
exports.compileStyle = compileStyle;
/**
 * [handleError less编译错误回调函数]
 */
function handleError(err) {
  if (err.message) {
    console.log(err.message);
  } else {
    console.log(err);
  }
  this.emit('end');
}

/**
 * [copyVendor 将最新vender文件copy到dist目录]
 */
function copyVendor() {
  return gulp.src(src.vendor)
    .pipe(gulp.dest(dist.vendor));
}

/**
 * [copyAssets 将最新assets文件copy到dist目录]
 */
function copyAssets() {
  return gulp.src(src.assets)
    .pipe(gulp.dest(dist.assets));
}



/**
 * [将webpack导入到gulp，作为其中一项默认任务]
 */
function webpackTask(done) {
  devCompiler.run(function(err, stats) {
    if (err) {
        throw new gutil.PluginError('webpack:build-dev', err);
    }
    gutil.log('[webpack:build-dev]', stats.toString({
        colors: true
    }));
    done();
  });
}
/**
 * [启动webpack-dev-server服务]
 */
function webpackDevServer(done) {
  new WebpackDevServer(devCompiler).listen(8080, 'localhost', function (err) {
      if (err){
        throw new gutil.PluginError('webpack-dev-server', err);
      } 
      gutil.log('[webpack-dev-server]', 'http://localhost:8080/');
      done();
  });
}

/**
 * [watch 代码更新重新打包]
 */
function watch() {
  gulp.watch(src.html, copyHtml);
  gulp.watch(src.style, compileStyle);
  gulp.watch(['src/**/*.js','src/**/*.jsx'], webpackTask);
}  
/**
 * default task
 */
gulp.task('default', gulp.series(
  cleanBuild, 
  gulp.parallel(copyHtml, compileStyle, copyAssets, copyVendor, webpackTask),
  webpackDevServer, 
  watch
));