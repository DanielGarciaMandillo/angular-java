
'use strict';

var gulp = require('gulp');
var jetpack = require('fs-jetpack');
var shell = require('gulp-shell');
var maven = require('maven');

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

gulp.task('clean', function () {
  return destDir.dirAsync('.', {
    empty: true
  });
});

gulp.task('maven', ['clean'] , function () {
  var mvn = maven.create({
    cwd: './'
  });
  return mvn.execute(['clean', 'compile', 'assembly:single'], {});
});

gulp.task('java', ['maven'], shell.task([
  './node_modules/.bin/ts-java'
]));

gulp.task('compile', ['java'], shell.task([
  'tsc',
  'tsc typings/browser.d.ts app/*.ts app/angular/*.ts app/java/*.ts --module commonjs -t es5 --experimentalDecorators --emitDecoratorMetadata --outDir build'
]));

gulp.task('compileSemi', shell.task([
  'tsc',
  'tsc typings/browser.d.ts app/*.ts app/angular/*.ts app/java/*.ts --module commonjs -t es5 --experimentalDecorators --emitDecoratorMetadata --outDir build'
]));

gulp.task("resources", ['compile'] , function () {
    return gulp.src(["app/**/*", "!app/**/*.ts", "!**node_modules**"])
        .pipe(gulp.dest("build"));
});

gulp.task("resourcesSemi", function () {
    return gulp.src(["app/**/*", "!app/**/*.ts", "!**node_modules**"])
        .pipe(gulp.dest("build"));
});

gulp.task('finalize', ['maven'], function () {
  var manifest = srcDir.read('package.json', 'json');

  manifest.name += '-dev';
  manifest.productName += ' Dev';

  destDir.write('package.json', manifest);
});

gulp.task('watch', function () {
  gulp.watch(paths, ['copy-watch']);
});

gulp.task('copy-watch', ['build']);
gulp.task('build', ['compileSemi', 'resourcesSemi']);

gulp.task('buildFull', ['clean', 'maven', 'java', 'compile', 'resources', 'finalize']);