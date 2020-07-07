var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

$(document).keypress(function(){
	nextSequence();
	});

function checkAnswer(currentLevel){
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		console.log("success");
	
		if (gamePattern.length === userClickedPattern.length){
			setTimeout(function(){
				nextSequence();
			},1000);
		}
	}
	else {
		console.log("wrong");
		playSound("wrong");
		$("h1").text("Game Over, Press Any Key to Restart");
		$("body").addClass("game-over");
		setTimeout(function() {
			$("body").removeClass("game-over");
		},200);
		startOver();
	} 
}

function startOver(){
	level = 0;
	gamePattern = [];
}

function nextSequence(){
	level += 1;
	$("h1").text("Level " + level);
	userClickedPattern = [];

	var randomNumber = Math.floor(Math.random()*4);

	var randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);

	$("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomChosenColor);
}

$(".btn").click(function(){
	var userChosenColor = $(this).attr("id");
	userClickedPattern.push(userChosenColor);
	playSound(userChosenColor);
	animatePress(userChosenColor);
	checkAnswer(userClickedPattern.length - 1);
});

function playSound(name){
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColor) {
	$("#"+currentColor).addClass("pressed");
	setTimeout(function(){
		$("#"+currentColor).removeClass("pressed");
	},100);
}