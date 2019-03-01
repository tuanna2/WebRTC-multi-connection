const openStream = require('./openStream');
document.getElementById('btn-start').addEventListener('click',(event)=>{
  openStream();
  event.preventDefault;
})
