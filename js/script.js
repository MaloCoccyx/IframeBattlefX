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
var robotBox = document.querySelector("#robotBox");

/**
 * 
 * @param {AgentEvent} event 
 */
function onConnected(event){
    console.log("Agent connected " + agent.id);
    document.getElementById("idRobot").textContent = agent.id; // Get Robot Name
    robotBox.className = "flex isBorn";

}

/**
 * 
 * @param {AgentEvent} event 
 */
function onUpdated(event){
    console.log("Updated Agent " + agent.id);
}

/**
 * 
 * @param {AgentEvent} event 
 */
function onDirChanged(event){
    let img = document.querySelector("#displayRobot");
    let imgIframe = document.querySelector("#iFrameDisplayRobot");

	img.style.transform = "rotate("+agent.dir*90+"deg)";
    imgIframe.style.transform = "rotate("+agent.dir*90+"deg)";
}

/**
 * 
 * @param {AgentEvent} event 
 */
function onLifeChanged(event){
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
 * 
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
 * 
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

function isShooting(event){
    agent.fire(true);
    removeAnimClass("isShooting");
    console.log("Is Shooting!");
}

function stopShooting(event){
    agent.fire(false);
    console.log("Stop shooting!");
}

function moveToForward(event){
    agent.move(0,-1);
    removeAnimClass("isMoveToForward");
    console.log("Déscend d'une case");
}

function moveToBackward(event){
    agent.move(0,1);
    removeAnimClass("isMoveToBackward");
    console.log("Monte d'une case");
}

function moveToLeft(event){
    agent.move(-1, 0);
    removeAnimClass("isMoveToLeft");
    console.log("A gauche d'une case");
}

function moveToRight(event){
    agent.move(1, 0);
    removeAnimClass("isMoveToRight");
    console.log("A droite d'une case");
}

function turnToRight(event){
    agent.lookTo(agent.dir + 1);
    console.log("Se tourne vers la droite");
}

function turnToLeft(event){
    if(agent.dir <= 0 || agent.dir >= 4){
        agent.lookTo(0);
    }else{
        agent.lookTo(agent.dir - 1);
        console.log("Se tourne vers la gauche " + agent.dir);
    }
}

/**
 * 
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
    document.querySelector("#turnToRight").addEventListener('click', turnToLeft);


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
        "iframebattlefx", // arena 
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