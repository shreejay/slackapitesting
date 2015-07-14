var clientUrl = process.argv[2];
console.log(clientUrl);


var WebSocketClient = require('websocket').client;
 
var client = new WebSocketClient();
 
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});
 
client.on('connect', function(connection) {
    var self = this
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
            msgJson = JSON.parse(message.utf8Data);
            if(msgJson.type === "message"){
                console.log(' this is  a message ************')
                var actualMsg = JSON.stringify(msgJson.text);
                console.log(typeof(actualMsg))
                if(actualMsg.indexOf("spoiler") > -1){
                    console.log(" Dang you spoiler person")
                    connection.sendUTF(JSON.stringify({"id": 1,"type": "message","channel": "C07J8CWG7","text": "Dang you spoiler person"}))
                }
            }
        }
    });
    
    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            console.log('Sending number')
            //connection.sendUTF(number.toString());
            setTimeout(sendNumber, 10000);
        }
    }
    sendNumber();
    // self.pingssent = 0;

    // var id = setInterval(function() {

    // if (self.pingssent >= 2)   // how many missed pings you will tolerate before assuming connection broken.
    //     {
    //         self.close();
    //     }
    // else
    //     {
    //         self.ping();
    //         self.pingssent++;
    //     }
    // }, 1 * 1000);   //  75 seconds between pings

    // self.on("pong", function() {    // we received a pong from the client.
    //     self.pingssent = 0;    // reset ping counter.
    // });
});
 

//client.connect(clientUrl, null, options, null);
client.connect(clientUrl);