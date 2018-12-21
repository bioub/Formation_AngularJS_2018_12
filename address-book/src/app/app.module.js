(function() {
  // dans chaque fichier JS, je crée une portée avec la fonction IIFE
  // ainsi qu'on module angular qui porte le nom du chemin dans app
  // (mettre les dossiers s'il y en a)

  // à chaque fois que j'utilise un module il faut l'inclure
  // soit dans app.module, soit mieux dans le module où je l'utilise
  // (ex: si je sers de button-toggle dans le composant page2, j'inclus
  // le module button-toggle dans le module page2) 
  // on peut tout mettre dans app.module mais :
  // - au bout d'un moment vous allez avoir un tableau ici avec des dizaines
  // voir des centaines de module
  // - ça perd de son intéret puisque si vous avez 2 composants qui ont le meme
  // nom vous ne pourrez pas les utiliser (si 2 composant on le meme nom, je 
  // peux inclure dans page1 un des composant et dans page2 l'autre)
  // ici il faut que j'inclus au moins app.component
  // car dans le fichier index.html on utilise ce composant et on inclus le fichier
  // app.module
  var module = angular.module('app.module', [
    'contacts/contacts.module', // app.module dépends de toutes les pages de contacts
    'ui.router',
    'app.component',
  ]);

  // ui-router comme n'importe quel projet open-source pour AngularJS
  // peut déclarer des services, directives, composants, filtres....
  // (tout ce qu'on a vu jusqu'à maintenant)
  // pour les déclarer il faut le faire dans des modules
  // et donc ici si vous souhaitez utiliser des concepts AngularJS
  // il faut inclure ces modules
  // comme avec contacts.module, pour nous simplifier la vie
  // ui-router déclarer un module qui regroupe tous les autres
  // (sinon il faudrait inclure une dizaine de modules)
  // son nom : ui.router
  // maintenant on va pouvoir déclarer des Routes, c'est à dire
  // des associations entre des URL et des Composants
  // pour ça je dois paramétrer un service de UI-Router qui s'appelle
  // $state (c'est son nom)
  // Hier on a vu comment utiliser des services, mais pas comment les
  // paramétrer, pour le faire, je vais utiliser un Provider
  // un provider est un objet ou fonction qui configure le service du meme nom

  // il faut que j'annote ici (soit avec le tableau soit avec $inject)
  // config permet de paramétrer les provider
  module.config(['$stateProvider', function($stateProvider) {

    // ici je peux créer une Route
    // je connais plus la doc par coeur, donc on va regarder un exemple
    $stateProvider.state({
      name: 'contact-list', // le nom de la route, permet de générer un lien dans un template
      url: '/contact',
      component: 'contactList'
    });

    $stateProvider.state({
      name: 'contact-add',
      url: '/contact/add',
      component: 'contactAdd'
    });

    // il me reste 2 choses à faire :
    // 1 - générer les liens vers ces routes (directive ui-sref)
    // 2 - indiquer où le composant doit s'afficher dans mon HTML (directive ui-view)

  }]);
}());