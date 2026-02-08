// step-1 ->> html:

const colorDisplay = document.querySelector('#colorDisplay');
const messageDisplay = document.querySelector('#message');
const currentStreakDisplay = document.querySelector('#currentStreak');
const bestStreakDisplay = document.querySelector('#bestStreak');

const colorBoxes = document.querySelectorAll('.color-box');
console.log(colorBoxes); // each box is placed 

const newRoundBtn = document.querySelector('#newRoundBtn');

const easyBtn = document.querySelector('#easyBtn');
const hardBtn = document.querySelector('#hardBtn');
const resetStreakBtn = document.querySelector('#resetStreakBtn');
const btnTrack = document.querySelector('.color-box-container');

// variables...


//tracks 
var currentStreak = 0; //user --> track
var bestStreak = 0; // previously data fetch --> store
var pickCorrectColor = 0; //random color
var num = 6; 

var colors = []; // empty arr -> 6 color store index 


function webLoad(){
    onLoad();
    
    setGame();
    displayContent();
}
// whenever the website will load then first it will load the entire data...
function onLoad(){
    var temp = localStorage.getItem('highBestStreak');
    if(temp != null){
        bestStreak = parseInt(temp); // --> here the localstorage contains the data so it will return the data not null.
    }
    else{
        bestStreak = 0; // --> if there is no data in localstorage so it will return null instead of number.
    }
}

// here we will define the display content message in a function format...

function displayContent(){
    currentStreakDisplay.textContent = currentStreak;
    bestStreakDisplay.textContent = bestStreak;
}


// random color generator
function colorGenerate(){
    var a = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    var c = Math.floor(Math.random()*256);
    return `rgb(${a}, ${b}, ${c})`;
}

function generateColor(num){
    const arr = [];
    for(var i=0; i<num; i++){
        arr.push(colorGenerate());
    }
    return arr;
}
function pickGenerator(){
    const math = Math.floor(Math.random()*colors.length);
    return colors[math];
}


function resetStreak(){
    currentStreak = 0;
    displayContent();
    messageDisplay.textContent = "Current streak reset!";
}


function setGame(){
    colors = generateColor(num); //color -> empty
    pickCorrectColor = pickGenerator();
    console.log(colors);
    console.log(pickCorrectColor);
    colorDisplay.textContent = pickCorrectColor;
    for(var i=0; i<colors.length; i++){
        colorBoxes[i].style.backgroundColor = colors[i];
    }
}



// Difficulty mode buttons

easyBtn.addEventListener("click", function () {
    num = 3; // show 3 boxes
    easyBtn.classList.add("selected");
    hardBtn.classList.remove("selected");
    currentStreak = 0; 
    displayContent();
    setGame();

    for (let i = 0; i < colorBoxes.length; i++) {
        if (i < num) {
            colorBoxes[i].style.display = "block";
        } else {
            colorBoxes[i].style.display = "none";
        }
    }
});


hardBtn.addEventListener("click", function () {
    num = 6; // show 6 boxes
    hardBtn.classList.add("selected");
    easyBtn.classList.remove("selected");
    currentStreak = 0;
    displayContent();
    setGame();

    for (let i = 0; i < colorBoxes.length; i++) {
        colorBoxes[i].style.display = "block";
    }
});

webLoad();

//parent addeventlistener
function trackBtn(event){
    var element = event.target;
    var rgb = element.style.backgroundColor;

    if(pickCorrectColor == rgb){
        console.log("you win");
        messageDisplay.textContent = "Correct! 🎉";

        // ✅ Change all boxes to winning color
        for (var i = 0; i < colorBoxes.length; i++) {
            colorBoxes[i].style.backgroundColor = pickCorrectColor;
        }

        // ✅ Update streak
        currentStreak++;
        if(currentStreak > bestStreak){
            bestStreak = currentStreak;
            localStorage.setItem('highBestStreak', bestStreak);
        }
        displayContent();
    } 
    else {
        // Wrong box fades away
        element.style.backgroundColor = "transparent";
        messageDisplay.textContent = "Try Again!";
        currentStreak = 0;
        displayContent();
    }
}



resetStreakBtn.addEventListener("click", function () {
    currentStreak = 0;
    bestStreak = 0;

    localStorage.removeItem('highBestStreak');

    displayContent();
    messageDisplay.textContent = "Streak reset! 🔄";
});

newRoundBtn.addEventListener("click", function () {
    setGame();
    messageDisplay.textContent = "";
});



btnTrack.addEventListener('click',trackBtn); //do not need to call every color --> function called works for all the color