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


Aujourd'hui on va créer un nouveau projet.
On va créer un petit carnet d'adresses en Single Page Application.
File > Add Folder to workspace 

Dans ce projet, il va falloir installer AngularJS de nouveau. Donc comme mercredi, créer un fichier package.json
avec {} à l'intérieur puis npm install angular

Dans ce projet je vais utiliser les conventions de Angular v2+, notamment pour la structure des fichiers.

On va créer :
src
- index.html
- app
  - app.module.js
  - app.component.js
  - app.component.html

En fait dans Angular v2+, tout est composant, et il faut au moins un composant racine (app.component).

Dans index.html
! puis ENTREE

# Conclusion

On a terminé !

Est-ce que il y a des choses que vous aimeriez voir encore ?
Ou des questions ?

Tests automatisés
Dans une application front end on peut faire plein de tests automatisés
- tester la sécurité
- tester le déploiement
- tester le code

Jusqu'à maintenant dans cette formation les tests étaient manuels, c'est à dire
que j'allais cliquer sur un bouton par exemple pour vérifier que le code fonctionne

Quand l'application va grossir, ça va être de plus en plus long de retester manuellement

Et au bout d'un moment je risque d'oublier de tester une fonctionnalité et ne pas voir un bug.

Pour éviter ça, on va automatiser les tests et donc les coder.

On retrouve différents types de tests au niveau code front-end (back end il peut y en avoir d'autres) :
- tests unitaires
- test d'intégration
- test End to End (e2e)

Test unitaire :
- on ne teste que le code d'une fonction
- idéalement la fonction est pure :
   - prédictive, si je l'appelle avec des params et me retourne toujours le meme résultat (ex de fonction prédictive : Math.floor, ex de fonction non prédictive Math.random)
   - sans side-effect (elle n'appelle pas de fonction extérieur)
   - elle ne modifie pas ses paramètres d'entrée
- quand elle n'est pas pure on peut utiliser des objets de test
  - mock
  - spy
  - stub
  dont l'objectif est de remplacer les parties impures de la fonction par du faux code
- sinon on peut aussi écrire un test d'intégration

Test d'intégration
- le teste d'une fonction impure exécute le code des fonctions externe

Test End-to-end
- les tests dans le client (on va piloter le navigateur pour qui clic sur un bouton
pas exemple et vérifie qu'un valeur s'affiche à l'endroit prévu)

On peut retrouver tous ces types de tests dans AngularJS
en général on a plus de test unitaire que d'intégration et plus d'intégration que e2e

Il devrait former une pyramide

  •  --> les tests e2e
 ••• --> les test d'intégrations
•••••--> les test unitaires

Plus on monte dans la pyramide plus le test est compliqué à écrire et à maintenir
(un changement dans l'interface arrive souvent et votre bouton risque d'etre déplacé
ou supprimé), mais aussi plus ils sont long à exécuter (unitaire seulement une fonction, alors que e2e toute l'application).

L'avantage des tests e2e ils exécutent beaucoup de code et permettent en moins de temps de détecter un problème, ils sont le reflets des specs de l'application (si je remplis le formulaire et que je clique sur add, je devrais etre redirigé vers la liste).

L'avantage des tests unitaires est qu'ils peuvent isoler un problème (puisqu'on sait qu'il se produit dans cette fonction)

Donc il faut idéalement un peu de tout.

Pour écrire les tests unitaires ou d'intégration, on peut utiliser les bibliothèques (pour les plus connues) :
- jasmine
- mocha
- jest

Si besoin on peut lancer ces tests dans différents navigateurs (une fonction peut ne pas fonctionner sous IE) avec Karma (test runner).

Pour écrire les test E2e on peut utiliser :
- Selenium
- WebdriverIO
- Protractor
- Puppeeter
- CodeceptJS (ma préférée)

Sur des projets AngularJS on retrouve le plus souvent
- Jasmine pour unitaire/intégration
- Protractor pour E2E (surcouche de Selenium faite par AngularJS qui ajoute la possible de selectionner par directive angular, est-ce que j'ai bien 3 element dans mon ng-repeat)

On va pas faire de démo, car il faudrait tout installer et tout configurer
mais je vous montrer les docs.

Dans le developer guide ET dans le tutoriel les tests sont fait dès le début

Exemple de test unitaire d'un composant avec Jasmine :

```
// describe permet de regroupe des tests (suite de tests)
describe('phoneList', function() {

  // beforeEach sera appelée avant chaque test
  // ici beforeEach charge le module phonecatApp
  // Load the module that contains the `phoneList` component before each test
  beforeEach(module('phonecatApp'));

  // un nouveau groupe qui pourrait avoir son propre beforeEach
  // Test the controller
  describe('PhoneListController', function() {

    // "it" c'est le test
    // c'est censé faire une phrase
    // il devrait créer un model phones avec 3 téléphone
    // en JS on appelle ça un Style BDD (Behavior Driven Development ->
    // les specs qui dictent nos tests

    // on voit aussi ici inject(), qui permet de récupérer des services
    // ici $componentController pour récupérer l'objet controller du composant
    it('should create a `phones` model with 3 phones', inject(function($componentController) {
      var ctrl = $componentController('phoneList');

      // la difficulté parfois ici est que le code est asynchrone
      // ici le test est synchrone (le tableau a été créé dans le constructeur de 
      // phoneListCtrl)

      // je m'attends à ce que la longueur du tableau phones soit 3
      expect(ctrl.phones.length).toBe(3);
    }));

  });

});
```

Dans le chapitre https://docs.angularjs.org/guide/unit-testing
Vous trouverez des exemples de tests unitaires (controllers, filtres...)

Dans E2E Testing https://docs.angularjs.org/guide/e2e-testing
des exemples de tests avec protractor

Bon après il faut un peu pratiquer...

D'autres questions ?
Est-ce qu'on fait souvent des tests front-end ?

Ça dépend du projet, il peut y avoir des projets ou ça n'a pas d'intérêt
Par exemple si je fais un site pour un événement (une conférence) je peux
faire mes tests manuellement puisque c'est une application qui sera dans la durée
donc faire ses tests manuellement prend moins de temps que de les automatiser
mais on gagnera du temps sur le long terme (si je dois les rejouer plusieurs fois)

Ça dépend du budget, moi en freelance c'est rare qu'on me donne le budget pour écrire les tests (ça demande 50% à 100% de temps supplémentaire de les écrire)

Dans l'idéal il faudrait le faire.

Je vais vous partager le code et sur github, vous avez mon mail sur github si besoin
Les exemples reste en ligne aussi vous pouvez allez voir d'autres de mes repos parfois on a eu le temps de faire quelques test par exemple...

Vous pouvez aussi trouver ce carnet d'adresse en version Angular v2+

C'est tout pour nous

Bonnes fetes 