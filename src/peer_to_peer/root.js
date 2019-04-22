//open room
document.getElementById('open-room').onclick = function() {
  disableInputButtons();
  connection.open(document.getElementById('room-id').value, function(isRoomOpened, roomid, error) {
      if(isRoomOpened === true) {
        // showRoomURL(connection.sessionid);
      }
      else {
        disableInputButtons(true);
        if(error === 'Room not available') {
          alert('Someone already created this room. Please either join or create a separate room.');
          return;
        }
        alert(error);
      }
  });
};
//join room
document.getElementById('open-or-join-room').onclick = function() {
  disableInputButtons();
  connection.openOrJoin(document.getElementById('room-id').value, function(isRoomExist, roomid, error) {
      if(error) {
        disableInputButtons(true);
        alert(error);
      }
      else if (connection.isInitiator === true) {
          // if room doesn't exist, it means that current user will create the room
          // showRoomURL(roomid);
      }
  });
};

const connection = new RTCMultiConnection();
connection.socketURL = '/';

connection.onstream = function(event) {
  var existing = document.getElementById(event.streamid);
  if(existing && existing.parentNode) {
    existing.parentNode.removeChild(existing);
  }
  event.mediaElement.removeAttribute('src');
  event.mediaElement.removeAttribute('srcObject');
  event.mediaElement.muted = true;
  event.mediaElement.volume = 0;
  var video = document.createElement('video');
  try {
      video.setAttributeNode(document.createAttribute('autoplay'));
      video.setAttributeNode(document.createAttribute('playsinline'));
  } catch (e) {
      video.setAttribute('autoplay', true);
      video.setAttribute('playsinline', true);
  }
  if(event.type === 'local') {
    video.volume = 0;
    try {
        video.setAttributeNode(document.createAttribute('muted'));
    } catch (e) {
        video.setAttribute('muted', true);
    }
  }
  video.srcObject = event.stream;
  var width = parseInt(connection.videosContainer.clientWidth / 3) - 20;
  var mediaElement = getHTMLMediaElement(video, {
      title: event.userid,
      buttons: ['full-screen'],
      width: width,
      showOnMouseEnter: false
  });
  connection.videosContainer.appendChild(mediaElement);
  setTimeout(function() {
      mediaElement.media.play();
  }, 5000);
  mediaElement.id = event.streamid;
  // to keep room-id in cache
  localStorage.setItem(connection.socketMessageEvent, connection.sessionid);
  chkRecordConference.parentNode.style.display = 'none';
  if(chkRecordConference.checked === true) {
    btnStopRecording.style.display = 'inline-block';
    recordingStatus.style.display = 'inline-block';
    var recorder = connection.recorder;
    if(!recorder) {
      recorder = RecordRTC([event.stream], {
        type: 'video'
      });
      recorder.startRecording();
      connection.recorder = recorder;
    }
    else {
      recorder.getInternalRecorder().addStreams([event.stream]);
    }
    if(!connection.recorder.streams) {
      connection.recorder.streams = [];
    }
    connection.recorder.streams.push(event.stream);
    recordingStatus.innerHTML = 'Recording ' + connection.recorder.streams.length + ' streams';
  }
  if(event.type === 'local') {
    connection.socket.on('disconnect', function() {
      if(!connection.getAllParticipants().length) {
        location.reload();
      }
    });
  }
};
