'use strict';

var gulp = require('gulp');
var jetpack = require('fs-jetpack');

var projectDir = jetpack;
var srcDir = projectDir.cwd('./app');
var destDir = projectDir.cwd('./build');

var paths = {
    copyFromAppDir: [
        './node_modules/**',
        './vendor/**',
        './**/*.html',
        './**/*.js',
        './**/*.css',
        './**/*.+(jpg|png|svg)'
    ],
}

// -------------------------------------
// Tasks
// -------------------------------------

gulp.task('clean', function(callback) {
    return destDir.dirAsync('.', {
        empty: true
    });
});


var copyTask = function() {
    return projectDir.copyAsync('app', destDir.path(), {
        overwrite: true,
        matching: paths.copyFromAppDir
    });
};

gulp.task('copy', ['clean'], copyTask);
gulp.task('copy-watch', copyTask);

gulp.task('finalize', ['clean'], function() {
    var manifest = srcDir.read('package.json', 'json');

    manifest.name += '-dev';
    manifest.productName += ' Dev';

    destDir.write('package.json', manifest);
});


gulp.task('watch', function() {
    gulp.watch(paths.copyFromAppDir, {
        cwd: 'app'
    }, ['copy-watch']);
});


gulp.task('build', ['copy', 'finalize']);