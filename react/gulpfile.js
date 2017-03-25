/**
 * [gulp description]
 * @type {[type]}
 */
var gulp = require('gulp');
//打印工具
var gutil = require('gulp-util');

//启动build之前，需要先清理之前的build
var del = require('del');
var rename = require('gulp-rename');

//增量编译
var cached = require('gulp-cached');
var remember = require('gulp-remember');
//less文件处理
var less = require('gulp-less');
//css兼容性补全
var autoprefixer = require('gulp-autoprefixer');


var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');


//代码自动刷新
var connect = require('gulp-connect');
//实现rest接口的数据mock
var rest = require('connect-rest');
//mock数据接口
var mocks = require('./mocks');

/**
 * ----------------------------------------------------
 * source configuration
 * ----------------------------------------------------
 */
var src = {
  // html 文件
  html: 'src/html/*.html',  
  // style 目录下所有 xx/index.less
  style: 'src/style/*/index.less',                 
  // 图片等应用资源
  assets: 'assets/**/*',                         
  // vendor 目录和 bower_components
  vendor: ['vendor/**/*', 'bower_components/**/*']                        
};
var dist = {
  root: 'dist/',
  html: 'dist/',
  style: 'dist/style',
  assets: 'dist/assets',
  vendor: 'dist/vendor'
};
var bin = {
  root: 'bin/',
  html: 'bin/',
  style: 'bin/style',
  assets: 'bin/assets',
  vendor: 'bin/vendor'
};


/**
 * ----------------------------------------------------
 *  tasks
 * ----------------------------------------------------
 */
/**
 * clean build dir
 */
function clean(done) {
  del.sync(dist.root);
  done();
}

/**
 * clean build binDir
 */
function cleanBin(done) {
  del.sync(bin.root);
  done();
}

/**
 * [html 将最新html文件 build]
 */
function html() {
    return gulp.src(src.html)
      .pipe(gulp.dest(dist.html));
}

/**
 * [style description]
 */
function style() {
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
exports.style = style;
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
 * [copyVendor 将最新vender文件 build]
 */
function copyVendor() {
  return gulp.src(src.vendor)
    .pipe(gulp.dest(dist.vendor));
}

/**
 * [copyAssets 将最新assets文件 build]
 */
function copyAssets() {
  return gulp.src(src.assets)
    .pipe(gulp.dest(dist.assets));
}

/**
 * [copyDist 将build目录拷贝到bin目录]
 */
function copyDist() {
  return gulp.src(dist.root + '**/*')
    .pipe(gulp.dest(bin.root));
}





/**
 * [webpackDevelopment]
 */
var devConfig, devCompiler;
devConfig = Object.create(webpackConfig);
devConfig.devtool = 'sourcemap';
devCompiler = webpack(devConfig);
function webpackDevelopment(done) {
  devCompiler.run(function(err, stats) {
    if (err) {
        throw new gutil.PluginError('webpack:build-dev', err);
        return;
    }
    gutil.log('[webpack:build-dev]', stats.toString({
        colors: true
    }));
    done();
  });
}

/**
 * [webpackProduction]
 * production 任务中添加了压缩和打包优化组件，且没有 sourcemap
 */
function webpackProduction(done) {
  var config = Object.create(webpackConfig);
  config.plugins = config.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': 'production'
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );
  webpack(config, function(err, stats) {
    if(err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack:production]', stats.toString({
      colors: true
    }));
    done();
  });
}
/**
 * [webpack-devServer]
 */
devConfig.plugins = devConfig.plugins || [];
devConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
function webpackDevelopmentServer(done) {
  new WebpackDevServer(devCompiler, {
      contentBase: dist.root,
      lazy: false,
      hot: true
  }).listen(8080, 'localhost', function (err) {
      if (err) throw new gutil.PluginError('webpack-dev-server', err);
      gutil.log('[webpack-dev-server]', 'http://localhost:8080/');
      reload();
      done();
  });
}

/**
 * [connectServer 代码自动刷新]
 */
function connectServer(done) {
  connect.server({
      root: dist.root,
      port: 8080,
      livereload: true,
      middleware: function(connect, opt) {
        return [rest.rester({
          context: '/'
        })];
      }
  });
  //通过 connect-rest 模块实现 rest 接口的数据 mock。
  mocks(rest);
  done();
}

/**
 * [watch 代码监控]
 */
function watch() {
  gulp.watch(src.html, html);
  gulp.watch('src/**/*.js', webpackDevelopment);
  gulp.watch('src/**/*.less', style);
  gulp.watch('dist/**/*').on('change', function(file) {
      gulp.src('dist/')
          .pipe(connect.reload());
  });
}
/**
 * [reload 实现刷新]
 */
function reload() {
  connect.reload();
}

/**
 * default task
 *清空
 *并行：复制assets、vender、html、style
 *启动服务、rest接口数据mock
 *监听
 */
gulp.task('default', gulp.series(
  clean, 
  gulp.parallel(copyAssets, copyVendor, html, style, webpackDevelopment), 
  connectServer, 
  watch
));
/** 
 * production build task
 */
gulp.task('build', gulp.series(
  clean, 
  gulp.parallel(copyAssets, copyVendor, html, style, webpackProduction), 
  cleanBin, 
  copyDist, 
  function(done) {
    console.log('build success');
    done();
  }
));