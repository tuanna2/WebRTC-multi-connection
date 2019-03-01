module.exports = ()=>{
    navigator.mediaDevices.getUserMedia({ audio: false, video: true })
    .then(function(stream) {
        const video = document.getElementById('localStream');
        video.srcObject = stream;
        video.onloadedmetadata = function() {
            video.play();
        };
        document.getElementById('btn-hu').addEventListener('click',(event)=>{ //stop stream
            stopStreamedVideo(video);
            event.preventDefault;
        })
    })
    .catch(err=> {
    console.log(err)
    });
    }
function stopStreamedVideo(videoElem) {
    let stream = videoElem.srcObject;
    let tracks = stream.getTracks();
    tracks.forEach((track)=> {
      track.stop();
    });
    videoElem.srcObject = null;
  }