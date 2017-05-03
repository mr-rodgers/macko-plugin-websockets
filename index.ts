import { ProtocolHandler } from "macko-plugin-helpers";
import * as Websocket from "ws";

export default class WebsocketHandler implements ProtocolHandler {
    protocol = "ws://";
    name = "Websockets";
    supportedPayloads = ["text/plain"];

    watch(url: string) {
        let ws = new Websocket(url);
        return new WebsocketWatcher(ws);        
    }
}

class WebsocketWatcher extends NodeJS.EventEmitter {
    constructor(private ws: Websocket) { 
        super();

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