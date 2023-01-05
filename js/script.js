/*
################################
##                            ##
## Author: Guillaume Lequart  ##
## Project: IframeBattlefX    ##
## Created: 12/12/2022        ##
##                            ##
################################
*/
var agent;

/**
 * Robot is connected
 * @param {AgentEvent} event 
 */
function onConnected(event){
    console.log("Agent connected " + agent.id);
    document.getElementById("idRobot").textContent = agent.id; // Get Robot Name
    changeClass("isBorn");

}

/**
 * Robot is disconnected
 * @param {event} event 
 */
function onDisconnected(event){
    console.log("Agent " + agent.id + " disconnected!");
    changeClass("isDead");
    modeAuto("true");
}

/**
 * Updated robot
 * @param {AgentEvent} event 
 */
function onUpdated(event){
    console.log("Updated Agent " + agent.id);
}

/**
 * Change direction where robot look, return rotateImage(params)
 * @param {AgentEvent} event 
 */
function onDirChanged(event){
    rotateImage(agent.dir);
}

/**
 * Actualize life
 * @param {AgentEvent} event 
 */
function onLifeChanged(event){
    /**
     * @var {number}  percentLife Calculate the percentage of life
     * @var {string}  lifeBg Change the background gradient uses percentAmmo as value for percentage
     * @var {Array}   life Get all elements of ammo bar (responsive elements) and put it into array to easily modify them
     */
    let percentLife = (((agent.life) / 100) * 100);
    let lifeBg = "linear-gradient(to right, var(--is-dead) " + percentLife +"%,transparent " + percentLife +"%)";

    let life = [
        document.getElementById("life"),
        document.getElementById("lifeShort"),
        document.getElementById("lifeIframe")
    ];

    let oldLife = life;

    life[0].textContent = "Vie : " + (((agent.life) / 100) * 100) + " / " + "100";
    life[0].style.background = lifeBg;
    life[1].textContent = "V: " + (((agent.life) / 100) * 100) + " / " + "100";
    life[1].style.background = lifeBg;
    life[2].textContent = (((agent.life) / 100) * 100) + " / " + "100";
    life[2].style.background = lifeBg;

    if(life <= 0){
       robotBox.className = "flex isDead";
    }

    if(oldLife < life){
        robotBox.className = "flex isTakeDamage";
    }
}

/**
 * Actualize ammo
 * @param {AgentEvent} event 
 */
function onAmmoChanged(event){
    /*
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

}

/**
 * Turn on/off automatic mode when click on button#modeAutoOff or button#modeAutoOn
 * & enable/disable all manual control buttons
 * @param {AgentEvent} event 
 */
function modeAuto(params){
    if(params == "false"){
        readonly = false;
        console.log(readonly);
        document.querySelector("#modeAutoOff").className = "disabled";
        document.querySelector("#modeAutoOn").className = "enabled";
        params = false;
    }else if(params == "true"){
        readonly = true;
        document.querySelector("#modeAutoOn").className = "disabled";
        document.querySelector("#modeAutoOff").className = "enabled";
        params = true;
    }
    // Enable / disable buttons to manual control
    document.getElementById("moveToForward").disabled = params;
    document.getElementById("moveToBackward").disabled = params;
    document.getElementById("moveToLeft").disabled = params;
    document.getElementById("moveToRight").disabled = params;
    document.getElementById("turnToLeft").disabled = params;
    document.getElementById("turnToRight").disabled = params;
    document.getElementById("shooting").disabled = params;
}

/**
 * Remove animation class and add the new if {params} is set
 * @param {string} params Get classname to animate the robotBox 
 */
function changeClass(params){
    let robotBox = document.querySelector("#robotBox").classList;
    robotBox.remove("isMoveToForward");
    robotBox.remove("isMoveToBackward");
    robotBox.remove("isMoveToLeft");
    robotBox.remove("isMoveToRight");
    robotBox.remove("isShooting");
    robotBox.remove("isTakeDamage");

    if(params != null) robotBox.add(params);
}

/**
 * Robot start shooting after "mouseUp" on button#shooting
 * & robot stop shooting after "mouseDown" on button#shooting
 * @param {string} params 
 */
function isShooting(params){
    if(params == "true"){
        agent.fire(true);
        changeClass("isShooting");
        console.log("Is Shooting!");

    // Stop Shooting
    }else if(params == "false"){
        agent.fire(false);
        console.log("Stop shooting!");
    }
}

/**
 * Function to move robot to East{Right}, South{Backward}, West{West} or North{North}
 * when click on button#isMoveTo{params}
 * @param {string} params 
 */
function moveTo(params){

    switch(params){
        case "Right":
            agent.move(1, 0);
            break;
        case "Forward":
            agent.move(0, 1);
            break;
        case "Backward": 
            agent.move(0, -1);
            break;
        case "Left":
            agent.move(-1, 0);
            break;
    }

    // Remove old animation and change it to the new
    changeClass("isMoveTo" + params);
}

/**
 * Function, turn to right when click on turnToRight button
 * @param {AgentEvent} event 
 */
function turnToLeft(event){
    let direction = 0;
    if((agent.dir + 1) > 3){
        agent.lookTo(0);
        direction = 0;
    }else{
        agent.lookTo(agent.dir + 1);
        console.log("Se tourne vers la droite " + agent.dir);
        direction = agent.dir + 1;
    }
    rotateImage(direction);
}

/**
 * Function, turn to left when click on turnToLeft button
 * @param {AgentEvent} event 
 */
function turnToRight(event){
    let direction = 0;
    if((agent.dir - 1) < 0){
        agent.lookTo(3);
        direction = 3;
    }else{
        agent.lookTo(agent.dir - 1);
        console.log("Se tourne vers la gauche " + agent.dir);
        direction = agent.dir - 1;
    }
    rotateImage(direction);
}

/**
 * Function to change rotation of image and image Iframe when robot
 * change the direction where his look
 * @param {params} params 
 */
function rotateImage(params){
    let img = document.querySelector("#displayRobot");
    let imgIframe = document.querySelector("#iFrameDisplayRobot");

	img.style.transform = "rotate(-"+params*90+"deg)";
    imgIframe.style.transform = "rotate(-"+params*90+"deg)";
}

/**
 * Function to initialize robot & interactions
 * @param {Event} event 
 */
function onLoaded(event){
    // When click on button#shooting robot shoot once
    let fireButton = document.querySelector("#shooting")
    fireButton.addEventListener('mousedown', () => {
        isShooting("true");
    });
    fireButton.addEventListener('mouseup', () => {
        isShooting("false");
    });

    // Enable / disable automatic mode
    document.querySelector("#modeAutoOn").addEventListener('click', () => {
        modeAuto("true");
    });
    document.querySelector("#modeAutoOff").addEventListener('click', () => {
        modeAuto("false");
    });

    // Move robot in arena
    document.querySelector("#moveToBackward").addEventListener('click', () => {
        moveTo("Backward");
    });
    document.querySelector("#moveToRight").addEventListener('click', () => {
        moveTo("Right");
    });
    document.querySelector("#moveToForward").addEventListener('click', () => {
        moveTo("Forward");
    });
    document.querySelector("#moveToLeft").addEventListener('click', () => {
        moveTo("Left");
    });

    // Turn the robot
    document.querySelector("#turnToLeft").addEventListener('click', turnToLeft);
    document.querySelector("#turnToRight").addEventListener('click', turnToRight);

    // Get params in URL
    let url = new URLSearchParams(window.location.search);
    console.log(event);

    let agentid = url.get('agentid');
    let readonly = url.get('readonly');
    let verbosity = url.get('verbosity');

    // Make default value for readonly and verbosity
    readonly = ( readonly == null ) ? true : (readonly === 'true');
	verbosity = ( verbosity == null ) ? 1 : parseInt(verbosity);
	console.log(`Creating agent ...`);
	console.log(`readonly:${readonly}`);
	console.log(`verbosity:${verbosity}`);

    // Create an instance of robot
    agent = new Agent(
        agentid, // id
        "demo", // username
        "demo", // password
        "demo", // arena 
        "8080", // port
        "mqtt.jusdeliens.com", // server
        verbosity, // verbose, 0, 1, 2, 3, 4
        readonly // true or false
    );

    // Connect agent and add events
    agent.connect();
    agent.addEventListener("connected", onConnected);
    agent.addEventListener("updated", onUpdated);
    agent.addEventListener("dirChanged", onDirChanged);

    agent.addEventListener('lifeChanged', onLifeChanged);
    agent.addEventListener('ammoChanged', onAmmoChanged);

    // Disable manual mode if readonly == true and enable manual mode if readonly == false
    if(readonly == false) modeAuto("false");
    if(readonly == true) modeAuto("true");

    // If agent is disconnected
    agent.addEventListener("disconnected", onDisconnected);
}

document.addEventListener("DOMContentLoaded", onLoaded);