var gulp = require('gulp');
var minCss = require('gulp-clean-css');
var scss = require('gulp-sass');
var server = require('gulp-webserver');
//压缩编译scss
gulp.task('minCss', function() {
        return gulp.src('./src/scss/*scss')
            .pipe(scss())
            .pipe(minCss())
            .pipe(gulp.dest('./src/css'))
    })
    //监听minCss
gulp.task('watch', function() {
    return gulp.watch('./src/scss/index.scss', gulp.series('minCss'))
})


//起服务
gulp.task('devServer', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            middleware: function(req, res) {
                var pathname = require('url').parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end('');
                    return;
                }
                pathname = pathname === '/' ? '/index.html' : pathname;
                res.end(require('fs').readFileSync(require('path').join(__dirname, 'src', pathname)))
            }
        }))
})

//整合任务
gulp.task('dev', gulp.series('minCss', 'devServer', 'watch'))