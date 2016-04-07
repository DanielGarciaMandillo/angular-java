"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var tsJavaModule_1 = require('../java/tsJavaModule');
var tfg_title_component_1 = require('./tfg-title.component');
var App = (function () {
    function App() {
        var _this = this;
        this.framework = 'Angular2 Electron!';
        setTimeout(function () {
            _this.framework = 'Angular2 Electron!!!';
        }, 1000);
        tsJavaModule_1.Java.ensureJvm().then(function () {
            _this.name = "Daniel García";
        });
    }
    App = __decorate([
        core_1.Component({
            selector: 'app',
            template: "<tfg-title name=\"{{name}}\"></tfg-title>\n\t\t\t\t\t\t<div>Hello from {{framework}}</div>",
            directives: [tfg_title_component_1.TfgTitle]
        }), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}());
exports.App = App;
