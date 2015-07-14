var wsUrl = process.argv[2];
console.log(wsUrl);

var WebSocket = require('ws')
  , ws = new WebSocket(wsUrl);
ws.on('open', function() {
    ws.send('something');
    console.log('i am connected');
});
while(true){
	ws.on('message', function(message) {
	    console.log('received: %s', message);
	});
}

ws.on('close', function() {
    //ws.send('something');
    console.log('i closed');
});
