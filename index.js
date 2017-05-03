"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Websocket = require("ws");
class WebsocketHandler {
    constructor() {
        this.protocol = "ws://";
        this.name = "Websockets";
        this.supportedPayloads = ["text/plain"];
    }
    watch(url) {
        let ws = new Websocket(url);
        return new WebsocketWatcher(ws);
    }
}
exports.default = WebsocketHandler;
class WebsocketWatcher extends NodeJS.EventEmitter {
    constructor(ws) {
        super();
        this.ws = ws;
        // Catch and emit message events
        ws.on("message", (data, flags) => {
            this.emit("message", data, flags);
        });
        // Catch and emit error events
        ws.on("error", err => this.emit("error", err));
        // Catch and emit close events
        ws.on("close", (code, message) => this.emit("close", code, message));
    }
    close() {
        this.ws.close();
    }
}
//# sourceMappingURL=index.js.map