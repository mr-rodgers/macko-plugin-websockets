"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const ws = require("nodejs-websocket");
/**
 * A straight-forward implementation of Macko's ProtocolHandler
 * extension interface for websockets.
 */
class WebSocketHandler {
    constructor() {
        this.protocol = "ws://";
        this.name = "WebSocket";
        this.supportedPayloads = ["text/plain"];
    }
    watch(url) {
        return new WebSocketWatcher(url);
    }
}
exports.default = WebSocketHandler;
class WebSocketWatcher extends events_1.EventEmitter {
    constructor(url) {
        super();
        this.conn = null;
        // Keep a reference to the connection so we can
        // close it on request.
        this.conn = ws.connect(url);
        // Add handlers for socket events and forward them as
        // events on this emmitter.
        this.conn.on('error', (err) => this.emit('error', err));
        this.conn.on('close', () => this.emit('close'));
        this.conn.on('text', (message) => this.emit('message', message, { mime: 'text/plain' }));
    }
    /**
     * Close the websocket connet
     */
    close() {
        if (this.conn !== null)
            this.conn.close();
    }
}
//# sourceMappingURL=index.js.map