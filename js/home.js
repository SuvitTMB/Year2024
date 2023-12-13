var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var cleararray = "";
var ShortDate = "";

$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Moon2023")==null) { location.href = "index.html"; }
  Connect_DB();
  dbGiftRewards = firebase.firestore().collection("GiftNewYear2567");
  dbCardNewyear = firebase.firestore().collection("NewyearCard2567");
  OpenMP4();
  //StartGame();LoyKrathong
  //CheckSelect();
});


function OpenMP4() {
  /*
  if(sessionStorage.getItem("DisplayVideo")==null) { 
    sessionStorage.setItem("DisplayVideo", 'Video');
    var vid = document.getElementById("video");
    vid.autoplay = true;
    vid.load();
    document.getElementById('id03').style.display='block';
  }
  */
  if(sessionStorage.getItem("DisplayDemo")==null) { 
    sessionStorage.setItem("DisplayDemo", 'Video');
    document.getElementById('id03').style.display='block';
  }
  CountCard();
  DisplayUser();
}


function CountCard() { 
  var i = 0;
  dbCardNewyear
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      i = i+1;
    });
    $("#CountUser").html("ขณะนี้มีส่งการ์ดแล้ว <span class='font18'>"+ addCommas(i) +"</span> รายการ");
    //console.log(i);
  });  
}


function DisplayUser() {
  var str = "";
  dbCardNewyear
  .orderBy('TimeStampDate','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      str += '<img src="'+ doc.data().LinePicture +'" class="Profile-img" onclick="ClickUser(\''+ doc.id+'\')" onerror="javascript:imgError(this)" title="'+ doc.data().EmpName +'">';
    });
    $("#ShowUser").html(str);
    document.getElementById('loading').style.display='none';
    document.getElementById('ShowCard').style.display='block';
  }); 
}


function ClickUser(x) {
  $("#DisplayCard").html(cleararray);
  var str = "";
  NewDate();
  dbCardNewyear.where(firebase.firestore.FieldPath.documentId(), "==", x)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xCheckView = doc.data().LoyViewPage + 1;
      //str += '<div class="img-bottom fixed" style="position:relative;"><img src="./map/'+ doc.data().LoyMapLoyKrathong +'" style="width:100%; height:75vh; border-radius:15px; margin-top:-15px;">';
      str += '<div class="img-bottom fixed"><img src="./map/'+ doc.data().LoyMapLoyKrathong +'" style="width:110%; height:75vh;">';
      str += '<div class="img-sendcard"><img src="./img/bg-header.png" style="width:230px; opacity:1;"></div>';
      str += '<div class="img-showtext" style="padding-top:18px;">';
      str += '<div class="img-year"><img src="./img/bg-newyear2024.png" style="width:120px;"></div>';
      //if(doc.data().Select2!=99) {
      console.log(doc.data().LoySelect3);
      if(doc.data().LoySelect3==88) {
        str += '<div style="position: relative; margin-top:-85px;"><img src="'+ doc.data().LinePicture +'" class="img-over-person4"></div>';
        str += '<div style="margin:110px auto 10px auto; font-weight: 600; color:#ffff00; font-size: 14px;">ขอส่งความสุข ... แด่<br>" '+ doc.data().LoyFriendName +' "</div>';
      } else {
        str += '<div style="position:relative; margin-top:-85px;"><img src="./img/person-'+ doc.data().LoySelect3  +'.png" class="img-over-person4"><div style="position: absolute;right:45%; top:50px;"><img src="'+ doc.data().LinePicture +'" class="img-over-person1"></div></div>';
        str += '<div style="margin:110px auto 10px auto; font-weight: 600; color:#ffff00; font-size: 14px;">ขอส่งความสุข ... แด่<br>" '+ doc.data().LoyFriendName +' "</div>';
      } 
      str += '<div style="margin:10px auto;">'+ doc.data().LoyMemotoFriend +'</div>';
      str += '<div style="margin:15px auto 5px auto; font-weight: 600; color:#ffff00;">" '+ doc.data().EmpName +' "</div>';
      str += '<div style="text-align:center; color:#ccc; font-size:11px; margin-top:-5px;">'+ ShortDate +'  (view : '+ doc.data().LoyViewPage +')</div></div>';
      str += '</div>';
    });
    dbCardNewyear.doc(x).update({
        LoyViewPage : xCheckView
    });
    document.getElementById('id02').style.display='block';
    $("#DisplayCard").html(str);
  });
}


/*
function download() {
  //var img = loadImage('./map/map-1.jpg', callback);
  console.log(document.getElementById("DisplayCard"));
  html2canvas(document.getElementById("DisplayCard")).then(function(canvas) {
    document.body.appendChild(canvas);
    const image = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.download = "./map/map-1.jpg";
    link.href = image;
    link.click();
  });
 }
*/

function imgError(image) {
    image.onerror = "";
    image.src = "./img/box.png";
    return true;
}


function NewDate() {
  var today = new Date();
  var day = today.getDate() + "";
  var month = (today.getMonth() + 1) + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";
  var ampm = hour >= 12 ? 'PM' : 'AM';
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);
  dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
  ShortDate = day + "/" + month + "/" + year ;
}

function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}

function addCommas(nStr) {
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}


function numberWithCommas(num) {
  var valueString=num; //can be 1500.0 or 1500.00 
  var amount=parseFloat(valueString).toFixed(2);
  return formattedString= amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function GotoGame() {
  var video = document.querySelector("#video");
  video.pause();
  video.currentTime = 0;
  location.href = "game.html";
}

function GotoCard() {
  var video = document.querySelector("#video");
  video.pause();
  video.currentTime = 0;
  location.href = "online.html";
}

function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];   
}


function CloseAll() {
  var video = document.querySelector("#video");
  video.pause();
  video.currentTime = 0;
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='none';
  document.getElementById('id04').style.display='none';
}


function CloseVDO() {
  var video = document.querySelector("#video");
  video.pause();
  video.currentTime = 0;
  document.getElementById('id03').style.display='none';
  CheckData();
}

function Song1() {
  var video = document.querySelector("#video");
  video.pause();
  video.currentTime = 0;

  //CloseVDO();
  var vid = document.getElementById("myaudio1");
  vid.autoplay = true;
  vid.load();
  document.getElementById('id03').style.display='none';
  //window.location.href='history.html#A';
}
