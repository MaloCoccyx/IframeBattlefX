import { Agent } from "./iframebattlefx.js";

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
const IMG = document.getElementById("displayRobot");
const IMGIFRAME = document.getElementById("iFrameDisplayRobot");
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
################################
## Initialize Robot Variables ##
################################
*/
var modeAuto = false;
var robotState = "isBorn";
var robotDead = false;


/*
###########################
## Change Robot Rotation ##
###########################
/* Change Robot Rotation onClick turnToLeft Button */

function turnToLeft() {
    // Treatment
    if(IMG.className == "forward" && IMGIFRAME.className == "forward"){
        IMG.className = "left";
        IMG.src = "img/mario/robot-left.svg";

        /* Mode Iframe */
        IMGIFRAME.className = "left";
        IMGIFRAME.src = "img/mario/robot-left.svg";
        return;
    }else if(IMG.className == "left" && IMGIFRAME.className == "left"){
        IMG.className = "backward";
        IMG.src = "img/mario/robot-backward.svg";

        /* Mode Iframe */
        IMGIFRAME.className = "backward";
        IMGIFRAME.src = "img/mario/robot-backward.svg";
        return;
    }else if(IMG.className == "backward" && IMGIFRAME.className == "backward"){
        IMG.className = "right";
        IMG.src = "img/mario/robot-right.svg";

        /* Mode Iframe */
        IMGIFRAME.className = "right";
        IMGIFRAME.src = "img/mario/robot-right.svg";
        return;
    }else if(IMG.className == "right" && IMGIFRAME.className == "right"){
        IMG.className = "forward";
        IMG.src = "img/mario/robot-forward.svg";

        /* Mode Iframe */
        IMGIFRAME.className = "forward";
        IMGIFRAME.src = "img/mario/robot-forward.svg";
        return;
    }
} 

/* Change Robot Rotation onClick turnToRight Button */
function turnToRight() {

    // Treatment
    if(IMG.className == "forward" && IMGIFRAME.className == "forward"){
        IMG.className = "right";
        IMG.src = "img/mario/robot-right.svg";

        /* Mode Iframe */
        IMGIFRAME.className = "right";
        IMGIFRAME.src = "img/mario/robot-right.svg";
        return;
    }else if(IMG.className == "right" && IMGIFRAME.className == "right"){
        IMG.className = "backward";
        IMG.src = "img/mario/robot-backward.svg";

        /* Mode Iframe */
        IMGIFRAME.className = "backward";
        IMGIFRAME.src = "img/mario/robot-backward.svg";
        return;
    }else if(IMG.className == "backward" && IMGIFRAME.className == "backward"){
        IMG.className = "left";
        IMG.src = "img/mario/robot-left.svg";

        /* Mode Iframe */
        IMGIFRAME.className = "left";
        IMGIFRAME.src = "img/mario/robot-left.svg";
        return;
    }else if(IMG.className == "left" && IMGIFRAME.className == "left"){
        IMG.className = "forward";
        IMG.src = "img/mario/robot-forward.svg";

        /* Mode Iframe */
        IMGIFRAME.className = "forward";
        IMGIFRAME.src = "img/mario/robot-forward.svg";
        return;
    }
} 


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
########################
## Change Robot State ##
########################
*/

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



/*
########################
## Connected to Arena ##
########################
*/
function onLoaded(event){
    // Get params in URL
    var url = new URL(window.location.href);
    console.log(url);

    /** 
     * Creates and connects the agent in the arena
     * with parameters pass through url
     * 
     * @param {string} 	id          The wanted name of the agent
     * @param {string} 	username    Username to connect to the server
     * @param {string} 	password    User password coming with the username to connect to the server
     * @param {string}  arena       The name of the arena to join (iframebattlefx)
     * @param {number}  port        The server port number (443)
     * @param {string}  server      The server URL (mqtt.jusdeliens.com)
     * @param {number} 	verbose     The wanted verbosity of the logs. 0: None, 1: Error, 2: Warning, 3: Info, 4: Debug
     * @param {Boolean} readonly    Set to true to only read agent state (default). False to be able to control agent.
    */
    var id = url.searchParams.get('id');
    var readOnly = url.searchParams.get('readonly');
    var userName = url.searchParams.get('username');
    var passWord = url.searchParams.get('password');
    var port = url.searchParams.get('port');
    var arena = url.searchParams.get('arena');
    var server = url.searchParams.get('server');
    var verbose = url.searchParams.get('verbose');

    /**
     * Connecting to pytactx and subscribe to agent events
    */

    var agent = new Agent(
        "toto", // id
        "demo", // arena
        "demo", // username
        "demo", // password 
        "8080", // port
        "mqtt.jusdeliens.com", // server
        3, // verbose
        true // true
    );
    agent.connect();

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



/*
############
## Update ##
############
*/
function onUpdate(){

}

document.addEventListener("DOMContentLoaded", onLoaded);