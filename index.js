const express = require('express');
const app = express();
const http = require('http').createServer(app);
var io = require('socket.io')(http);
const RTCMultiConnectionServer = require('./node_scripts/index');

const jsonPath = {
    config: 'config.json',
    logs: 'logs.json'
};

const BASH_COLORS_HELPER = RTCMultiConnectionServer.BASH_COLORS_HELPER;
const getValuesFromConfigJson = RTCMultiConnectionServer.getValuesFromConfigJson;
const getBashParameters = RTCMultiConnectionServer.getBashParameters;
// const resolveURL = RTCMultiConnectionServer.resolveURL;

var config = getValuesFromConfigJson(jsonPath);
config = getBashParameters(config, BASH_COLORS_HELPER);
io.on('connection',socket=>{
    RTCMultiConnectionServer.addSocket(socket, config);

    // ----------------------
    // below code is optional

    const params = socket.handshake.query;

    if (!params.socketCustomEvent) {
        params.socketCustomEvent = 'custom-message';
    }

    socket.on(params.socketCustomEvent, function(message) {
        socket.broadcast.emit(params.socketCustomEvent, message);
    });
});

app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('home');
})
app.get('/call',(req,res)=>{
    res.render('peer');
});
app.get('/multi',(req,res)=>{
    res.render('multi');
})

http.listen('3000');