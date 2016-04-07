"use strict";
require('reflect-metadata');
require('zone.js/dist/zone');
var main_1 = require('./electron/main');
var component_1 = require('./angular/component');
main_1.bootstrap(component_1.App, []);
