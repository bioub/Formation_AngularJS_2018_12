# Formation AngularJS

## Présentations

Je m'appelle Romain Bohdanowicz
Je suis indépendant depuis 10 ans environs

70% formation / 30% développement

En ce moment 80% de JavaScript (Language, API Web, AngularJS, Angular, React, NodeJS...)

Dans le passé beaucoup de Java, et de PHP aussi (Zend + Symfony)

Pour le programme des 3 jours :
Ce matin on va faire des rappels de JavaScript (avanvé) :
Closure, Asynchronisme, Modèle Objet (prototype)
A partir de cet après midi : AngularJS
Aujourd'hui on va introduire une partie des concepts

Vous allez voir qu'AngularJS c'est beaucoup de concept, une fois qu'on les a compris
ça permet de développer très rapidement.

Je vais vous laisser vous présenter, ce qui m'intéresse c'est pk vous êtes là ?
S'il y a un projet en cours ou a reprendre ? Votre expérience vis à vis de JavaScript ?

Hacene : développeur .NET depuis 1 an, plutôt back-end, front-end AngularJS à partir de cette année (chez Astek), client : hopitaux Lyon

## Introduction AngularJS

Je vous partagerais les slides après.

AngularJS c'est un framework open-source créé par 2 développeurs (pays de l'Est), repris et maintenu par Google depuis ~ 2009.

Il y a connu un évolution majeure il y a 3 ans, avec Angular 2, à l'origine ça devait etre juste une mise à jour et en fait c'est quasi impossible de migrer une application Angular 1 vers Angular 2 (je l'ai fait en début d'année, ça revient presque à tout réécrire), quand Angular 4 est sorti Google a décidé de renommer Angular 1 en AngularJS pour faire comme si c'est 2 framework différent (ce qui est le cas)

Cette semaine on va parler de AngularJS, mais je vais vous montrer comment structurer une application AngularJS qu'on puisse migrer. (AngularJS il y a plusieurs architectures possible, une seule de ces architecture existe dans Angular).

L'objectif d'AngularJS est d'accélerer le développement d'une Single Page Application (SPA) : une app ou il n'y a qu'un seul fichier HTML, le reste charge en JavaScript ex : GMail (certaines zones de la page raffraichissent).

Pour développer avec AngularJS, 2 IDEs recommandé :
- Visual Studio Code (open-source sous licence MIT)
- idéalement WebStorm (commercial entre 80 et 130 euros par an tarif dégressif, dérivé de IntelliJ (Java)), une démo de 30j si vous voulez essayer

On utilisera VS Code en formation qui est gratuit.

Eventuellement il faut installer Node.js car beaucoup d'outil aujourd'hui dans le dev front sont écrit avec Node.js (privilégier les versions paires qui sont Long Term Support aujourd'hui v10)

Donc je vous proposer de télécharger VSCode et Node 10 !

Pour vérifier l'install de Node il faut ouvrir un terminal (DOS par ex), et taper node -v 

On va créer un projet ce matin appeler Langage dans VSCode (un projet est juste un dossier, le créer avec Windows)

Je vais vous partager les sources et mes notes sur mon Github :
https://github.com/bioub

Avec VSCode on peut ouvrir plusieurs projet dans la même fenetre en allant dans
File > Add folder to workspace

