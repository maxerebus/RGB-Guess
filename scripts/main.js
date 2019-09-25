var game = {
    numberOfSquares: 6,
    colors: [],
    pickedColor: undefined,
    squares: document.querySelectorAll(".square"),
    pickedColorDispaly: document.getElementById("pickedColor"),
    messageDisplay: document.getElementById("message"),
    h1: document.querySelector("h1"),
    resetButton: document.getElementById("reset"),
    modeButtons: document.querySelectorAll(".mode")
};

game.init = function() {
    this.setupModeButtons();
    this.setupSquares();
    this.reset();
};

game.reset = function() {
    this.colors = this.generateRandomColors(this.numberOfSquares);
    this.pickedColor = this.pickRandomColor();
    this.pickedColorDispaly.textContent = this.pickedColor;
    this.squares.forEach(function(square, i) {
        if (game.colors[i]) {
            square.style.display = "block";
            square.style.backgroundColor = game.colors[i];
        } else {
            square.style.display = "none";
        }
    });
    this.h1.style.backgroundColor = "steelblue";
    this.messageDisplay.textContent = "";
    this.resetButton.textContent = "New Colors";
};

game.changeColors = function(color) {
    this.squares.forEach(function(square) {
        square.style.backgroundColor = color;
    });
};

game.pickRandomColor = function() {
    var random = Math.floor(Math.random() * this.colors.length);
    return this.colors[random];
};

game.generateRandomColors = function(number) {
    var arr = [];
    for (var i = 0; i < number; i++) {
        arr.push(this.randomColor());
    }
    return arr;
};

game.randomColor = function() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    var rgb = "rgb(" + red + ", " + green + ", " + blue + ")";
    return rgb;
};

game.setupModeButtons = function() {
    this.modeButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            game.modeButtons[0].classList.remove("selected");
            game.modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            game.numberOfSquares = this.textContent === "Easy" ? 3 : 6;
            game.reset();
        });
    });
};

game.setupSquares = function() {
    this.squares.forEach(function(square, index) {
        square.addEventListener("click", function() {
            var clickedColor = this.style.backgroundColor;
            if (clickedColor === game.pickedColor) {
                game.messageDisplay.textContent = "Correct!";
                game.changeColors(clickedColor);
                game.h1.style.backgroundColor = clickedColor;
                game.resetButton.textContent = "Play Again?";
            } else {
                this.style.backgroundColor = "#232323";
                game.messageDisplay.textContent = "Try again";
            }
        });
    });
};

game.resetButton.addEventListener("click", function() {
    game.reset();
});

game.init();
