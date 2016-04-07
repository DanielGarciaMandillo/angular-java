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
var electron = require('electron');
var electron_message_bus_1 = require('./electron_message_bus');
var message_bus_1 = require('angular2/src/web_workers/shared/message_bus');
var core_1 = require('angular2/core');
var di_1 = require('angular2/src/core/di');
var electron_renderer_common_1 = require('./electron_renderer_common');
var lang_1 = require('angular2/src/facade/lang');
/**
 * Wrapper class that exposes the Worker
 * and underlying {@link MessageBus} for lower level message passing.
 */
var WebWorkerInstance = (function () {
    function WebWorkerInstance() {
    }
    /** @internal */
    WebWorkerInstance.prototype.init = function (worker, bus) {
        this.worker = worker;
        this.bus = bus;
    };
    WebWorkerInstance = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], WebWorkerInstance);
    return WebWorkerInstance;
}());
exports.WebWorkerInstance = WebWorkerInstance;
/**
 * An array of providers that should be passed into `application()` when initializing a new Worker.
 */
exports.WORKER_RENDER_APPLICATION = lang_1.CONST_EXPR([
    electron_renderer_common_1.WORKER_RENDER_APPLICATION_COMMON,
    WebWorkerInstance,
    new di_1.Provider(core_1.APP_INITIALIZER, {
        useFactory: function (injector) { return function () { return initWebWorkerApplication(injector); }; },
        multi: true,
        deps: [di_1.Injector]
    }),
    new di_1.Provider(message_bus_1.MessageBus, { useFactory: initMessageBus })
]);
function initMessageBus() {
    var sink = new electron_message_bus_1.ElectronMessageBusSink(electron.ipcRenderer);
    var source = new electron_message_bus_1.ElectronMessageBusSource(electron.ipcRenderer);
    var bus = new electron_message_bus_1.ElectronMessageBus(sink, source);
    return bus;
}
function initWebWorkerApplication(injector) {
    electron_renderer_common_1.initializeGenericWorkerRenderer(injector);
}
exports.bootstrapElectronRenderer = function () {
    electron.ipcRenderer.sendSync(electron_message_bus_1.ELECTRON_READY);
    core_1.platform([electron_renderer_common_1.WORKER_RENDER_PLATFORM]).application([exports.WORKER_RENDER_APPLICATION]);
};
