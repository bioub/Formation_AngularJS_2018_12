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

On va commencer AngularJS, déjà regarder le site web et la doc.

Ne pas confondre 2 sites web :
AngularJS: https://angularjs.org/
Angular 2 et + : 
https://angular.io/

Sur le site AngularJS
- un tutoriel plutot bien fait, que vous pourrez refaire après la formation :
https://docs.angularjs.org/tutorial
- un developper guide, qui couvre les concepts d'AngularJS
https://docs.angularjs.org/guide
- API Reference, c'est la doc qui décrit les fonctions et les composants d'AngularJS
https://docs.angularjs.org/api

Sur la page d'accueil, il y a bouton download, on nous propose plusieurs choix (version 1.7 actuelle et la 1.2 qui est la car la seule compatible IE8) :
- CDN le script reste sur les serveurs de Google
- bower => déprécié (mais peut etre dans vos projets)
- npm => (Node Package Manager, installé en même que Node.js), l'équivalent de maven en java ou nuget en C#, gestionnaire de dépendances (type apt-get sous Linux) (on va utiliser npm)
- fichiers ZIP

On va créer un projet hello-angularjs pour découvrir aujourd'hui les concepts d'AngularJS

Vous pouvez créer les fichiers en même temps que moi.

Le fichier package.json va permettre de mémoriser les versions des bibliothèques installées avec npm.

Pour installer AngularJS avec npm, dans un terminal :
npm install angular

Cette commande fait 3 choses :
- installer AngularJS dans le dossier node_modules
- ajouter une section dependencies avec la version AngularJS
installée dans package.json
- créer un fichier package-lock.json et mémoriser la version AngularJS installée, l'URL pour la retélécharger et un checksum pour éviter que lors d'un nouveau téléchargement on installe une version hackée

Dans le package.json la version est préfixée par un ^, ce qui veut dire qu'en cas de mise à jour, on verrouille de premier chiffre.

Dans une numérotation 1.2.3
1: version majeure
2: version mineure
3: version patch ou correctif

Pour une bibliothèque comme AngularJS
incrémenter le patch => aucun changement de l'API (les fonction sont les mêmes, mêmes paramètres...)
incrémenter mineure => changement rétro-compatible (ex:
nouvelle fonction)
incrémenter majeure => changement rétro-incompatible (ex: fonction supprimée, renommée...)

AngularJS ne respecte PAS ce principe, donc on peut avoir des changements rétro-incompatible entre la 1.6 et la 1.7

Mais Angular le respecte et c'est la raison qui fait qu'aujourd'hui on en est à Angular 7 déjà.

Dans le package.json on devrait donc plutot remplacer le ^ par un ~ qui vérouille la version mineure (sachant que la 1.7 sera la dernière version d'AngularJS, Google a annoncé la fin du support pour 2021)