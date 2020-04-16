// The -g flag in this command tells npm to install Gulp globally onto your computer, which allows you to use the gulp command anywhere on your system. npm install gulp -g
const gulp=require('gulp');
const sass=require('gulp-sass');
const cssnano=require('gulp-cssnano');
const rev=require('gulp-rev');
const uglify=require('gulp-uglify-es').default;
const imagemin=require('gulp-imagemin');
const del=require('del');
gulp.task('css',function(done){
    console.log('simplifing css....');
    // The double star in this case means all folders within the current folder
    // The * pattern is a wildcard that matches any pattern in the current directory. In this case, we’re matching any files ending with .scss in the root folder
    gulp.src('./assests/scss/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assests.css'));
    
    return gulp.src('./assests/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assests'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assests'));
    done();
});

gulp.task('js',function(done) {
    console.log('minfying js.....');
    gulp.src('./assests/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assests'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assests'));
    done();
});

gulp.task('images', function(done){
    console.log('compressing images...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

// empty the public/assets directory
gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('Building assets');
    done();
});