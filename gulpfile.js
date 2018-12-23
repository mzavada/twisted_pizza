const gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    imageminJpegtran = require('imagemin-jpegtran'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    imageminPngquant = require('imagemin-pngquant'),
    terser = require('gulp-terser'),
    sass = require('gulp-sass'),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    browserSync = require("browser-sync").create();

function html() {
    return (
        gulp
        .src('src/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream())
    );
}
exports.html = html;

function compressImages() {
    return (
        gulp.src('src/images/*')
        .pipe(imagemin([
            imageminJpegRecompress({
                loops: 6,
                min: 40,
                max: 85,
                quality: 'low'
            }),
            imageminPngquant(),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest('dist/images'))
    );
}
exports.compressImages = compressImages;

function compressJS() {
    return (
        gulp.src('src/script/*.js')
        .pipe(terser())
        .pipe(gulp.dest('dist/script/'))
        .pipe(browserSync.stream())

    );
}
exports.compressJS = compressJS;

function style() {
    return (
        gulp
        .src('src/style/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream())
    );
}
exports.style = style;

function reload() {
    return (browserSync.reload());
}
exports.reload = reload;

function watch() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
    gulp.watch('src/*.html', html);
    gulp.watch('src/script/*.js', compressJS);
    gulp.watch('src/style/**/*.scss', style);
}
exports.watch = watch;

// gulp.task('watch', function () {
//     gulp.watch('src/*.html', gulp.series['html'])
//     //gulp.watch('src/script/*.js', gulp.series['compressJS'])
// });

// gulp.task('copy', gulp.series(['html', 'compressJS']));

// gulp.task('default', gulp.series(['watch']));