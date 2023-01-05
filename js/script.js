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
 * Function when robot is connected
 * @param {AgentEvent} event 
 */
function onConnected(event){
    console.log("Agent connected " + agent.id);
    document.getElementById("idRobot").textContent = agent.id; // Get Robot Name
    robotBox.className = "flex isBorn";

}

/**
 * Function to updated robot
 * @param {AgentEvent} event 
 */
function onUpdated(event){
    console.log("Updated Agent " + agent.id);
}

/**
 * Function, change direction where robot look, return rotateImage(params)
 * @param {AgentEvent} event 
 */
function onDirChanged(event){
    rotateImage(agent.dir);
}

/**
 * Function to actualize life
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
 * Function to actualize ammo
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
 * Function, to turn on automatic mode when click on modeAutoOn button
 * and disabled all manual control button
 * @param {AgentEvent} event 
 */
function modeAutoOn(event){
    document.querySelector("#modeAutoOn").className = "disabled";
    document.querySelector("#modeAutoOff").className = "enabled";
    document.getElementById("moveToForward").disabled = true;
    document.getElementById("moveToBackward").disabled = true;
    document.getElementById("moveToLeft").disabled = true;
    document.getElementById("moveToRight").disabled = true;
    document.getElementById("turnToLeft").disabled = true;
    document.getElementById("turnToRight").disabled = true;
    document.getElementById("shooting").disabled = true;
}

/**
 * Function, to turn off automatic mode when click on modeAutoOff button
 * and enable all manual control button
 * @param {AgentEvent} event 
 */
function modeAutoOff(event){
    readonly = false;
    console.log(readonly);
    document.querySelector("#modeAutoOff").className = "disabled";
    document.querySelector("#modeAutoOn").className = "enabled";
    document.getElementById("moveToForward").disabled = false;
    document.getElementById("moveToBackward").disabled = false;
    document.getElementById("moveToLeft").disabled = false;
    document.getElementById("moveToRight").disabled = false;
    document.getElementById("turnToLeft").disabled = false;
    document.getElementById("turnToRight").disabled = false;
    document.getElementById("shooting").disabled = false;
}

/**
 * Function to remove animation class and add another animation if params is set
 * @param {string} params Get classname to animate the robotBox 
 */
function removeAnimClass(params){
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
 * Function to Shoot with robot after mouseUp on fireButton
 * @param {AgentEvent} event 
 */
function isShooting(event){
    agent.fire(true);
    removeAnimClass("isShooting");
    console.log("Is Shooting!");
}

/**
 * Function robot stop shooting after mouseDown fireButton
 * @param {AgentEvent} event 
 */
function stopShooting(event){
    agent.fire(false);
    console.log("Stop shooting!");
}

/**
 * Function, move to forward (north) when click on moveToForward button
 * @param {AgentEvent} event 
 */
function moveToForward(event){
    agent.move(0,-1);
    removeAnimClass("isMoveToForward");
    console.log("Déscend d'une case");
}

/**
 * Function, move to backward (south) when click on moveToBackward button
 * @param {AgentEvent} event 
 */
function moveToBackward(event){
    agent.move(0,1);
    removeAnimClass("isMoveToBackward");
    console.log("Monte d'une case");
}

/**
 * Function, move to left (west) when click on moveToLeft button
 * @param {AgentEvent} event 
 */
function moveToLeft(event){
    agent.move(-1, 0);
    removeAnimClass("isMoveToLeft");
    console.log("A gauche d'une case");
}

/**
 * Function, move to right (east) when click on moveToRight button
 * @param {AgentEvent} event 
 */
function moveToRight(event){
    agent.move(1, 0);
    removeAnimClass("isMoveToRight");
    console.log("A droite d'une case");
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
 * Function to initialize robot 
 * @param {Event} event 
 */
function onLoaded(event){

    let fireButton = document.querySelector("#shooting")
    fireButton.addEventListener('mousedown', isShooting);
    fireButton.addEventListener('mouseup', stopShooting);

    document.querySelector("#modeAutoOn").addEventListener('click', modeAutoOn);
    document.querySelector("#modeAutoOff").addEventListener('click', modeAutoOff);

    document.querySelector("#moveToBackward").addEventListener('click', moveToBackward);
    document.querySelector("#moveToRight").addEventListener('click', moveToRight);
    document.querySelector("#moveToForward").addEventListener('click', moveToForward);
    document.querySelector("#moveToLeft").addEventListener('click', moveToLeft);

    document.querySelector("#turnToLeft").addEventListener('click', turnToLeft);
    document.querySelector("#turnToRight").addEventListener('click', turnToRight);


    let url = new URLSearchParams(window.location.search);
    console.log(event);

    let id = url.get('agentid');
    let readonly = url.get('readonly');
    let verbosity = url.get('verbosity');

    readonly = ( readonly == null ) ? true : (readonly === 'true');
	verbosity = ( verbosity == null ) ? 1 : parseInt(verbosity);
	console.log(`Creating agent ...`);
	console.log(`readonly:${readonly}`);
	console.log(`verbosity:${verbosity}`);

    agent = new Agent(
        "guillaume_lequart", // id
        "demo", // username
        "demo", // password
        "demo", // arena 
        "8080", // port
        "mqtt.jusdeliens.com", // server
        verbosity, // verbose, 0, 1, 2, 3, 4
        readonly // true or false
    );

    agent.connect();
    agent.addEventListener("connected", onConnected);
    agent.addEventListener("updated", onUpdated);
    agent.addEventListener("dirChanged", onDirChanged);

    agent.addEventListener('lifeChanged', onLifeChanged);
    agent.addEventListener('ammoChanged', onAmmoChanged);

    if(readonly != false) modeAutoOn();
}
document.addEventListener("DOMContentLoaded", onLoaded);