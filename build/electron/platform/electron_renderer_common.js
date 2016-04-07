"use strict";
var lang_1 = require('angular2/src/facade/lang');
var message_bus_1 = require('angular2/src/web_workers/shared/message_bus');
var core_1 = require('angular2/core');
var common_dom_1 = require('angular2/platform/common_dom');
var di_1 = require('angular2/src/core/di');
// TODO change these imports once dom_adapter is moved out of core
var dom_adapter_1 = require('angular2/src/platform/dom/dom_adapter');
var dom_events_1 = require('angular2/src/platform/dom/events/dom_events');
var key_events_1 = require('angular2/src/platform/dom/events/key_events');
var hammer_gestures_1 = require('angular2/src/platform/dom/events/hammer_gestures');
var dom_tokens_1 = require('angular2/src/platform/dom/dom_tokens');
var dom_renderer_1 = require('angular2/src/platform/dom/dom_renderer');
var shared_styles_host_1 = require('angular2/src/platform/dom/shared_styles_host');
var shared_styles_host_2 = require("angular2/src/platform/dom/shared_styles_host");
var browser_details_1 = require('angular2/src/animate/browser_details');
var animation_builder_1 = require('angular2/src/animate/animation_builder');
var compiler_1 = require('angular2/compiler');
var xhr_impl_1 = require('angular2/src/platform/browser/xhr_impl');
var testability_1 = require('angular2/src/core/testability/testability');
var testability_2 = require('angular2/src/platform/browser/testability');
var browser_adapter_1 = require('angular2/src/platform/browser/browser_adapter');
var wtf_init_1 = require('angular2/src/core/profile/wtf_init');
var renderer_1 = require('angular2/src/web_workers/ui/renderer');
var xhr_impl_2 = require('angular2/src/web_workers/ui/xhr_impl');
var browser_platform_location_1 = require('angular2/src/router/location/browser_platform_location');
var service_message_broker_1 = require('angular2/src/web_workers/shared/service_message_broker');
var client_message_broker_1 = require('angular2/src/web_workers/shared/client_message_broker');
var serializer_1 = require('angular2/src/web_workers/shared/serializer');
var api_1 = require('angular2/src/web_workers/shared/api');
var render_store_1 = require('angular2/src/web_workers/shared/render_store');
var electron_message_bus_1 = require('./electron_message_bus');
var electron = require('electron');
exports.WORKER_SCRIPT = lang_1.CONST_EXPR(new di_1.OpaqueToken("WebWorkerScript"));
// Message based Worker classes that listen on the MessageBus
exports.WORKER_RENDER_MESSAGING_PROVIDERS = lang_1.CONST_EXPR([renderer_1.MessageBasedRenderer, xhr_impl_2.MessageBasedXHRImpl]);
exports.WORKER_RENDER_PLATFORM = lang_1.CONST_EXPR([
    core_1.PLATFORM_COMMON_PROVIDERS,
    new di_1.Provider(core_1.PLATFORM_INITIALIZER, { useValue: initWebWorkerRenderPlatform, multi: true })
]);
/**
 * A list of {@link Provider}s. To use the router in a Worker enabled application you must
 * include these providers when setting up the render thread.
 */
exports.WORKER_RENDER_ROUTER = lang_1.CONST_EXPR([browser_platform_location_1.BrowserPlatformLocation]);
exports.WORKER_RENDER_APPLICATION_COMMON = lang_1.CONST_EXPR([
    core_1.APPLICATION_COMMON_PROVIDERS,
    exports.WORKER_RENDER_MESSAGING_PROVIDERS,
    new di_1.Provider(core_1.ExceptionHandler, { useFactory: _exceptionHandler, deps: [] }),
    new di_1.Provider(dom_tokens_1.DOCUMENT, { useFactory: _document, deps: [] }),
    // TODO(jteplitz602): Investigate if we definitely need EVENT_MANAGER on the render thread
    // #5298
    new di_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, { useClass: dom_events_1.DomEventsPlugin, multi: true }),
    new di_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, { useClass: key_events_1.KeyEventsPlugin, multi: true }),
    new di_1.Provider(common_dom_1.EVENT_MANAGER_PLUGINS, { useClass: hammer_gestures_1.HammerGesturesPlugin, multi: true }),
    new di_1.Provider(dom_renderer_1.DomRootRenderer, { useClass: dom_renderer_1.DomRootRenderer_ }),
    new di_1.Provider(core_1.RootRenderer, { useExisting: dom_renderer_1.DomRootRenderer }),
    new di_1.Provider(shared_styles_host_2.SharedStylesHost, { useExisting: shared_styles_host_1.DomSharedStylesHost }),
    new di_1.Provider(compiler_1.XHR, { useClass: xhr_impl_1.XHRImpl }),
    new di_1.Provider(message_bus_1.MessageBus, { useFactory: createMessageBus, deps: [core_1.NgZone] }),
    xhr_impl_2.MessageBasedXHRImpl,
    new di_1.Provider(service_message_broker_1.ServiceMessageBrokerFactory, { useClass: service_message_broker_1.ServiceMessageBrokerFactory_ }),
    new di_1.Provider(client_message_broker_1.ClientMessageBrokerFactory, { useClass: client_message_broker_1.ClientMessageBrokerFactory_ }),
    serializer_1.Serializer,
    new di_1.Provider(api_1.ON_WEB_WORKER, { useValue: false }),
    render_store_1.RenderStore,
    shared_styles_host_1.DomSharedStylesHost,
    testability_1.Testability,
    browser_details_1.BrowserDetails,
    animation_builder_1.AnimationBuilder,
    common_dom_1.EventManager
]);
function initializeGenericWorkerRenderer(injector) {
    var bus = injector.get(message_bus_1.MessageBus);
    var zone = injector.get(core_1.NgZone);
    bus.attachToZone(zone);
    zone.run(function () {
        exports.WORKER_RENDER_MESSAGING_PROVIDERS.forEach(function (token) { injector.get(token).start(); });
    });
}
exports.initializeGenericWorkerRenderer = initializeGenericWorkerRenderer;
function createMessageBus(zone) {
    var sink = new electron_message_bus_1.ElectronMessageBusSink(electron['ipcMain']);
    var source = new electron_message_bus_1.ElectronMessageBusSource(electron['ipcMain']);
    var bus = new electron_message_bus_1.ElectronMessageBus(sink, source);
    bus.attachToZone(zone);
    return bus;
}
function initWebWorkerRenderPlatform() {
    browser_adapter_1.BrowserDomAdapter.makeCurrent();
    wtf_init_1.wtfInit();
    testability_2.BrowserGetTestability.init();
}
exports.initWebWorkerRenderPlatform = initWebWorkerRenderPlatform;
function _exceptionHandler() {
    return new core_1.ExceptionHandler(dom_adapter_1.DOM, !lang_1.IS_DART);
}
function _document() {
    return dom_adapter_1.DOM.defaultDoc();
}
