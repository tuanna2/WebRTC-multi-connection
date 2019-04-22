module.exports = ()=>{
    const video = document.getElementById('localStream');
    const filterSelect = document.getElementById('filter');
    const canvas = window.canvas = document.getElementById('canvas');
    filterSelect.onchange = ()=> {
        video.className = filterSelect.value;
    };
  document.getElementById('btn-canvas').addEventListener('click',()=>{
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.className = filterSelect.value;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  }); 
}