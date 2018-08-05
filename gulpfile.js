var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();

gulp.task('default', ['css', 'javascript', 'html'], function() {
    browserSync.init({
        server: {
            baseDir: ["./public","./public/bootstrap"]
        }
    });
    gulp.watch("app/js/*.js", ["javascript"]).on('change', browserSync.reload);
    gulp.watch("app/scss/*.scss", ['css']).on('change', browserSync.reload);
    gulp.watch("app/html/*.html", ['html']).on('change', browserSync.reload);
});



gulp.task('html', function() {
  return gulp.src('app/html/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('public'));
});

gulp.task('imagenes', function() {
    gulp.src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img'));
});

gulp.task('javascript', function() {
    gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('css', function(){
    return gulp.src('app/scss/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream());
});