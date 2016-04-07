'use strict';

var Q = require('q');
var gulpUtil = require('gulp-util');
var childProcess = require('child_process');
var jetpack = require('fs-jetpack');
var fs = require('fs');
var utils = require('./utils');

var projectDir;
var releasesDir;
var packName;
var packDir;
var tmpDir;
var readyAppDir;
var manifest;

var init = function () {
    projectDir = jetpack;
    tmpDir = projectDir.dir('./tmp', { empty: true });
    releasesDir = projectDir.dir('./releases');
    manifest = projectDir.read('build/package.json', 'json');
    packName = manifest.name + '_' + manifest.version;
    packDir = tmpDir.dir(packName);
    readyAppDir = packDir.cwd('opt', manifest.name);

    return Q();
};

var copyRuntime = function () {
    return projectDir.copyAsync('app/node_modules/electron-prebuilt/dist', readyAppDir.path(), { overwrite: true });
};

var packageBuiltApp = function () {
    projectDir.copy('build', readyAppDir.path('resources/app'));

    return Q();
};

var finalize = function () {
    // Create .desktop file from the template
    var desktop = projectDir.read('resources/linux/app.desktop');
    desktop = utils.replace(desktop, {
        name: manifest.name,
        productName: manifest.productName,
        description: manifest.description,
        version: manifest.version,
        author: manifest.author
    });
    packDir.write('usr/share/applications/' + manifest.name + '.desktop', desktop);

    // Copy icon
    projectDir.copy('resources/icon.png', readyAppDir.path('icon.png'));

    return Q();
};

var renameApp = function() {
    return readyAppDir.renameAsync("electron", manifest.name);
};

var packToDebFile = function () {
    var deferred = Q.defer();

    var debFileName = packName + '_amd64.deb';
    var debPath = releasesDir.path(debFileName);

    gulpUtil.log('Creating DEB package...');

    // Counting size of the app in KiB
    var appSize = Math.round(readyAppDir.inspectTree('.').size / 1024);

    // Preparing debian control file
    var control = projectDir.read('resources/linux/DEBIAN/control');
    control = utils.replace(control, {
        name: manifest.name,
        description: manifest.description,
        version: manifest.version,
        author: manifest.author,
        size: appSize
    });
    packDir.write('DEBIAN/control', control);

    // Copy jvm
    projectDir.copy('resources/linux/jre-8u66-linux-x64.tar.gz', readyAppDir.path('jre-8u66-linux-x64.tar.gz'));
    // Copy preinst
    var postinst = projectDir.read('resources/linux/DEBIAN/postinst');
    packDir.write('DEBIAN/postinst', postinst);
    fs.chmodSync(packDir.path('DEBIAN/postinst'), '0755');

    // Build the package...
    childProcess.exec('fakeroot dpkg-deb -Zxz --build ' + packDir.path().replace(/\s/g, '\\ ') + ' ' + debPath.replace(/\s/g, '\\ '),
        function (error, stdout, stderr) {
            if (error || stderr) {
                console.log("ERROR while building DEB package:");
                console.log(error);
                console.log(stderr);
            } else {
                gulpUtil.log('DEB package ready!', debPath);
            }
            deferred.resolve();
        });

    return deferred.promise;
};

var cleanClutter = function () {
    return tmpDir.removeAsync('.');
};

module.exports = function () {
    return init()
    .then(copyRuntime)
    .then(packageBuiltApp)
    .then(finalize)
    .then(renameApp)
    .then(packToDebFile)
    .then(cleanClutter)
    .catch(console.error);
};