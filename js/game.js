var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var cleararray = "";
var randomDegree = 0;
var xGroupGift = 0;
var Eid = "";


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_Moon2023")==null) { location.href = "index.html"; }
  Connect_DB();
  dbGiftRewards = firebase.firestore().collection("GiftNewYear2567");
  //document.getElementById('id01').style.display='block';
  CheckData();
});


function CheckData() {
  var str = "";
  gcheck = 0;
  dbGiftRewards.where('EmpID','==',sessionStorage.getItem("EmpID_Moon2023"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      gcheck = 1;
      console.log("Found : "+gcheck+" --- "+ doc.data().giftcode+" --- "+ doc.data().giftname );
      document.getElementById('loading').style.display='none';
      document.getElementById('ShowWheel1').style.display='block';
      str += '<center>';
      if(doc.data().giftcode=="gift-99") {
        str += '<div style="margin:30px auto 10px auto;"><img src="./img/'+ doc.data().giftcode +'.png" style="width:220px;"/></div>';
        str += '<div class="boxtext"><b>เสียใจด้วยน้า</b><br>คุณยังไม่ได้รับรางวัล<br>แล้วมาร่วมกิจกรรมกันใหม่น้า ...<div style="font-size:11px;">Date : '+ doc.data().DateRegister +'</div></div>';
      } else {
        str += '<div style="margin:30px auto 10px auto;"><img src="./img/'+ doc.data().giftcode +'.png"" style="width:200px;"/></div>';
        str += '<div class="boxtext"><b>ยินดีด้วยคุณได้รับรางวัล</b><br><b>'+ doc.data().giftname +'</b><br>เราจะทำการจัดส่งของรางวัลไปให้<br>หลังจบกิจกรรมนี้<div style="font-size:11px;">Date : '+ doc.data().DateRegister +'</div></div>';
      }
      str += '</center>';
      $("#DisplayGift").html(str);
    });
    if(gcheck==0) {
      //console.log(gcheck);
      document.getElementById('loading').style.display='none';
      document.getElementById('id01').style.display='block';
      document.getElementById('StartGame').style.display='block';
    }
  });
}



const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: 2 },
  { minDegree: 31, maxDegree: 90, value: 1 },
  { minDegree: 91, maxDegree: 150, value: 6 },
  { minDegree: 151, maxDegree: 210, value: 5 },
  { minDegree: 211, maxDegree: 270, value: 4 },
  { minDegree: 271, maxDegree: 330, value: 3 },
];
const data = [16, 16, 16, 16, 16, 16];
var pieColors = [
  "#3cb219",
  "#e30000",
  "#3cb219",
  "#e30000",
  "#3cb219",
  "#e30000",
];
let myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: [1, 2, 3, 4, 5, 6],
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
const valueGenerator = (angleValue) => {
  //var str = "";
  //var str0 = "";
  for (let i of rotationValues) {
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      //finalValue.innerHTML = `<p style="text-align: center;">หมายเลขที่สุ่มได้ : ${i.value}</p>`;
      var varTimerInMiliseconds = 2000;
      setTimeout(function(){ 
        //sessionStorage.removeItem("RandomWheel");
        document.getElementById('ShowWheel').style.display='none';
        document.getElementById('final-value').style.display='none';
        document.getElementById('ShowWheel1').style.display='block';

        //RandomRewards();
        SaveReward();
/*
        if(parseFloat(xGroupGift)!=5) {
          console.log("GroupGift="+xGroupGift);
          str += '<div class="clr"></div><div class="btn-t2" onclick="GotoRewards()" style="margin-top:20px; position:relate;">รางวัลของคุณ</div>';
          str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:20px; position:relate;">ปิดหน้าต่าง</div>';
          $("#DisplayGift").html(str);
          $("#DisplayGiftRewards").html(str0);
          document.getElementById('id01').style.display='block';
        }
*/
      }, varTimerInMiliseconds);
      spinBtn.disabled = false;
      break;
    }
    //console.log("End");
    //document.getElementById('id02').style.display='block';
  }
};


let count = 0;
let resultValue = 101;
spinBtn.addEventListener("click", () => {
  RandomRewards();
  spinBtn.disabled = true;
  finalValue.innerHTML = `<p style="text-align: center;font-size:14px; color:#fff;"><b>Good Luck!</b></p>`;
  //let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //console.log("random-"+randomDegree);
  //let randomDegree = 5;
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();
    if (myChart.options.rotation >= 331) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      //valueGenerator(randomDegree);
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});


var ArrRewards = [];
var NewRewards = "";
//var XCheckRewards = 0;
function RandomRewards() { 
  //ReCheckUser();
  var i = 0;
  Eidewards = "";
  dbGiftRewards.where('LineID','==','')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      //i = i+1;
      ArrRewards.push([doc.id, doc.data().giftname, doc.data().giftcode ]);
    });
    //console.log(ArrRewards);
    NewRewards = random_item(ArrRewards);
    Eid = NewRewards[0];
    ReCheckUser();
    //console.log("Random : "+NewRewards);
    //console.log("Random1 : "+NewRewards[2]);
    //GetCodeRandom(NewRewards[0], NewRewards[1], NewRewards[2]);
    //if(NewRewards[2]!="gift-99") {
    //  XCheckRewards = 1;
    //}
    //UpdateRewards();
  });  
  //var NewRewards = 1;
  //GetCodeGift(NewRewards);
}



function ReCheckUser() { 
  dbGiftRewards.where('EmpID','==',sessionStorage.getItem("EmpID_Moon2023"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      document.getElementById('id04').style.display='block';
      //OpenReload();
      //alert("คุณได้ทำการสุ่มเลือกไปแล้ว\nไม่สามารถสุ่มได้อีก");
      //location.href = "game.html";
    });
    GetCodeRandom(NewRewards[0], NewRewards[1], NewRewards[2]);
  });  
}


function SaveReward() {
  var str = "";
  var str0 = "";

  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbGiftRewards.doc(Eid).update({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    LinePicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_Moon2023"),
    EmpName : sessionStorage.getItem("EmpName_Moon2023"),
    Phone : sessionStorage.getItem("EmpPhone"),
    address : sessionStorage.getItem("EmpAddress"),
    ResultQuiz : NewRewards[2],
    StatusSend : 1,
    DateRegister : dateString,
    TimeStamp : TimeStampDate
  });
  //var myTimeout = setTimeout(ShowRewards, 2000);

  document.getElementById('id02').style.display='block';
  if(parseFloat(xGroupGift)==6) {
    //str += '<div class="btn-1" style="margin-top:25px; margin-bottom: 15px;">Merry Christmas &<br>Happy New Year 2024</div>';
    str += '<div style="margin:30px auto 0px auto;"><img src="./img/gift-99.png" style="width:260px;"/></div>';
    str += '<center><div class="boxtext"><b>คุณไม่ได้รับรางวัล</b><br><font color="#000000">แล้วมาร่วมกิจกรรมกันใหม่น้า</font></div></center>';        
    //str += '<div class="btn-t3" style="margin-top:15px; background-color: #fff;">คุณไม่ได้รับรางวัล</div>';
    //str += '<div><img src="./img/'+ NewRewards[2] +'.gif" style="position: relative; width:80%; margin-top:12px;"></div>';
    //str += '<div class="font13" style="margin-top:15px; text-align:center;">เสียใจด้วยน้า ... <br>วันนี้คุณยังไม่ได้รับรางวัลจากเรา<br>ไปหาเหรียญมาเล่นใหม่น้า</div>';
    //str0 += '<div class="font13" style="margin-top:15px;text-align: center;">เสียใจด้วยน้า ...<br><b>วันนี้คุณยังไม่ได้รับรางวัล</b><br>ไปหาเหรียญรางวัลแล้วกลับมาเล่นใหม่น้า</div>';
    str0 += '<div class="btn-1" style="margin-top:25px; margin-bottom: 15px;">ผลการหมุนรางวัล</div>';
    str0 += '<div style="margin:20px auto 0px auto;"><img src="./img/gift-99.png" style="width:260px;"/></div>';
    str0 += '<center><div class="boxtext"><b>คุณไม่ได้รับรางวัล</b><br>แล้วมาร่วมกิจกรรมกันใหม่น้า</div></center>';
  } else {
    //str += '<div class="btn-t3" style="margin-top:15px; background-color:#fff;">คุณได้รับรางวัล</div>';
    str += '<div style="margin:25px auto 12px auto;"><center><img src="./img/'+ NewRewards[2] +'.png" style="position: relative; width:220px;right: 0%;"></center></div>';
    //str += '<div class="font13" style="text-align:center; color:#f68b1f; font-weight: 600;">รางวัล : '+ NewRewards[1] +'</div>';
    //str += '<div class="font13" style="margin-top:15px; text-align:center;">คุณสามารถตรวจสอบได้ที่เมนู รางวัลของคุณ</div>';
    str += '<center><div class="boxtext">ยินดีด้วย ... คุณได้รับรางวัล<br><b>'+ NewRewards[1] +'</b><br>เราจะทำการจัดส่งของรางวัลไปให้<br>หลังจบกิจกรรมนี้</div></center>';


    str0 += '<div class="btn-1" style="margin-top:25px; margin-bottom: 15px;">ผลการหมุนรางวัล</div>';
    str0 += '<div style="margin:20px auto -10px auto;"><img src="./img/gift-99.gif" style="width:260px;"/></div>';
    str0 += '<center><div class="boxtext"><b>ยินดีด้วย ... คุณได้รับรางวัล</b><br>กดปิดหน้าต่างเพื่อดูรางวัลของคุณ</div></center>';

    //str0 += '<div style="margin:20px auto 0px auto;"><img src="./img/gift-99.gif" style="width:260px;"/></div>';
    //str0 += '<div class="font13" style="margin-top:15px;text-align: center;">ยินดีด้วย ... คุณได้รับรางวัล<br>กดปิดหน้าต่างเพื่อดูรางวัลของคุณ</div>';
  }
  $("#DisplayGift").html(str);
  $("#DisplayGiftRewards").html(str0);
}


function GetCodeRandom(id,x,y) {
  console.log("Random name gift = "+ y +" ("+ x +") -->"+ id);
  //NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  randomDegree = 0;
  switch(y) {
    case "gift-01":
      randomDegree = 85;
      xGroupGift = 1;
      xResultQuiz = "";
      break;
    case "gift-02":
      randomDegree = 17;
      xGroupGift = 2;
      break;
    case "gift-03":
      randomDegree = 326;
      xGroupGift = 3;
      break;
    case "gift-04":
      randomDegree = 265;
      xGroupGift = 4;
      break;
    case "gift-05":
      randomDegree = 207;
      xGroupGift = 5;
      break;
    case "gift-99":
      randomDegree = 139;
      xGroupGift = 6;
      break;
    default:
    randomDegree = 17;
    xGroupGift = 2;
  }
  if(parseFloat(randomDegree)==0) {
    location.href = "game.html";
  }
  console.log("randomDegree = "+randomDegree);
  //SaveData();

/*
  if(randomDegree!=0) {
    var CheckStock = parseFloat(xgiftstock)-1;
    if(CheckStock!=0) {
      dbGiftRandom.doc(idCodeGift).update({
        giftredeem : parseFloat(xgiftredeem) + 1,
        giftstock : parseFloat(CheckStock)
      });
    } else {
      dbGiftRandom.doc(idCodeGift).update({
        giftstock : 0,
        giftstatus : 0
      });
    }
    if(y=='gift-05') {
      dbGiftRewards.doc(x).update({
        LineID : sessionStorage.getItem("LineID"),
        LineName : sessionStorage.getItem("LineName"),
        LinePicture : sessionStorage.getItem("LinePicture"),
        EmpID : sessionStorage.getItem("EmpID_Society"),
        EmpName : sessionStorage.getItem("EmpName_Society"),
        DateRegister : dateString,
        RefID : x,
        StatusSend : 2,
        Phone : sessionStorage.getItem("EmpPhone_Society"),
        address : sessionStorage.getItem("EmpAddress_Society"),
        TimeStampDate : TimeStampDate,
        ResultQuiz : 'Random'
      });
    } else {
      dbGiftRewards.doc(x).update({
        LineID : sessionStorage.getItem("LineID"),
        LineName : sessionStorage.getItem("LineName"),
        LinePicture : sessionStorage.getItem("LinePicture"),
        EmpID : sessionStorage.getItem("EmpID_Society"),
        EmpName : sessionStorage.getItem("EmpName_Society"),
        DateRegister : dateString,
        RefID : x,
        Phone : sessionStorage.getItem("EmpPhone_Society"),
        address : sessionStorage.getItem("EmpAddress_Society"),
        TimeStampDate : TimeStampDate,
        ResultQuiz : 'Random'
      });
    }
    ShowRewards();
  }
*/
}


function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];   
}


function Opengift() {
  document.getElementById('id03').style.display='block';
}


function Song1() {
  CloseVDO();
  var vid = document.getElementById("myaudio1");
  vid.autoplay = true;
  vid.load();
  document.getElementById('id01').style.display='none';
}


function CloseVDO() {
  var video1 = document.querySelector("#myaudio1");
  video1.pause();
  video1.currentTime = 0;
}


function OpenReload() {
  location.href = "game.html";
  //document.getElementById('id04').style.display='none';
  //CheckData();
  //location.href = "game.html";
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
}


