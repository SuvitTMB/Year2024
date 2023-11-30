var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var cleararray = 0;
var CheckPage = 0;
var CountAllCard = 0;
var Select1 = 99;
var Select2 = 99; 
var Select3 = 99;
var Select4 = 99;
var Select5 = 99;
var FriendName = "";
var MemotoFriend = "";
var MemotoFriend1 = "";
var MapLoyKrathong = "";
var LoyFriendName = "";
var ShortDate = "";


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Moon2023")==null) { location.href = "index.html"; }
  Connect_DB();
  //dbGiftRewards = firebase.firestore().collection("Gift2023Rewards");
  dbNewYearCard = firebase.firestore().collection("NewyearCard2567");
  if(MapLoyKrathong=="") { MapLoyKrathong = "map-1.jpg"; }
  //CountCard();
  StartGame();
  CheckSelect();
  StartKrathong();
});


function StartKrathong() {
  //alert("Click");
  document.getElementById('OpenKrathong').style.display='none';
  document.getElementById('DisplayKrathong').style.display='block';
}


function CountCard() { 
  var i = 0;
  dbNewYearCard
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      i = i+1;
    });
    CountAllCard = i;
    console.log("Count="+CountAllCard);
    $("#CountUser").html(addCommas(i));
  });  
}


function StartGame() {
  var str = "";
  var str1 = "";
  if(Select4==99) {
    CountCard();
    str += '<div class="img-bottom"><img src="./map/'+ MapLoyKrathong +'" class="img-fix">';
    str += '<div class="img-over-img" style="margin-top:150px;"></div>';
    str += '<div style="height:140px;margin:-130px auto 10px auto;"></div>';
    str += '<div class="img-over-icon" style="padding-top:20px;"><div><img src="./img/bg-header.png" style="width:80%; opacity:1;"></div><div style="margin:12px 5px;">LINE Retail Society</b><br>ชวนคุณมาร่วมสร้างการ์ดอวยพรปีใหม่<br>ง่าย ๆ กับ 3 ขั้นตอน เริ่มกันเลย..</div><div style="margin:5px auto 20px auto; color:#ffff00; font-weight:400;">ขณะนี้มีส่งการ์ดแล้ว <b><span id="CountUser">0</span></b> รายการ<br><br></div></div>';
    str += '</div>';
  } else {
    if(Select4!=99) {
      str += '<div class="img-bottom" style="position: relative; text-align: center;"><img src="./map/'+ MapLoyKrathong +'" style="width:100%;">';
      str += '<div style="position: absolute; bottom:9px; margin:auto; width:100%; background:#10d100; padding:15px; opacity:.9"><img src="./img/bg-header.png" style="width:230px; opacity:1;"></div>';
      str += '<div style="height:140px;margin:-130px auto 10px auto;"></div>';
      //str += '<div class="img-over-img1"><img src="./map/map-'+Select1+'.png" style="width:100%; max-width: 80%;margin:auto;"></div></div>';
      str += '</div>';
    }
    if(Select2!=99) {
      str += '<div class="img-over-icon">ข้อความอวยพรปีใหม่<br>'+ MemotoFriend +'</div>';
    }
    if(Select3==88) {
      str += '<div class="img-over-person"><div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="img-over-person" style="left:100%;"></div></div>';
    } else if(Select3!=99) {
      str += '<div class="img-over-person"><div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="img-over-person"></div><div><img src="./img/person-'+ Select3 +'.png" class="img-over-person1"></div></div>';
    } 
  }
  $("#ShowDisplay").html(str);
}


function Krathong(x) {
  if(x==1) {
    SelectMap();
    //SelectKrathong();
  } else if(x==2) {
    SelectTextMemo();
  } else if(x==3) {
    SelectPerson();
  } else if(x==4) {
    SelectMap();
  }
}

function CheckSelect() {
  var str = "";
  console.log(Select1+"==="+Select2+"==="+Select3+"==="+Select4);
  if(Select4!=99 && Select2!=99 && Select3!=99) {
    document.getElementById('DisplaySelect').style.display='none';
    document.getElementById('GoKathong').style.display='block';
  } 
  str += '<div style="width:95%; max-width: 500px; margin:5px auto 15px auto;">';
  if(Select4!=99) {
    str += '<div class="box_gift11" onclick="Krathong(1)"><img src="./img/icon-card.png" class="img-width"><br>1.เลือกการ์ด</div>';
  } else {
    str += '<a href=javascript:playSound("RandomSound");>';
    str += '<div class="box_gift1" onclick="Krathong(1)"><img src="./img/icon-card.png" class="img-width"><br>1.เลือกการ์ด</div>';
    str += '</a>';
  }
  if(Select2!=99) {
    str += '<div class="box_gift11" onclick="Krathong(2)"><img src="./img/icon-memo.png" class="img-width"><br>2.เขียนข้อความ</div>';
  } else {
    str += '<div class="box_gift1" onclick="Krathong(2)"><img src="./img/icon-memo.png" class="img-width"><br>2.เขียนข้อความ</div>';
  }
  if(Select3!=99) {
    str += '<div class="box_gift11" onclick="Krathong(3)"><img src="./img/icon-santa.png" class="img-width"><br>3.ระบุชื่อผู้รับ</div>';
  } else {
    str += '<div class="box_gift1" onclick="Krathong(3)"><img src="./img/icon-santa.png" class="img-width"><br>3.ระบุชื่อผู้รับ</div>';
  }
  str += '</div><div class="clr"></div>';
  $("#DisplaySelect").html(str);
}



function SelectTextMemo() {
  var str = "";
  str += '<div class="checkbox-group" style="margin-top:5px;"><div class="radio-buttons">';
  for (var i = 0, length = arrTextMemo.length; i < length; i++) {
    if(arrTextMemo[i][0]==Select2) {
      str += '<label class="custom-radio" style="margin-bottom:0;"><input type="radio" id="b'+ i +'" name="SelectUser" value="'+ arrTextMemo[i] +'" checked>';
      str += '<span class="radio-btn"><i class="las la-check"></i><div class="hobbies-icon">';
      str += '<div><img src="./img/flower-'+ i +'.png" style="width:140%;"></div><div class="radio-label">'+ arrTextMemo[i][1] +'</div></div></span></label>';
    } else {
      str += '<label class="custom-radio"style="margin-bottom:0;"><input type="radio" id="b'+ i +'" name="SelectUser" value="'+ arrTextMemo[i] +'">';
      str += '<span class="radio-btn"><i class="las la-check"></i><div class="hobbies-icon">';
      str += '<div onclick="SelectItem2('+i+')" ><img src="./img/flower-'+ i +'.png" style="width:140%;"></div><div class="radio-label">'+ arrTextMemo[i][1] +'</div></div></span></label>';
    }
  } 
  if(MemotoFriend!="") {
    str += '<div style="margin:20px auto; color:#fff;"><textarea onmouseout="CheckNewMemo()" name="text" id="txttextmemo" style="margin:12px auto 3px auto; height:90px; width:80%; padding:7px; background:#c9ebd1;border-radius: 10px; color:#000;">'+ MemotoFriend +'</textarea><div style="margin-top:8px;">ใส่คำอวยพรปีใหม่ของคุณได้ที่นี่</div></div>';  
  } else {
    str += '<div style="margin:20px auto; color:#fff;"><textarea onmouseout="CheckNewMemo()" name="text" id="txttextmemo" style="margin:12px auto 3px auto; height:90px; width:80%; padding:7px; background:#c9ebd1;border-radius: 10px; color:#000;"></textarea><div style="margin-top:8px;">ใส่คำอวยพรปีใหม่ของคุณได้ที่นี่</div></div>';  
  }
  str += '</div>';
  $("#DisplaySelect2").html(str);
  document.getElementById('id02').style.display='block';
}


function SelectPerson() {
  var str = "";
  str += '<div class="checkbox-group" style="margin-top:5px;"><div class="radio-buttons">';
  str += '<div style="margin:20px auto; color:#fff;"><input id="txtfriendname" onmouseout="CheckFriendName()" style="width:50%; padding:7px; text-align:center; background:#ff69d3;border-radius: 30px; color:#fff;" type="text" value="'+ FriendName +'"><div style="margin-top:8px;color:#ccc;">ใส่ชื่อเพื่อนของคุณ</div></div>';
  for (var i = 0, length = arrPerson.length; i < length; i++) {
    if(arrPerson[i][0]==Select3) {
      str += '<label class="custom-radio" style="margin-bottom:0;"><input type="radio" id="c'+ i +'" name="SelectUser" value="'+ arrPerson[i] +'" checked>';
      str += '<span class="radio-btn" style="min-height:6.0rem;"><i class="las la-check"></i><div class="hobbies-icon">';
      str += '<div><img src="./img/person-'+ i +'.png" style="margin-bottom:0px;"></div></div></span></label>';
      //str += '<div><img src="./img/person-'+ i +'.png"></div><div class="radio-label">'+ arrPerson[i][1] +'</div></div></span></label>';
    } else {
      str += '<label class="custom-radio"style="margin-bottom:0;"><input type="radio" id="c'+ i +'" name="SelectUser" value="'+ arrPerson[i] +'">';
      str += '<span class="radio-btn" style="min-height:6.0rem;"><i class="las la-check"></i><div class="hobbies-icon">';
      str += '<div onclick="SelectItem3('+i+')" ><img src="./img/person-'+ i +'.png" style="margin-bottom:0px;"></div></div></span></label>';
      //str += '<div style="margin-top:8px;">เลือกรูปภาพบุคคล</div>';
      //str += '<div onclick="SelectItem3('+i+')" ><img src="./img/person-'+ i +'.png"></div><div class="radio-label">'+ arrPerson[i][1] +'</div></div></span></label>';
    }
  } 
  str += '<div style="margin-top:0px; color:#ccc;">เลือกรูปภาพบุคคล</div>';
  str += '</div>';
  $("#DisplaySelect3").html(str);
  document.getElementById('id03').style.display='block';
}


function SelectMap() {
  var str = "";
  str += '<div class="checkbox-group" style="margin-top:5px;"><div class="radio-buttons">';
  for (var i = 0, length = arrMap.length; i < length; i++) {
    if(arrMap[i][0]==Select4) {
      str += '<label class="custom-radio" style="margin-bottom:0;"><input type="radio" id="d'+ i +'" name="SelectPlace" value="'+ arrMap[i] +'" checked>';
      str += '<span class="radio-btn"><i class="las la-check"></i><div class="hobbies-icon">';
      str += '<div><img src="./map/map-'+ i +'.jpg" style="margin-bottom:0px;"></div></div></span></label>';
    } else {
      str += '<label class="custom-radio" onclick="SelectItem4('+i+')" style="margin-bottom:0;"><input type="radio" id="d'+ i +'" name="SelectPlace" value="'+ arrMap[i] +'">';
      str += '<span class="radio-btn"><i class="las la-check"></i><div class="hobbies-icon">';
      str += '<div><img src="./map/map-'+ i +'.jpg" style="margin-bottom:0px;"></div></div></span></label>';
    }
  } 
  str += '</div>';
  $("#DisplaySelect4").html(str);
  document.getElementById('id04').style.display='block';
}


function SelectItem1(x) {
  Select1 = x;
  document.getElementById('id01').style.display='none';
  StartGame();
  CheckSelect();
}


function SelectItem2(x) {
  Select2 = x;
  MemotoFriend = document.getElementById("txttextmemo").value;
  if(MemotoFriend != arrTextMemo[x][2]) {
    MemotoFriend = arrTextMemo[x][2];
  }
  $("#txttextmemo").html(MemotoFriend);
  console.log("MemotoFriend="+MemotoFriend);
  StartGame();
  CheckSelect();
}


function SelectItem3(x) {
  Select3 = x;
  FriendName = document.getElementById("txtfriendname").value;
  if(FriendName=="") {
    alert("ใส่ชื่อเพื่อนของคุณก่อนนะ");
    console.log("ใส่ชื่อเพื่อนของคุณก่อนนะ");
  } else {
    document.getElementById('id03').style.display='none';
    StartGame();
    CheckSelect();
  }
}


function SelectMeOnly() {
  Select3 = 88;
  FriendName = "เพื่อนพนักงานทุกท่าน";
  //console.log("ME Only");
  document.getElementById('id03').style.display='none';
  StartGame();
  CheckSelect();
}


function SelectItem4(x) {
  Select4 = x;
  MapLoyKrathong = arrMap[x][1];
  document.getElementById('id04').style.display='none';
  StartGame();
  CheckSelect();
}


function CheckFriendName() {
  FriendName = document.getElementById("txtfriendname").value;
  console.log(FriendName);
  if(Select3!=99 && FriendName!="") {
    document.getElementById('id03').style.display='none';
    StartGame();
    CheckSelect();
  } else {
    console.log("ใส่ข้อมูลยังไม่ครบถ้วน");
  }
}


function BeforeSend() {
  var str = "";
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbNewYearCard.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Moon2023"),
    EmpName : sessionStorage.getItem("EmpName_Moon2023"),
    LoySelect1 : Select1,
    LoySelect2 : Select2,
    LoyMemotoFriend : MemotoFriend,
    LoySelect3 : Select3,
    LoyFriendName : FriendName,
    LoyMapLoyKrathong : MapLoyKrathong,
    DateRegister : dateString,
    LoyViewPage : 0,
    TimeStampDate : TimeStampDate
  });
  str += '<div class="img-bottom" style="position:relative;"><img src="./map/'+ MapLoyKrathong +'" style="width:100%; height:80vh; border-radius:15px; margin-top:-15px;">';
  str += '<div class="img-sendcard"><img src="./img/bg-header.png" style="width:230px; opacity:1;"></div>';
  if(Select2!=99) {
    str += '<div class="img-showtext" style="padding-top:18px;">';
    str += '<div class="img-year"><img src="./img/bg-newyear2024.png" style="width:120px;"></div>';
    if(Select3==88) {
      str += '<div style="position: relative; margin-top:-85px;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="img-over-person4"></div>';
      str += '<div style="margin:110px auto 10px auto; font-weight: 600; color:#ffff00; font-size: 14px;">ขอส่งความสุข ... แด่<br>" '+ FriendName +' "</div>';
    } else if(Select3!=99) {
      str += '<div style="position:relative; margin-top:-85px;"><img src="./img/person-'+ Select3  +'.png" class="img-over-person4"><div style="position: absolute;right:45%; top:50px;"><img src="'+ sessionStorage.getItem("LinePicture") +'" class="img-over-person1"></div></div>';
      str += '<div style="margin:110px auto 10px auto; font-weight: 600; color:#ffff00; font-size: 14px;">ขอส่งความสุข ... แด่<br>" '+ FriendName +' "</div>';
    } 
    str += '<div style="margin:10px auto;">'+ MemotoFriend +'</div>';
    str += '<div style="margin:15px auto 5px auto; font-weight: 600; color:#ffff00;">" '+ sessionStorage.getItem("EmpName_Moon2023") +' "</div>';
    str += '<div style="text-align:center; color:#ccc; font-size:11px; margin-top:-5px;">'+ ShortDate +'</div></div>';
  }
  str += '</div>';
  str += '<center>';
  //str += '<div class="btn-t2" onClick="CaptureImg()" style="margin:20px auto; margin-right:6px;">บันทึกรูปภาพ</div>';
  str += '<div class="btn-t2" onClick="CloseAll()" style="margin:20px auto; margin-right:6px;">ส่งการ์ดอีกครั้ง</div>';
  str += '<div class="btn-t2" onClick="gotoOnline()" style="margin:20px auto;">ดูคำอวยพรของเพื่อนๆ</div>';
  str += '</center>';
  $("#BeforeSend").html(str);
  document.getElementById('id05').style.display='block';
}


function CaptureImg() {
  document.getElementById('id05').style.display='none';
  location.href = "online.html";
  //StartGame();
}



function ChangeMap() {
  console.log("Change Map");
  document.getElementById('DisplaySelect').style.display='block';
  document.getElementById('GoKathong').style.display='none';
}


function CheckNewMemo() {
  MemotoFriend = document.getElementById("txttextmemo").value;
  console.log(MemotoFriend);
  $("#txttextmemo").html(MemotoFriend);
  StartGame();
}


function play() {
  var audio = new Audio('./mp3/we-wish-you-a-merry-christmas.mp3');
  audio.play();
}

function playSound(animal) {
  document.getElementById(animal).play();
};


function gotoOnline() {
  location.href = "home.html#JumpLocation";
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


function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='none';
  document.getElementById('id04').style.display='none';
  document.getElementById('id05').style.display='none';
}
