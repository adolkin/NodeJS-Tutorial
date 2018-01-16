import * as express from "express";
import * as path from "path";
import { Server } from "ws";

const app = express();

app.use('/', express.static(path.join(__dirname, '..', 'client')));
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client/simple-websocket-client.html'));
});

const httpServer = app.listen(8000, "localhost", () => {
  console.log('HTTP Server is listening on port 8000');
});

var wsServer: Server = new Server({ port: 8085 });

console.log('WebSocket server is listening on port 8085');

wsServer.on('connection', websocket => websocket.send('This message was pushed by the WebSocket server'));