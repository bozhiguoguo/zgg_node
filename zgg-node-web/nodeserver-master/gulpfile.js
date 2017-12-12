var gulp = require('gulp'),
    path = require('path'),

    del = require("del"),
    argv = require('yargs').argv,
    runSequence = require('run-sequence'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    //当发生异常时提示错误 确保本地安装gulp-notify和gulp-plumber
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    minifycss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    cache = require('gulp-cache'),
    //pngquant = require('imagemin-pngquant'),
    zip = require('gulp-zip');

var destPath = "./build-dist";
// 清理任务
gulp.task('build-clean', function(cb){
    del([destPath+'/']).then(function(){
        cb();
    });
});
// 构建任务
gulp.task('default', function(cb){
    runSequence(
        'build-clean',
        [
            'build-copy-bin',
            //'build-copy-node_modules',
            'build-copy-src-app',
            'build-copy-config',
            'build-copy-lib',
            'build-copy-other-files',
            'build-copy-public'
        ],
        // 清除cache
        // 'clear-cache',
        'minIMG',
        'uglifyJS',
        'minifyCSS',
        'rev-replace-img-css',
        'rev-replace-quality',
        'rev-replace',
        //'build-clean-rev',
        //'build-zip',
        //'clean-all',
        cb
    );
});
// 复制文件
gulp.task('build-copy-bin', function(){
    return gulp.src(['./bin/**/*'])
        .pipe(gulp.dest(destPath+'/bin/'));
});

gulp.task('build-copy-node_modules', function(){
    return gulp.src(['./node_modules/**/*'])
        .pipe(gulp.dest(destPath+'/node_modules/'));
});

gulp.task('build-copy-src-app', function(){
    return gulp.src(['./app/**/*'])
        .pipe(gulp.dest(destPath+'/app/'));
});

gulp.task('build-copy-config', function(){
    return gulp.src(['./config/*.json'])
        .pipe(gulp.dest(destPath+'/config/'));
});

gulp.task('build-copy-lib', function(){
    return gulp.src(['./lib/**/*'])
        .pipe(gulp.dest(destPath+'/lib/'));
});

gulp.task('build-copy-other-files', function(){
    return gulp.src(['./*.json', './*.js'])
        .pipe(gulp.dest(destPath+'/'));
});

// 处理public目录
gulp.task('build-copy-public', function(){
   return gulp.src(['./public/**/*', '!./public/js/**/*.js', '!./public/css/**/*.css', '!./public/img/**/*.*'])
       .pipe(gulp.dest(destPath+'/public/'));
});

gulp.task('uglifyJS', function(){
   return gulp.src(['./public/js/**/*.js'])
       .pipe(plumber())
       .pipe(uglify())
       .pipe(rev())
       .pipe(gulp.dest(destPath+'/public/js/'))
       .pipe(rev.manifest({
           merge: true
       }))
       .pipe(gulp.dest(destPath+'/rev/js/'));
});

gulp.task('minifyCSS', function(){
    return gulp.src(['./public/css/**/*.css'])
        .pipe(plumber())
        .pipe(minifycss())
        .pipe(rev())
        .pipe(gulp.dest(destPath+'/public/css/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(destPath+'/rev/css/'));
});

gulp.task('clear-cache', function(done){
   return cache.clearAll(done);
});

gulp.task('minIMG', function(){
    return gulp.src('./public/img/**/*.{png,jpg,gif,ico}')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(cache(imagemin({
            // optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            // progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            // interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            // multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        })))
        .pipe(rev())
        .pipe(gulp.dest(destPath+'/public/img/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(destPath+'/rev/img/'));
});

// 深度压缩图片资源
// gulp.task('minQuantImg', function(){
//     return gulp.src('./public/img/**/*.{png,jpg,gif,ico}')
//         .pipe(imagemin({
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
//             use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
//         }))
//         .pipe(rev())
//         .pipe(gulp.dest(destPath+'/public/img/'))
//         .pipe(rev.manifest())
//         .pipe(gulp.dest(destPath+'/rev/img/'));
// });

gulp.task('rev-replace-img-css', function(){
    return gulp.src([destPath+'/rev/**/*.json', destPath+'/public/css/**/*.css'])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest(destPath+'/public/css/'));
});

gulp.task('rev-replace-quality', function(){
    return gulp.src([destPath+'/rev/**/*.json', destPath+'/public/quality/*.html'])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest(destPath+'/public/quality/'));
});

gulp.task('rev-replace', function(){
    return gulp.src([destPath+'/rev/**/*.json', destPath+'/app/views/**/*.html'])
        .pipe(revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest(destPath+'/app/views/'));
});

gulp.task("build-clean-rev", function(cb){
    del([destPath+'/rev']).then(function(){
        cb();
    });
});

gulp.task("build-zip", function(){
    return gulp.src(destPath+'/**/*')
        .pipe(zip('/zgg-pc-1.0.0.zip'))
        .pipe(gulp.dest(destPath+'/'));
});

gulp.task('clean-all', function(cb){
    del([destPath]).then(function(){
        cb();
    });
});