
'use strict';

var gulp = require('gulp');
var jetpack = require('fs-jetpack');
var shell = require('gulp-shell');
var merge = require('merge2'); 
var ts = require('gulp-typescript');
var maven = require('maven');

var utils = require('./utils');

var projectDir = jetpack;
var srcDir = projectDir.cwd('./app');
var destDir = projectDir.cwd('./build');

var paths = [
    './**/*.html',
    './**/*.js',
    './**/*.ts',
    './**/*.css'
  ];

var typescriptPath = [
    'typings/browser.d.ts',
    'app/**/*.ts', 'app/*.ts',
    '!app/node_modules/**'
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

gulp.task('ts-java', ['maven'], shell.task([
  'cd node_modules/.bin',
  'ts-java'
]));

gulp.task('compile', ['ts-java'], function() {
  return compileTypescript(typescriptPath);
});

gulp.task('compileSemi', function() {
  return compileTypescript(typescriptPath);
});

gulp.task("resources", ['compile'] , function () {
    return copyResources();
});

gulp.task("resourcesSemi", ['compileSemi'], function () {
    return copyResources();
});

gulp.task('electron_', ['resourcesSemi'], function() {
    return runElectron();
});

gulp.task('electron', ['finalize'], function() {
    return runElectron();
});

gulp.task('finalize', ['resources'], function () {
  var manifest = srcDir.read('package.json', 'json');

  manifest.name += '-dev';
  manifest.productName += ' Dev';

  destDir.write('package.json', manifest);
});

gulp.task('watch', function () {
  gulp.watch(paths, ['copy-watch']);
});

gulp.task('build', ['compileSemi', 'resourcesSemi', 'electron_']);
gulp.task('buildFull', ['clean', 'maven', 'ts-java', 'compile', 'resources', 'finalize', 'electron']);

gulp.task('copy-watch', ['build']);

  var runElectron = function() {
  var electronForOs = {
      linux: electronForLinux(),
      windows: electronForWindows()
  };

  return electronForOs[utils.os()]();
}

var compileTypescript = function(path) {
    var tsResult = gulp.src(path)
    .pipe(ts({
        target: 'ES5',
        experimentalDecorators: true,
        emitDecoratorMetadata: true
    }));
   
    return merge([
      tsResult.js.pipe(gulp.dest('./build'))
    ]);
}

var copyResources = function() {
  return gulp.src(["app/**/*", "!app/**/*.ts", "!**node_modules**"])
        .pipe(gulp.dest("build"));
}

var electronForLinux = function() {
  return shell.task([
    './app/node_modules/electron-prebuilt/dist/electron ./build'
  ]);
}

var electronForWindows = function() {
  return shell.task([
    './app/node_modules/electron-prebuilt/dist/electron.exe ./build'
  ]);
}