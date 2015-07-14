wss.on("connection", function(ws) {
console.log("websocket connection open");

ws.pingssent = 0;

var id = setInterval(function() {

if (ws.pingssent >= 2)   // how many missed pings you will tolerate before assuming connection broken.
    {
        ws.close();
    }
else
    {
        ws.ping();
        ws.pingssent++;
    }
}, 75 * 1000);   //  75 seconds between pings

 ws.on("pong", function() {    // we received a pong from the client.
    ws.pingssent = 0;    // reset ping counter.
});