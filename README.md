# IframeBattlefX

[![forthebadge](https://forthebadge.com/images/badges/it-works-why.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/for-robots.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)

## Introduction

Le projet **IframeBattlefX** consiste en un **site web** possédant une **interface reliée à un robot** contrôlé par un **utilisateur en mode manuel** et avoir un **mode automatique**, pour que ce dernier puisse **combattre dans une arène**, cette dernière étant gérer par un **administrateur**.

Le **client** demande à ce que le robot ait un **thème unique**, une couleur différente suivant l'**état en temps réel du robot**, pouvoir **tirer**, avoir des **mélodies uniques** selon le **thème choisie** et ce pour **chaques états** ("tirer", "déplacement", "perte de vie", "mort", "rotation").

Le **Javascript** sera le language utilisé pour **contôler** le robot, **émettre la couleur** et **les mélodies** suivant l'**état de ce dernier** ainsi que pour **récupérer les informations en temps réel** ("état", "munition", "point de vie") le **HTML** et **CSS** serviront quand à eux à **afficher** et **styliser** (la mise en page) les **informations récupérées** en **javascript** et permettre l'utilisation sur différents appareils ("**PC**", "**Tablette**" et "**Téléphone**".


## User Story
 
En tant qu'utilisateur je veux avoir
* Une **couleur qui se démarque** suivant l'état du robot
* Voir les informations sur l'**état du robot**, de **ses munitions** et son **nom**
* **Des mélodies simples** et **reconnaissables** suivant le **thème choisi** et l'**état du robot**
* Un robot ayant **l'apparence du thème choisi** en vue du dessus
* Une interface de **commande à distance** facile d'accès, permettant les **déplacements** selon les points **cardinaux** ("Est", "Sud", "Ouest" et "Nord") et la **rotation**
* Un **mode manuel** ou **automatique** en **"supervision"** et seulement le **mode autonome** en **"iframe"**
* Un site **ergonomique** et **responsive** sur **une seule page**
* Être **responsive** (s'afficher en fonction de l'appareil utilsé, "***PC**", "**Tablette**" et "**Téléphone**")
* Le contrôle **manuel** ne pourra se faire que si l'**appareil utilisé le permet**
* La version **"iframe"** devra simplement contenir le **nom**, **l'état**, les **munitions**, faire les **mélodies** et voir le **robot (vue du dessus)**

En tant qu'administrateur je veux avoir:

* Récupérer le nom du robot par **URL** (**GET**) et se **connecter automatiquement** à l'arène 
* Avoir un affichage **minimaliste** en mode **"iframe"** contenant seulement les informations **importantes***
* Afficher le robot selon le **thème choisi par le client** en vue du dessus
* Le robot ne devra pas **dépasser une case** de la **grille de l'arène** et s'**adapter** automatiquement à la taille de cette dernière

## Fariqué avec

Programmes utilisés:
* **[Figma](https://www.figma.com/)** (Conception de la maquette)
* **[Trello](https://trello.com/)** (Suivi du projet)
* **[Visual Studio Code](https://code.visualstudio.com/)** (Utilisé pour la programmation) 
* **[FileZilla](https://filezilla-project.org/)** (utilisé pour la mise en ligne des fichiers sur le serveur web)
* **[API IframeBattlefX](https://github.com/MaloCoccyx/IframeBattlefX/blob/main/js/iframebattlefx.js)** (API JavaScript pour intéragir avec le robot sur le serveur)
* **[Serveur pytactx Jusdeliens.com](http://jusdeliens.com/play/pytactx/)** (Utilisé pour voir l'arène (le serveur) sur lequel se connecte le robot)
* **[Python3](https://www.python.org/download/releases/3.0/)** (Utilisé pour le framework Flask et jouer les sons et lumières avec le robot)
* **[Flask](https://flask.palletsprojects.com/)** (Framework Web Python)
* **[Docker](https://www.docker.com/)** (Utilisé pour le serveur python (Python3 & Flask) et apprendre linux)

Languages utilisés:
* **HTML** et **CSS** (Conception du front-end)
* **Javascript** (Intéraction avec l'API et utilisation de DOM)
* **Python** (Utilisé pour jouer les mélodies et les lumières correspondant à l'état du robot)

```mermaid
sequenceDiagram
    Navigateur->>+Apache: Connexion au site (GET) URL
    Note right of Navigateur: Paramètres
    Note right of Navigateur: agentId = id de l'agent (string)
    Note right of Navigateur: readonly = lecture seule (bool)
    Note right of Navigateur: verbosity = log (int)


    Apache->>+index.html: Squelette de la page
    index.html->>+Navigateur: Récupération de l'HTML
    Apache->>+css/style.css: Style (design)
    Apache->>+js/script.js: Script
    Apache->>+js/iframebattlefx.js:API iframebattlefx
    Apache->>+js/paho-mqtt.js: Broker MQTT
    css/style.css->>+Navigateur: Récupération du style
    js/script.js->>+Navigateur: Execution
    js/iframebattlefx.js->>+Navigateur: Execution
    js/paho-mqtt.js->>+Navigateur: Execution
    
    Apache->>+js/script.js: JavaScript (onDomContentLoaded)
    js/script.js->>+js/iframebattlefx.js: Evoie des paramètres passé en URL ainsi que les intéractions
    js/iframebattlefx.js->>+js/paho-mqtt.js: Connexion au serveur mqtt.jusdeliens.com
    js/paho-mqtt.js->>+js/iframebattlefx.js: Retourne les informations du robot 
    js/iframebattlefx.js->>+js/script.js: Créé l'objet Agent (robot)
    js/script.js->>+Navigateur: Execution
    Navigateur->>+Apache: Intéraction
    Apache->>+js/script.js: Execution de la fonction suivant l'intéraction effectuée
    js/script.js->>+js/iframebattlefx.js: Traitement
    js/iframebattlefx.js->>+js/paho-mqtt.js: Traitement
    js/paho-mqtt.js->>+js/iframebattlefx.js: Retourne le résultat
    js/iframebattlefx.js->>+js/script.js: Retourne le résultat
    js/script.js->>+Navigateur: Retourne le résultat (effectue les changement visuels si besoin (direction du robot, état))
    Navigateur->>+Apache: Mode automatique
    Apache->>+js/script.js: Passage au mode automatique
    loop Mode automatique et fonction "onUpdate" (200ms env)
        js/script.js->>+js/iframebattlefx.js: Traitement
        js/iframebattlefx.js->>+js/paho-mqtt.js: Traitement
        js/paho-mqtt.js->>+js/iframebattlefx.js: Retourne le résultat
        js/iframebattlefx.js->>+js/script.js: Retourne le résultat
        js/script.js->>+Navigateur: Retourne le résultat (effectue les changement visuels si besoin (direction du robot, état))
    end
```

## Auteur

**Guillaume Lequart** alias [Malo Coccyx](https://github.com/MaloCoccyx/ "@MaloCoccyx")
