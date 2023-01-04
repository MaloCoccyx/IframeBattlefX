/*
################################
##                            ##
## Author: Guillaume Lequart  ##
## Project: IframeBattlefX    ##
## Created: 12/12/2022        ##
##                            ##
################################
*/

/*
#################################
## Initialize Global Variables ##
#################################
*/
//const IMG = document.querySelector("displayRobot");
//const IMGIFRAME = document.querySelector("iFrameDisplayRobot");
const ROBOTBOX = document.getElementById("robotBox");
const BUTTONON = document.getElementById("modeAutoOn");
const BUTTONOFF = document.getElementById("modeAutoOff");
const SOUNDON = document.getElementById("soundOn");
const SOUNDOFF = document.getElementById("soundOff");

var moveAndRotate = [
    document.querySelector('#turnToRight'), document.querySelector('#turnToLeft'), document.querySelector('#moveToRight'), 
    document.querySelector('#moveToForward'), document.querySelector('#moveToLeft'), document.querySelector('#moveToBackward'), 
    document.querySelector('#shooting')
];

/*
######################################
## Set Button to Enabled / Disabled ##
######################################
/* Enable / Disable buttons "modeAuto" */
function modeAutoOnOff(){

    // Treatment
    if(BUTTONOFF.className == "disabled" && BUTTONON.className == "enabled"){

        // Disable Controls
        moveAndRotate[0].disabled = true; // turnToRight
        moveAndRotate[1].disabled = true; // turnToLeft
        moveAndRotate[2].disabled = true; // moveToRight
        moveAndRotate[3].disabled = true; // moveToForward
        moveAndRotate[4].disabled = true; // moveToLeft
        moveAndRotate[5].disabled = true; // moveToBackward
        moveAndRotate[6].disabled = true; // button to shoot
        modeAuto = true;                 // set modeAuto to True
        BUTTONOFF.className = "enabled"; // enable button modeAutoOff
        BUTTONON.className = "disabled"; // disable button modeAutoOn

        return;
    }else if(BUTTONOFF.className == "enabled" && BUTTONON.className == "disabled"){

        // Enable Controls
        moveAndRotate[0].disabled = false;
        moveAndRotate[1].disabled = false;
        moveAndRotate[2].disabled = false;
        moveAndRotate[3].disabled = false;
        moveAndRotate[4].disabled = false;
        moveAndRotate[5].disabled = false;
        moveAndRotate[6].disabled = false;
        modeAuto = false;                 // set modeAuto to False
        BUTTONOFF.className = "disabled"; // disable button modeAutoOff
        BUTTONON.className = "enabled"; // enable button modeAutoOn

        return;
    }
}

/* Enable / Disable buttons "sound" */
function soundOnOff(){

    // Treatment
    if(SOUNDOFF.className == "disabled" && SOUNDON.className == "enabled"){
        SOUNDOFF.className = "enabled";
        SOUNDON.className = "disabled";
        return;
    }else if(SOUNDOFF.className == "enabled" && SOUNDON.className == "disabled"){
        SOUNDOFF.className = "disabled";
        SOUNDON.className = "enabled";
        return;
    }
}

/*

function displayRobotState(){
    // Treatment
    if(ROBOTBOX.className != "flex " + robotState){
        ROBOTBOX.className = "flex " + robotState;
        setTimeout(() => {
            // If paremeter != "isDead", robot still alive
            if(robotState != 'isDead'){
                ROBOTBOX.className = "flex isAlive";
                robotState = "isAlive";
            }else{
                ROBOTBOX.className = "flex isDead";
                robotState = "isDead";
            }
            }, 1000
        );
        return;
    }
}

/*
###################
## Robot MoveToX ##
###################

/* Robot MoveToX (Forward, Left, Right, Backward)*/
function isMoveTo(Parameter){

    // Treatment
    ROBOTBOX.classList.remove("isMoveToForward");
    ROBOTBOX.classList.remove("isMoveToLeft");
    ROBOTBOX.classList.remove("isMoveToRight");
    ROBOTBOX.classList.remove("isMoveToBackward");
    setTimeout(() => {
            ROBOTBOX.classList.add("isMoveTo" + Parameter);
            if(Parameter == "forward"){
                marioBot = move
            }else if(Parameter == "forward"){
                
            }else if(Parameter == "forward"){
                
            }else if(Parameter == "forward"){
                
            }
        }, 1
    );
    return;
}


/*
########################
## Change Robot State ##
########################
*/
function stateChanged(Parameter){
    robotState = Parameter;
    if(life <= 0){
        robotState = "isDead";
        displayRobotState(robotState);
        robotDead = true;
    }else if(fire = true){
        displayRobotState(robotState);
    }else if(isTakeDamage == true){
        robotState = "isTakeDamage";
        displayRobotState(robotState);
    }
}

/**
 * 
 * @param {Event} event 
 */
function onLoaded(event){
    console.log(event);

    let agent = new Agent(
        "guillaume_lequart", // id
        "demo", // username
        "demo", // password
        "iframebattlefx", // arena 
        "8080", // port
        "mqtt.jusdeliens.com", // server
        4, // verbose
        false // true
    );
    agent.connect();
    agent.addEventListener("connected", onConnected);
    agent.addEventListener("updated", onUpdated);
    agent.addEventListener("dirChanged", onDirChanged)
}

/**
 * 
 * @param {AgentEvent} event 
 */
function onConnected(event){
    let agent = event.src;
    console.log("Agent connected " + agent.id);
    document.getElementById("idRobot").textContent = agent.id; // Get Robot Name

    /**
     * @var {number}  percentAmmo Calculate the percentage of ammo
     * @var {string}  ammoBg Change the background gradient uses percentAmmo as value for percentage
     * @var {Array}   ammo Get all elements of ammo bar (responsive elements) and put it into array to easily modify them
     */
    let percentAmmo = (((agent.ammo) / 100) * 100);
    let ammoBg = "linear-gradient(to right, var(--ammo) " + percentAmmo +"%,transparent " + percentAmmo +"%)";

    let ammo = [
        document.getElementById("ammo"),
        document.getElementById("ammoShort"),
        document.getElementById("ammoExtraShort"),
        document.getElementById("ammoIframe")
    ];

    ammo[0].textContent = "Munitnions : " + (((agent.ammo) / 100) * 100) + " / " + "100";
    ammo[0].style.background = ammoBg;
    ammo[1].textContent = "Mun: " + (((agent.ammo) / 100) * 100) + "/" + "100";
    ammo[1].style.background = ammoBg;
    ammo[2].textContent = "M: " + (((agent.ammo) / 100) * 100) + "/" + "100";
    ammo[2].style.background = ammoBg;
    ammo[3].textContent = (((agent.ammo) / 100) * 100) + "/" + "100";
    ammo[3].style.background = ammoBg;

    /**
     * @var {number}  percentlife Calculate the percentage of life
     * @var {string}  lifeBg Change the background gradient uses percentAmmo as value for percentage
     * @var {Array}   life Get all elements of ammo bar (responsive elements) and put it into array to easily modify them
     */
    let percentlife = (((agent.life) / 100) * 100);
    let lifeBg = "linear-gradient(to right, var(--is-dead) " + percentlife +"%,transparent " + percentlife +"%)";

    let life = [
        document.getElementById("life"),
        document.getElementById("lifeShort"),
        document.getElementById("lifeIframe")
    ];

    life[0].textContent = "Vie : " + (((agent.life) / 100) * 100) + " / " + "100";
    life[0].style.background = lifeBg;
    life[1].textContent = "V: " + (((agent.life) / 100) * 100) + " / " + "100";
    life[1].style.background = lifeBg;
    life[2].textContent = (((agent.life) / 100) * 100) + " / " + "100";
    life[2].style.background = lifeBg;
}



/**
 * 
 * @param {AgentEvent} event 
 */
function onUpdated(event){

    let agent = event.src;
    console.log("Updated Agent" + agent.id);

    agent.lookTo((agent.dir + 2)%4);
}

function onDirChanged(event){
    let agent = event.src;
    console.log(agent.dir);

    let IMG = document.querySelector("#displayRobot");
    let IMGIFRAME = document.querySelector("#iFrameDisplayRobot");

    switch(agent.dir){
        case 0:
            IMG.className = "forward";
            IMG.src = "img/mario/robot-forward.svg";

            IMGIFRAME.className = "forward";
            IMGIFRAME.src = "img/mario/robot-forward.svg";
            break;
        case 1:
            IMG.className = "backward";
            IMG.src = "img/mario/robot-backward.svg";

            IMGIFRAME.className = "backward";
            IMGIFRAME.src = "img/mario/robot-backward.svg";
            break;
        case 2:
            IMG.className = "left";
            IMG.src = "img/mario/robot-left.svg";

            IMGIFRAME.className = "left";
            IMGIFRAME.src = "img/mario/robot-left.svg";
            break;
        case 3:
            IMG.className = "right";
            IMG.src = "img/mario/robot-right.svg";
            
            IMGIFRAME.className = "right";
            IMGIFRAME.src = "img/mario/robot-right.svg";
            break;
    }
}

document.addEventListener("DOMContentLoaded", onLoaded);