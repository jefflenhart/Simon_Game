// Test script alert("Hello World");
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
//var userClicks = 0
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  //  userClicks++;
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
  /***  if (userClicks == level) {
      checkAnswer(level);
    };***/
});

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
};

function checkAnswer(currentLevel) {
  /****  if (JSON.stringify(userClickedPattern)==JSON.stringify(gamePattern)) {
  setTimeout(nextSequence, 1000);
  userClickedPattern = [];
  userClicks = 0; ****/

if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

  console.log("success");

  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
} else {
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  console.log("wrong");
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  startOver();
}
};

function nextSequence() {

  level++;
userClickedPattern = [];
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  //play new color audio
  playSound(randomChosenColor);
  //  console.log(randomChosenColor

};

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
  //  console.log(audio);
};

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

$("input").keypress(function() {
  nextSequence();
})
