var mainLoopID;
var audioCache = {};
var $maraca = $('#maraca');
var colors = ['#ff6000' , '#a951ec' , '#c9fe3e' , '#200274' , '#6dedf7'];
var t1 = new Date().getTime();

ion.sound({
  sounds: [{name: "shake"}],
  volume: 0.5,
  path: "assets/",
  preload: true
});

setInterval(function () {
  if(mainLoopID === 0){
    activateMainLoop();
  }
}, 700);

function play(fileName){
  if(audioCache[fileName] === undefined){
    audioCache[fileName] = new Audio('/assets/' + fileName + '.mp3');
  }
  audioCache[fileName].play();
}

function activateMainLoop(){
  $('#splash').hide();
  $maraca.removeClass("shake-stop");
  $maraca.addClass("shake-slow");
  mainLoopID = setInterval(function () {
    var color = colors[Math.floor(Math.random() * colors.length)];
    window.document.body.style.backgroundColor = color;
    ion.sound.play("shake");
  }, 200);
}

function ping() {
  var t2 = new Date().getTime();
  var value = t2 - t1;
  $maraca.removeClass("shake-slow");
  $maraca.addClass("shake-stop");
  window.clearTimeout(mainLoopID);
  mainLoopID = 0;
  t1 = t2;
};

if (typeof window.DeviceMotionEvent != 'undefined') {
  var sensitivity = 30;
  var x1 = 0, y1 = 0, z1 = 0, x2 = 0, y2 = 0, z2 = 0;

  window.addEventListener('devicemotion', function (e) {
    x1 = e.accelerationIncludingGravity.x;
    y1 = e.accelerationIncludingGravity.y;
    z1 = e.accelerationIncludingGravity.z;
  }, false);

  setInterval(function () {
    var change = Math.abs(x1-x2+y1-y2+z1-z2);

    if (change > sensitivity) {
      ping();
    }

    x2 = x1;
    y2 = y1;
    z2 = z1;
  }, 40);
};

if ("ontouchstart" in window) {
  $('#desktop-browser').css('display', 'none'); 
}

if (("standalone" in window.navigator) && window.navigator.standalone){
  $('#desktop-browser').css('display', 'none'); 
  $('#mobile-browser').css('display', 'none'); 
}
