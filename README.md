# IframeBattlefX

[![forthebadge](https://forthebadge.com/images/badges/it-works-why.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/for-robots.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)

## Introduction

Le projet **IframeBattlefX** consiste en un **site web** possédant une **interface reliée à un robot** contrôlé par un **utilisateur en mode manuel** et avoir un **mode automatique**, pour que ce dernier puisse **combattre dans une arène**, cette dernière étant gérer par un **administrateur**.

Le **client** demande à ce que le robot ait un **thème unique**, une couleur différente suivant l'**état en temps réel du robot**, pouvoir **tirer**, avoir des **mélodies uniques** selon le **thème choisie** et ce pour **chaques états** ("tirer", "déplacement", "perte de vie", "mort").

Le site devra:
* Récupérer le nom du robot par **URL** (**GET**) et se **connecter automatiquement** à l'arène 
* Le robot ne devra pas **dépasser une case** de la **grille de l'arène** et s'**adapter** automatiquement à la taille de cette dernière
* Afficher les **différents états** du robot, ses **munitions** et son **nom**
* Afficher le robot selon le **thème choisi par le client** en vue du dessus
* Emettre des mélodies **différentes** et selon le **thème** choisi suivant l'**état du robot**
* Permettre les **déplacements** selon les points **cardinaux** ("Est", "Sud", "Ouest" et "Nord")
* Être **responsive** (s'afficher en fonction de l'appareil utilsé, "***PC**", "**Tablette**" et "**Téléphone**")
* Le contrôle **manuel** ne pourra se faire que si l'**appareil utilisé le permet**
* Avoir un affichage **minimaliste** en mode **"iframe"** contenant seulement les informations **importantes**
* Pouvoir **contrôler** le robot dans l'arène
* Pouvoir passer du mode **manuel** au mode **automatique**
* Tout ceci devra être sur **une seule page** en utilisant le **HTML** et le **CSS**

Le **Javascript** sera le language utilisé pour **contôler** le robot, **émettre la couleur** et **les mélodies** suivant l'**état de ce dernier** ainsi que pour **récupérer les informations en temps réel** ("état", "munition", "point de vie") le **HTML** et **CSS** serviront quand à eux à **afficher** et **styliser** (la mise en page) les **informations récupérées** en **javascript** et permettre l'utilisation sur différents appareils ("**PC**", "**Tablette**" et "**Téléphone**".


## User Story
 
En tant qu'utilisateur je veux avoir
* Une **couleur qui se démarque** suivant l'état du robot
* Voir les informations sur l'**état du robot**, de **ses munitions** et son **nom**
* **Des mélodies simples** et **reconnaissables** suivant le **thème choisi** et l'**état du robot**
* Un robot ayant **l'apparence du thème choisi** en vue du dessus
* Une interface de **commande à distance** facile d'accès
* Un **mode manuel** ou **automatique** en **"supervision"** et seulement le **mode autonome** en **"iframe"**
* Un site **ergonomique** et **responsive** sur **une seule page**
* La version **"iframe"** devra simplement contenir le **nom**, **l'état**, les **munitions**, faire les **mélodies** et voir le **robot (vue du dessus)**

## Fariqué avec

Programmes utilisés:
* **[Figma](https://www.figma.com/ "Figma")** (conception de la maquette)
* **[Trello](https://trello.com/ "Trello")** (suivi du projet)
* **[Visual Studio Code](https://code.visualstudio.com/ "VSCode")** (utilisé pour la programmation)

Languages utilisés:
* **HTML** et **CSS** (conception du front-end)
* **Javascript**

## Auteur

**Guillaume Lequart** alias [Malo Coccyx](https://github.com/MaloCoccyx/ "@MaloCoccyx")
