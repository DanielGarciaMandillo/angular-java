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
var core_1 = require("angular2/core");
var TfgTitle = (function () {
    function TfgTitle() {
    }
    TfgTitle = __decorate([
        core_1.Component({
            selector: "tfg-title",
            inputs: ["name"],
            template: "\n      <header>\n        <h1>{{name}}</h1>\n      </header>"
        }), 
        __metadata('design:paramtypes', [])
    ], TfgTitle);
    return TfgTitle;
}());
exports.TfgTitle = TfgTitle;
