var colors = [];
var numSquares = 6;
var easyNumSquares = 3;
var medNumSquares = 6;
var hardNumSquares = 9;
var squares = document.querySelectorAll(".square");
var pickedColor;
var colorDisplay = document.getElementById("colorDisplay");
var feedbackArea = document.getElementById("feedbackArea");
var newColorsButton = document.getElementById("newColorsButton");
var easyButton = document.getElementById("easyButton");
var mediumButton = document.getElementById("mediumButton");
var hardButton = document.getElementById("hardButton");
var header = document.getElementById("header");
var selectedColor;
var isGameWon = false;
var winningSquareIndex;

resetToMedium();
newColorsButton.addEventListener("click", resetGame);
easyButton.addEventListener("click", resetToEasy);
mediumButton.addEventListener("click", resetToMedium);
hardButton.addEventListener("click", resetToHard);

function resetToEasy(){
	easyButton.classList.add("selectedButton");
	mediumButton.classList.remove("selectedButton");
	hardButton.classList.remove("selectedButton");
	numSquares = easyNumSquares;
	setAllSquaresToNotDisplay();
	resetGame();
}

function resetToMedium(){
	easyButton.classList.remove("selectedButton");
	mediumButton.classList.add("selectedButton");
	hardButton.classList.remove("selectedButton");
	numSquares = medNumSquares;
	setAllSquaresToNotDisplay();
	resetGame();
}

function resetToHard(){
	easyButton.classList.remove("selectedButton");
	mediumButton.classList.remove("selectedButton");
	hardButton.classList.add("selectedButton");
	numSquares = hardNumSquares;
	setAllSquaresToNotDisplay();
	resetGame();
}

function getRandomRGBColor(){
	var colors = [];
	var colorsString = "";
	for(var i = 0; i < 3; i++){
		colors.push(Math.floor(Math.random() * 256))
	}
	colorsString += "rgb(" + colors[0] + ", " + colors[1] + ", " + colors[2] + ")";
	return colorsString;
}

function getRandomWinningSquare(){
	var winningSquareIndex;
	winningSquareIndex = Math.floor(Math.random() * numSquares)
	return winningSquareIndex;
}

function getPickedColorFromIndex(index){
	return colors[index];
}

function changeAllSquaresToWinningColor(){
	for(var i = 0; i < numSquares; i++){
		squares[i].style.backgroundColor = pickedColor;
	}
}

function setAllSquaresToNotDisplay(){
	for(var i = 0; i < squares.length; i++){
		squares[i].style.display = "none"
	}
}

function resetGame(){
	for(var i = 0; i < numSquares; i++){
		// Get a random color
		var randomColor = getRandomRGBColor();
		// Add color to colors array
		colors[i] = randomColor;
		// Add initial colors to squares
		squares[i].style.backgroundColor = colors[i];
		squares[i].style.display = "block";
		// Add click listeners to squares
		squares[i].addEventListener("click", function(){
			// Grab color of clicked square
			selectedColor = this.style.backgroundColor;
			//Compare color to pickedColor
			if(selectedColor === pickedColor){
				isGameWon = true;
				feedbackArea.textContent = "Correct!";
				newColorsButton.textContent = "Play Again?";
				changeAllSquaresToWinningColor();
				header.style.backgroundColor = pickedColor;
			}else{
				this.style.backgroundColor = "#232323"
				feedbackArea.textContent = "Try again!";
			}
		});
	}
	winningSquareIndex = getRandomWinningSquare();
	pickedColor = getPickedColorFromIndex(winningSquareIndex);
	colorDisplay.textContent = pickedColor;
	header.style.backgroundColor = "steelblue";
	newColorsButton.textContent = "New Colors";
	feedbackArea.textContent = "";
}