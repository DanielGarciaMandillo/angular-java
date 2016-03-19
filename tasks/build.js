'use strict';

var gulp = require('gulp');
var jetpack = require('fs-jetpack');
var typescript = require('gulp-typescript');
var tscConfig = require('../tsconfig.json');

var projectDir = jetpack;
var srcDir = projectDir.cwd('./app');
var destDir = projectDir.cwd('./build');

var paths = {
  copyFromAppDir: [
    './node_modules/**',
    './**/*.jar',
    './**/*.html',
    './**/*.js',
    './**/*.css',
    './**/*.+(jpg|png|svg)'
  ],
};

// -------------------------------------
// Tasks
// -------------------------------------

gulp.task('clean', function (callback) {
  return destDir.dirAsync('.', {
    empty: true
  });
});

var copyTask = function () {
  return projectDir.copy('app', destDir.path(), {
    overwrite: true,
    matching: paths.copyFromAppDir
  });
};

gulp.task('typescript', ['clean'], function (callback) {
  return gulp
    .src('app/*.ts')
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(gulp.dest('build'));

});

gulp.task('maven', ['typescript'], function (callback) {
  var mvn = require('maven').create({
    cwd: './'
  });
  return mvn.execute(['clean', 'compile', 'assembly:single'], {});
});

gulp.task('copy', ['typescript', 'maven'], copyTask);
gulp.task('copy-watch', copyTask);

gulp.task('finalize', ['maven'], function () {
  var manifest = srcDir.read('package.json', 'json');

  manifest.name += '-dev';
  manifest.productName += ' Dev';

  destDir.write('package.json', manifest);
});

gulp.task('watch', function () {
  gulp.watch(paths.copyFromAppDir, {
    cwd: 'app'
  }, ['copy-watch']);
});

gulp.task('build', ['clean', 'typescript', 'maven', 'copy', 'finalize']);