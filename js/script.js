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

function robotState(parameter){

    // Initialize Variables

    // Treatment
    if(ROBOTBOX.className != "flex " + parameter){
        ROBOTBOX.className = "flex " + parameter;
        setTimeout(() => {
            // If paremeter != "isDead", robot still alive
            if(parameter != 'isDead'){
                ROBOTBOX.className = "flex isAlive";
            }else{
                ROBOTBOX.className = "flex isDead";
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
        }, 1
    );
    return;
}