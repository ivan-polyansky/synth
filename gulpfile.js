const { src, dest, parallel, series, watch } = require('gulp');
const browserSync   = require('browser-sync').create();
const concat        = require('gulp-concat');
const uglify        = require('gulp-uglify-es').default;
const sass          = require('gulp-sass');
const autoprefixer  = require('gulp-autoprefixer');
const gcmq          = require('gulp-group-css-media-queries');
const cleanCss      = require('gulp-clean-css');
const notify        = require('gulp-notify');
const sourcemaps    = require('gulp-sourcemaps');
const del           = require('del');

function browsersync() {
    browserSync.init({
        server: { baseDir: "app/" },
        notify: false,
        online: true,
    })
}

function scripts() {
    return src(["node_modules/jquery/dist/jquery.min.js", "app/assets/js/app.js"])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(dest("app/assets/js/"))
    .pipe(browserSync.stream())
}

function styles() {
    return src(["!app/assets/**/_*.scss", "app/assets/**/*.scss"] )
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", notify.onError()))
    .pipe(concat('app.min.css'))
    .pipe(gcmq()) 
    .pipe(autoprefixer({ overrideBrowserslist: ["last 10 versions"], grid: true }))
    .pipe(cleanCss({ level: { 1: { specialComments: 0 }, 2: { removeDuplicateRules: true } }, /*format: "beautify"*/ }))
    .pipe(sourcemaps.write("."))
    .pipe(dest('app/assets/css/'))
    .pipe(browserSync.stream())
}

function startWatch() {
    watch(["app/assets/scss/**/*.scss"], {delay: 500 }, styles)
    watch(["app/assets/**/*.js", "!app/assets/**/*.min.js"], {delay: 500 }, scripts)
    watch(["app/**/*.html"], {delay: 500 }).on('change', browserSync.reload)
}

function cleanDist() {
    return del("dist/**/*")
}

function buildCopy() {
    return src([
        "app/assets/css/**/*.min.css",
        "app/assets/js/**/*.min.js",
        "app/assets/img/**",
        "app/assets/fonts/**",
        "app/**/*.html",
    ], {base: "app" })
    .pipe(dest("dist"))
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.build = series(cleanDist, styles, scripts, buildCopy);
exports.default = parallel(scripts, styles, browsersync, startWatch);