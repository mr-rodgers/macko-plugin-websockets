import { EventEmitter } from "events";
const ws: any = require("nodejs-websocket"); // no typings


/**
 * A straight-forward implementation of Macko's ProtocolHandler
 * extension interface for websockets.
 */
export default class WebSocketHandler implements Macko.IProtocolHandler {
    protocol = "ws://";
    name = "WebSocket";
    supportedPayloads = ["text/plain"];

    watch(url: string) {
        return new WebSocketWatcher(url);        
    }
}

class WebSocketWatcher extends EventEmitter {
    private conn: any = null;

    constructor(url: string) { 
        super();

        // Keep a reference to the connection so we can
        // close it on request.
        this.conn = ws.connect(url);

        // Add handlers for socket events and forward them as
        // events on this emmitter.
        this.conn.on('error', (err: Error) => this.emit('error', err));
        this.conn.on('close', () => this.emit('close'));
        this.conn.on('text', (message: string) => this.emit('message', message, {mime: 'text/plain'}));
    }

    /**
     * Close the websocket connet
     */
    close() {
        if (this.conn !== null) this.conn.close();
    }
}