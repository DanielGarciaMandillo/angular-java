'use strict';

var gulp = require('gulp');
var jetpack = require('fs-jetpack');
var tsc = require("gulp-typescript");
var sourcemaps  = require('gulp-sourcemaps');
var tsProject = tsc.createProject("tsconfig.json");

var projectDir = jetpack;
var srcDir = projectDir.cwd('./app');
var destDir = projectDir.cwd('./build');

var paths = [
    './**/*.html',
    './**/*.js',
    './**/*.ts',
    './**/*.css'
  ];

// // -------------------------------------
// // Tasks
// // -------------------------------------

gulp.task('watch', function () {
  gulp.watch(paths, ['copy-watch']);
});

gulp.task('copy-watch', ['build']);

gulp.task('clean', function () {
  return destDir.dirAsync('.', {
    empty: true
  });
});


gulp.task("compile", ['clean'], function () {
    var tsResult = gulp.src(["app/**/*.ts", "!**/node_modules/**"])
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("build"));
});


gulp.task("resources", ['clean'] , function () {
    return gulp.src(["app/**/*", "!**/*.ts", "!**/node_modules/[!java]**"])
        .pipe(gulp.dest("build"));
});


gulp.task("libs", ['clean'] , function () {
    return gulp.src([
            'app/node_modules/es6-shim/es6-shim.min.js',
            'app/node_modules/systemjs/dist/system-polyfills.js',
            'app/node_modules/angular2/bundles/angular2-polyfills.js',
            'app/node_modules/systemjs/dist/system.src.js',
            'app/node_modules/rxjs/bundles/Rx.js',
            'app/node_modules/angular2/bundles/angular2.dev.js',
            'app/node_modules/angular2/bundles/router.dev.js'
        ]) /* Glob required here. */
        .pipe(gulp.dest("build/lib"));
});


gulp.task('maven', ['clean'] , function () {
  var mvn = require('maven').create({
    cwd: './'
  });
  return mvn.execute(['clean', 'compile', 'assembly:single'], {});
});


gulp.task('finalize', ['maven'], function () {
  var manifest = srcDir.read('package.json', 'json');

  manifest.name += '-dev';
  manifest.productName += ' Dev';

  destDir.write('package.json', manifest);
});


gulp.task('build', ['clean', 'compile', 'resources', 'libs', 'maven', 'finalize']);