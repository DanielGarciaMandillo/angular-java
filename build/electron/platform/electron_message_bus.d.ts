import { MessageBus, MessageBusSource, MessageBusSink } from "angular2/src/web_workers/shared/message_bus";
import { NgZone, EventEmitter } from 'angular2/core';
/**
 * Typescript Implementation of MessageBus for use in electron apps
 */
export declare const ELECTRON_WORKER: string;
export declare const ELECTRON_CLIENT: string;
export declare const ELECTRON_READY: string;
export declare class ElectronMessageBus implements MessageBus {
    sink: ElectronMessageBusSink;
    source: ElectronMessageBusSource;
    private env;
    constructor(sink: ElectronMessageBusSink, source: ElectronMessageBusSource, env?: string);
    attachToZone(zone: NgZone): void;
    initChannel(channel: string, runInZone?: boolean): void;
    from(channel: string): EventEmitter<any>;
    to(channel: string): EventEmitter<any>;
}
export declare class ElectronMessageBusSink implements MessageBusSink {
    private _ipc;
    private _zone;
    private _channels;
    private _messageBuffer;
    constructor(_ipc: any);
    attachToZone(zone: NgZone): void;
    initChannel(channel: string, runInZone?: boolean): void;
    to(channel: string): EventEmitter<any>;
    private _sendMessages(messages);
    private _handleOnEventDone();
}
export declare class ElectronMessageBusSource implements MessageBusSource {
    private _ipc;
    private _zone;
    private _channels;
    constructor(_ipc?: any);
    attachToZone(zone: NgZone): void;
    initChannel(channel: string, runInZone?: boolean): void;
    from(channel: string): EventEmitter<any>;
    private _handleMessages(messages);
    private _handleMessage(data);
}
