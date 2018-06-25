const gulp          = require('gulp'),
      scss          = require('gulp-sass'),
      autoprefixer  = require('gulp-autoprefixer'),
      csso          = require('gulp-csso'),
      rename        = require('gulp-rename')
      maps          = require('gulp-sourcemaps'),
      browserSync   = require('browser-sync'),
      nunjucks      = require('gulp-nunjucks-render'),
      imagemin      = require('gulp-imagemin')
      ;


gulp.task('css', ()=>{
    return gulp.src('src/sass/main.scss')
    .pipe(maps.init())
    .pipe(scss())
    .pipe(autoprefixer({
        browsers: ['last 5 versions']
    }))
    .pipe(csso())
    .pipe(rename({
        suffix:'.min'
    }))
    .pipe(maps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
    
});

gulp.task('img',()=>{
    return gulp.src('src/img/**/*.*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
    })
    ]))
    .pipe(gulp.dest('dist/img'))
})

gulp.task('html', ()=>{
    return gulp.src('src/views/*.html')
    .pipe(nunjucks({
        path: 'src/'
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
});

gulp.task('reload', ()=>{
    browserSync({
        server: {
            baseDir:'dist/'
        },
        notify: false
    })
});


gulp.task('watch',['reload', 'css', 'html'], ()=>{
    gulp.watch('src/**/*.scss', ['css']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('dist/*.html', browserSync.reload());
});




      
