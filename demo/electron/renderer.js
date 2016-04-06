"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
//public angular electron API for renderer (UI/browser)
__export(require('angular2/core'));
__export(require('./platform/electron_renderer'));
