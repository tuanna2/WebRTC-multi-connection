const openStream = require('./openStream');
const snapShot = require('./snapShot.js');

document.getElementById('btn-start').addEventListener('click',(event)=>{ // init stream
  openStream();
  event.preventDefault;
})
document.getElementById('btn-hu').addEventListener('click',event =>{ //stop stream
  stopStreamedVideo( document.getElementById('localStream'));
  event.preventDefault;
})
snapShot();