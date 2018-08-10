var gulp = require('gulp')
var less = require('gulp-less')
var minify = require('gulp-minify-css')
var rename = require('gulp-rename')
var concat = require('gulp-concat')
var child = require('child_process')
var ejs = require('gulp-ejs')
var htmlB = require("gulp-html-beautify")
var htmlMin = require("gulp-htmlmin")
/**
 * 公共文件
 */
gulp.task('lib', function () {
  gulp.src('./src/ejs/lib/**/**').pipe(gulp.dest('./dist/html/lib'))
})
/**
 * 图片处理
 */
gulp.task('images', function () {
  gulp.src('./src/ejs/images/**/**').pipe(gulp.dest('./dist/html/images'))
})
/***
 * 本地json
 */
gulp.task('lang', function () {
  gulp.src('./src/ejs/lang/**').pipe(gulp.dest('./dist/html/lang'))
})
/**
 * less编译为css及压缩
 * */
gulp.task('less', function () {
  gulp.src('./src/ejs/less/**/**.less')
  /*编译less为css*/
    .pipe(less())
    /*输出路径*/
    .pipe(gulp.dest('./dist/html/css'))
    /*重命名加后缀*/
    .pipe(rename({suffix: '.min'}))
    /*压缩*/
    .pipe(minify())
    /*输出路径*/
    .pipe(gulp.dest('./dist/html/css'))
});
gulp.task('auto', function () {
  /*监听文件内容的改变，参数一为需要监听的文件，参数二为监听到改变后要执行的任务，是数组*/
  gulp.watch(['./src/ejs/less/*.less','./src/ejs/less/common/*.less'], ['less'])
  gulp.watch(['./src/ejs/*.*', './src/ejs/template/*.*', './webpack.config.js'], ['ejs'])
})
gulp.task("ejs", function () {
  gulp.src('./src/ejs/*.ejs').pipe(ejs({serverUrl: ""}, {}, {ext: ".html"}))
    .pipe(htmlMin({collapseWhitespace: true}))
    .pipe(htmlB({
      indent_size: 4,
      indent_char: ' ',
      // 这里是关键，可以让一个标签独占一行
      unformatted: true,
      // 默认情况下，body | head 标签前会有一行空格
      extra_liners: []
    }))
    .pipe(gulp.dest("./dist/html/"))
})

gulp.task('default', ['auto', 'less', "ejs", "images", "lib", "lang"])