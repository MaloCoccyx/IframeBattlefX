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
###########################
## Change Robot Rotation ##
###########################
/* Change Robot Rotation onClick turnToLeft Button */
function turnToLeft() {

    // Initialize Variables
    const IMG = document.getElementById("displayRobot");
    const IMGIFRAME = document.getElementById("iFrameDisplayRobot");

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

    // Initialize Variables
    const IMG = document.getElementById("displayRobot");
    const IMGIFRAME = document.getElementById("iFrameDisplayRobot");

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

    // Initialize Variables
    const BUTTONON = document.getElementById("modeAutoOn");
    const BUTTONOFF = document.getElementById("modeAutoOff");

    // Treatment
    if(BUTTONOFF.className == "disabled" && BUTTONON.className == "enabled"){
        BUTTONOFF.className = "enabled";
        BUTTONON.className = "disabled";
        return
    }else if(BUTTONOFF.className == "enabled" && BUTTONON.className == "disabled"){
        BUTTONOFF.className = "disabled";
        BUTTONON.className = "enabled";
        return
    }
}

/* Enable / Disable buttons "sound" */
function soundOnOff(){

    // Initialize Variables
    const SOUNDON = document.getElementById("soundOn");
    const SOUNDOFF = document.getElementById("soundOff");

    // Treatment
    if(SOUNDOFF.className == "disabled" && SOUNDON.className == "enabled"){
        SOUNDOFF.className = "enabled";
        SOUNDON.className = "disabled";
        return
    }else if(SOUNDOFF.className == "enabled" && SOUNDON.className == "disabled"){
        SOUNDOFF.className = "disabled";
        SOUNDON.className = "enabled";
        return
    }
}

/*
########################
## Change Robot State ##
########################
/* Robot isShooting */
function isShooting(){

    // Initialize Variables
    const ROBOTBOX = document.getElementById("robotBox");

    // Treatment
    if(ROBOTBOX.className != "flex isShooting"){
        ROBOTBOX.className = "flex isShooting";
        setTimeout(() => {
                ROBOTBOX.className = "flex isAlive";
            }, 1000
        );
        return;
    }
}

/* Robot isDead */
function isDead(){

    // Initialize Variables
    const ROBOTBOX = document.getElementById("robotBox");

    // Treatment
    if(ROBOTBOX.className != "flex isDead"){
        ROBOTBOX.className = "flex isDead";
        setTimeout(() => {
                ROBOTBOX.className = "flex isDead";
            }, 1000
        );
        return;
    }
}

/* Robot isTakeDamage */
function isTakeDamage(){

    // Initialize Variables
    const ROBOTBOX = document.getElementById("robotBox");

    // Treatment
    if(ROBOTBOX.className != "flex isTakeDamage"){
        ROBOTBOX.className = "flex isTakeDamage";
        setTimeout(() => {
                ROBOTBOX.className = "flex isAlive";
            }, 1000
        );
        return;
    }
}


/*
###################
## Robot MoveToX ##
###################
/* Robot Move To Parameter (Forward, Left, Right, Backward)*/
function isMoveTo(Parameter){

    // Initialize Variables
    const MOVETO = document.getElementById("robotBox");

    // Treatment
    MOVETO.classList.remove("isMoveToForward");
    MOVETO.classList.remove("isMoveToLeft");
    MOVETO.classList.remove("isMoveToRight");
    MOVETO.classList.remove("isMoveToBackward");
    setTimeout(() => {
            MOVETO.classList.add("isMoveTo" + Parameter);
        }, 1
    );
    return;
}