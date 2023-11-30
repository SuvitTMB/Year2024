
$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Moon2023")==null) { location.href = "index.html"; }
});


function Song1() {
  CloseVDO();
  var vid = document.getElementById("myaudio1");
  vid.autoplay = true;
  vid.load();
  window.location.href='history.html#A';
}

function Song2() {
  CloseVDO();
  var vid = document.getElementById("myaudio2");
  vid.autoplay = true;
  vid.load();
  window.location.href='history.html#B';
/*
  var vid = document.getElementById("myaudio2");
  vid.autoplay = true;
  vid.load();
*/
}


function CloseVDO() {
  var video1 = document.querySelector("#myaudio1");
  video1.pause();
  video1.currentTime = 0;
  var video2 = document.querySelector("#myaudio2");
  video2.pause();
  video2.currentTime = 0;
}
