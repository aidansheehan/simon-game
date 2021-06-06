// Variables
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// When A Key is Pressed, Do Something
$(document).keydown(function() {
  while (started === false) {
    nextSequence();
    started = true;
    $("#level-title").text("Level 0");
  }
})

// Listen for Button Click, Store, Play Audio and Animate
$(".btn").click( function() {

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Take User Answer and Check Against Game Pattern, if Correct give Next Sequence
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function(){
        nextSequence();
      },1000)
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }
    ,200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


// Function for Next Game Sequence
function nextSequence() {
  userClickedPattern = [];
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(4 * Math.random());
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
}

// Function for Playing Sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to Animate Button When Pressed
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout( function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}
