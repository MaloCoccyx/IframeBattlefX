/*
################################
##                            ##
## Author: Guillaume Lequart  ##
## Project: IframeBattlefX    ##
## Created: 12/12/2022        ##
##                            ##
################################
*/
/**
 * @var {Agent} agent           Instance of object {Agent}
 * @var {string} buttonAutoOn   get button #modeAutoOn
 * @var {string} buttonAutoOff  get button #modeAutoOff
 * @var {number} direction      0:East - 1:North - 2:West - 3:South
 * @var {number} maxLife        set max life of robot (agent.life)
 * @var {number} maxAmmo        set max ammo of robot (agent.ammo)
 * @var {bool} controlAuto      mode auto: true = enable | false = disable
 */
var agent;
var buttonAutoOn;
var buttonAutoOff;
var direction;
var maxLife;
var maxAmmo;
var controlAuto;

/**
 * Robot is connected
 * Change state & makke sure manual control is enable
 * @param {AgentEvent} event 
 */
function onConnected(event){
    console.log("Agent connected " + agent.id);
    document.getElementById("idRobot").textContent = agent.id; // Get Robot Name
    changeClass("isBorn");
    modeAuto("false");
    fetch("http://localhost:8080/isBorn");

}

/**
 * Robot is disconnected
 * Change state & disable all buttons
 * @param {event} event 
 */
function onDisconnected(event){
    console.log("Agent " + agent.id + " disconnected!");
    changeClass("isDead");
    modeAuto("true", true, true);
    fetch("http://localhost:8080/isDead");
}

/**
 * Updated robot
 * @param {AgentEvent} event 
 */
function onUpdated(event){
    console.log("Updated Agent " + agent.id);
    console.log(controlAuto);
    if(controlAuto == true){
        console.log("Contrôle automatique activé!");
        modeAuto("true", true, true);
          // Random moving agent
        agent.move(
            Math.floor(Math.random() * 3) - 1,
            Math.floor(Math.random() * 3) - 1
        );
        let dir = (agent.dir + 1) % 4;
        agent.lookTo(dir);
        if(agent.d > 0){
            isShooting("true");
        }

    }
    else console.log("Contrôle manuel!");
    if(agent.life <= 0){
        fetch("http://localhost:8080/isDead");
    }
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
     * @var {number}  percentLife   Calculate the current percentage of life
     * @var {string}  lifeBg        Change the background gradient uses percentLife as value for percentage
     * @var {number}  life          Get current life of robot
     * @var {Array}   htmlLife      Get all html elements of life bar (responsive elements) and put it into array to easily modify them
     */
    let life = agent.life;
    let percentLife = (((agent.life) / 100) * 100);
    let lifeBg = "linear-gradient(to right, var(--is-dead) " + percentLife +"%,transparent " + percentLife +"%)";

    let htmlLife = [
        document.getElementById("life"),
        document.getElementById("lifeShort"),
        document.getElementById("lifeIframe")
    ];

    htmlLife[0].textContent = "Vie : " + percentLife + " / " + maxLife ;
    htmlLife[0].style.background = lifeBg;
    htmlLife[1].textContent = "V: " + percentLife + " / " + maxLife;
    htmlLife[1].style.background = lifeBg;
    htmlLife[2].textContent = percentLife + " / " + maxLife;
    htmlLife[2].style.background = lifeBg;
    robotBox.className = "flex isTakeDamage";
    fetch("http://localhost:8080/isTakeDamage");

    if(life <= 0){
       robotBox.className = "flex isDead";
       fetch("http://localhost:8080/isDead");
    }

    if(life < maxLife && life > 0){
        robotBox.className = "flex isTakeDamage";
        fetch("http://localhost:8080/isTakeDamage");
    }
}

/**
 * Actualize ammo
 * @param {AgentEvent} event 
 */
function onAmmoChanged(event){
    /*
     * @var {number}  percentAmmo   Calculate the percentage of ammo
     * @var {string}  ammoBg        Change the background gradient uses percentAmmo as value for percentage
     * @var {number}  ammo          Get current ammo of robot
     * @var {Array}   htmlAmmo      Get all elements of ammo bar (responsive elements) and put it into array to easily modify them
     */
    let percentAmmo = (((agent.ammo) / 100) * 100);
    let ammoBg = "linear-gradient(to right, var(--ammo) " + percentAmmo +"%,transparent " + percentAmmo +"%)";
    let ammo = agent.ammo;
    let htmlAmmo = [
        document.getElementById("ammo"),
        document.getElementById("ammoShort"),
        document.getElementById("ammoExtraShort"),
        document.getElementById("ammoIframe")
    ];
    htmlAmmo[0].textContent = "Munitions : " + ammo + " / 100";
    htmlAmmo[0].style.background = ammoBg;
    htmlAmmo[1].textContent = "Mun: " + ammo + "/100";
    htmlAmmo[1].style.background = ammoBg;
    htmlAmmo[2].textContent = "M: " + ammo + "/100";
    htmlAmmo[2].style.background = ammoBg;
    htmlAmmo[3].textContent = ammo + "/100";
    htmlAmmo[3].style.background = ammoBg;

}

/**
 * Turn on/off automatic mode when click on button#modeAutoOff or button#modeAutoOn and if {auto} == true
 * If {noControl} == true, modeAuto is ON & disable all buttons (in case of disconnected/ readonly set to true)
 * & enable/disable all manual control buttons
 * 
 * @param {string} params       Disable / Enable button
 * @param {string} auto         Activate mode auto, default: "false"
 * @param {string} noControl    disabl all buttons
 */
function modeAuto(params, auto = false, noControl = false){
    if(auto == true){
        controlAuto = true;
    }else{
        controlAuto = false;
    }

    if(params == "false"){
        buttonAutoOff.className = "disabled";
        buttonAutoOn.className = "enabled";
        params = false;
    }else if(params == "true"){
        buttonAutoOn.className = "disabled";
        buttonAutoOff.className = "enabled";
        params = true;
    }
    // Enable / disable buttons to manual control
    buttonAutoOn.disabled = noControl;
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
    robotBox.remove("isDead");
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
        fetch("http://localhost:8080/isShooting");
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
            agent.move(0, -1);
            break;
        case "Backward": 
            agent.move(0, 1);
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
 * @param {params} params   0:East - 1:North - 2:West - 3:South
 */
function rotateImage(params){
	document.querySelector("#displayRobot").style.transform = "rotate(-"+params*90+"deg)";
    document.querySelector("#iFrameDisplayRobot").style.transform = "rotate(-"+params*90+"deg)";
}

function playSound(params){
    
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
    buttonAutoOff = document.querySelector("#modeAutoOff");
    buttonAutoOn = document.querySelector("#modeAutoOn");

    buttonAutoOn.addEventListener('click', () => {
        modeAuto("true", true);
    });
    buttonAutoOff.addEventListener('click', () => {
        modeAuto("false", false );
    });

    // Sound buttonOn
    document.querySelector("#soundOn").addEventListener('click', () => {
        playSound(playSoundBorn);
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

    // Movement & interactions with keyboard
    document.addEventListener('keydown', (event) => {
        const keyName = event.key;

        if (keyName === 'ArrowUp') {
            moveTo("Forward");
            return;
        }

        if (keyName === 'ArrowLeft') {
            moveTo("Left");
            return;
        }
        if (keyName === 'ArrowRight') {
            moveTo("Right");
            return;
        }
        if (keyName === 'ArrowDown') {
            moveTo("Backward");
            return;
        }
    }, false);

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
        "iframebattlefx", // arena 
        "8080", // port
        "mqtt.jusdeliens.com", // server
        verbosity, // verbose, 0, 1, 2, 3, 4
        readonly // true or false
    );

    // Connect agent and add events
    agent.connect();
    agent.addEventListener("connected", onConnected);

    maxAmmo = agent.ammo;
    maxLife = agent.life;

    // Enable automatic mode if readonly == true, else disable it
    if(readonly == true || readonly == 'true'){
        controlAuto = true;
        modeAuto("true", true, true);
    }

    agent.addEventListener("updated", onUpdated);
    agent.addEventListener("dirChanged", onDirChanged);

    agent.addEventListener('lifeChanged', onLifeChanged);
    agent.addEventListener('ammoChanged', onAmmoChanged);

    // If agent is disconnected
    agent.addEventListener("disconnected", onDisconnected);

}

document.addEventListener("DOMContentLoaded", onLoaded);