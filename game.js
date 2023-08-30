// Iteration 1: Declare variables required for this game
const gameBody = document.getElementById("game-body")
let time = 60

// Iteration 1.2: Add shotgun sound
let shotgunSound = new Audio("./assets/shotgun.wav")
gameBody.onclick = () => {
    shotgunSound.currentTime = 0
    shotgunSound.play()
}

// Iteration 1.3: Add background sound

let backgroundMusic = new Audio("./assets/bgm.mp3")
backgroundMusic.play()
backgroundMusic.loop = true

// Iteration 1.4: Add lives
let lives = 4
let zombie;

// Iteration 2: Write a function to make a zombie

let zombieID = 0
let lastZombieNum = 0;
function generateZombies() {
    let num = generateUniqueNums(1,7)
    gameBody.innerHTML += `<img class=zombie-image id=zombie${zombieID} src=./assets/zombie-${num}.png >`
    // console.log(generateUniqueNums(1,7))
    zombie = document.getElementById(`zombie${zombieID}`)
    let second = generateUniqueNums(2,6)
    zombie.style.animationDuration = `${second}s`
    let viewWidth = generateUniqueNums(20,80)
    zombie.style.transform = `translateX(${viewWidth}vw)`
    zombie.onclick = () => {
        destroyZombie(zombie);
    }
    zombieEscaped(zombie)
}


// Iteration 3: Write a function to check if the player missed a zombie
function zombieEscaped(zombie){
    if (zombie.getBoundingClientRect().top<=0){
        lives--
        const maxLivesElement = document.getElementById("max-lives");
        maxLivesElement.style.width = lives*25+"%";
        destroyZombie(zombie)
        if(lives == 0) {
            location.href="game-over.html"
        }
    }
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destroyZombie(ghost) {
    ghost.style.display = "none";
    zombieID++;
    generateZombies()
}

// Iteration 5: Creating timer

setInterval(timer,1000)
function timer() {
    if(time<0){
        location.href = "win.html"
    } else {
        time--
        document.getElementById("timer").innerText = time;
    }
}

// Iteration 6: Write a code to start the game by calling the first zombie

generateZombies()

// Iteration 7: Write the helper function to get random integer

function generateUniqueNums(min,max) {
    return Math.floor(Math.random()*(max-min))+min
}

setInterval(check,100)
function check() {
    zombieEscaped(zombie);
}


