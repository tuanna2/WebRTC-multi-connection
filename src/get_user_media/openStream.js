module.exports = async () =>{
    try{
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        handleSuccess(stream);
    } catch(e){
        handleError(e)
    }
}

stopStreamedVideo = (videoElem) => {
    let stream = videoElem.srcObject;
    let tracks = stream.getTracks();
    tracks.forEach((track)=> {
      track.stop();
    });
    videoElem.srcObject = null;
}

handleSuccess = stream =>{
    const video = document.getElementById('localStream');
    video.srcObject = stream;
    video.onloadedmetadata = ()=> {
        video.play();
    };
}

handleError = error =>{
    error.name == 'NotAllowedError'?
        alert('Permissions have not been granted to use your camera and microphone')
    :   alert(error.name);
}