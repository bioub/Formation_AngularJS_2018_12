(function() {
  
  var module = angular.module('app.module', [

  ]);

  // Précédemment on avait utilisé l'injecteur
  // pour récupérer le scope du controlleur
  // pour cela, il suffisait de déclarer un paramètres
  // $scope, et l'injecteur d'AngularJS nous le transmet
  // dans cette variables car il sait ce que cela signifie.

  // Pour un controlleur, on peut également demandé : $element
  // l'objet jQuery ou JQLite qui correspond à la balise HTML sur
  // laquelle on a mis ng-controller.

  // On peut également demander un service, c'est à dire un objet ou une
  // fonction qui a été ajouté à l'injecteur (annuaire) d'AngularJS
  // on peut connaitre les services dans la doc d'API
  // tout ces services sont injectable, ex : $interval
  function PrenomCtrl($interval, $rootScope, $scope, $http, $q) {
    // $http, permet de faire des requetes vers le serveur
    // et de relancer la détection de changement une fois la reponse reçu
    // il vaut mieux $http que XMLHttpRequest ou jQuery.ajax ou fetch ou axios...

    // pour faire une requete, on utilise
    // $http.get(); // pour une requete GET, idem pour POST, DELETE, HEAD
    // $http.post();
    // $http.delete(); //...

    $http.get('https://jsonplaceholder.typicode.com/users')
      .then(function(res) {
        // ici il faut que je transforme, res.data qui est un tableau
        // d'objet, en un tableau de string
        // rappelez vous de la fonction map
        $ctrl.prenoms = res.data.map(function(user) {
          return user.name;
        });
      });


    // si vous voulez utiliser Promise.all, le mieux c'est via
    // $q.all() qui sera compatible IE11
    // ex :
    /*
    $q.all([
      $http.get('https://jsonplaceholder.typicode.com/users'),
      $http.get('https://jsonplaceholder.typicode.com/todos'),
    ]).then(function (responses) {
      var users = responses[0].data;
      var todos = responses[1].data;
      console.log(users);
      console.log(todos);
      // on pourrait fusionner les 2
    });
    */

    // pour finir aujourd'hui on va créer nos propres services.
    // ça a plusieurs intérets, avoir des fonctionnalités accessible
    // via angular en factorisant ce code mais aussi pouvoir communiquer
    // entre 2 composants sans passer par le scope
    // je vais créer un service, car je trouve que recupérer la liste de mes
    // prénoms est trop compliqué, je dois connaitre l'URL, je dois eventuellement
    // gérer les erreurs, et je dois transformer la réponse, je pourrais faire tout
    // ça dans un service.
    // autre intérêt, si je met $http dans ce service, le jour ou j'ai besoin d'accéder
    // à mes données différemment, il faut juste que je réécrive un nouveau
    // service avec les memes methodes.
    // Alors que la je dois modifier chaque composant, donc ça simplifierait une
    // migration (par exemple vers des WebSockets, ou GraphQL qui sont à la mode
    // en ce moment à la place d'Ajax)
    // on va le faire dans un nouveau dossier.

    // $interval : le même API que setInterval
    // va appeler le callback asynchrone toutes les secondes (via l'event loop)
    // en plus de setInterval, il va exécuter le dirty checking juste après
    // le callback (car dans la fonction vous allez peut etre modifier le scope,
    // il faut donc réexécuter les watchers).
  
    // Pour les mêmes raisons, vous devriez plutôt privilégier :
    // $document à document,
    // $window à window,
    // $timeout à setTimeout
    // $log à console.log
    // $location à location (changement de page...)

    // on sauvegarde this dans la variable $ctrl pour les callback async
    var $ctrl = this;
    $ctrl.now = new Date(); // donne l'heure tout de suite

    // cet exemple ne fonctionnerait par avec setInterval
    // car il faut relancer les watchers après $ctrl.now qui a été modifié
    // éventuellement on peut relancer les watchers (c'est à dire la 
    // détection de changement) via $scope.$digest(); ou $rootScope.$digest()
    // sur le scope en cours ou l'ensemble de l'app
    // ici on peut demander $rootScope à l'injecteur
    //setInterval(function() {
    $interval(function() {
      // attention this ici === Timer
      $ctrl.now = new Date(); // horloge
      //$rootScope.$digest(); // ici tous les watchers sont lancés, y compris
      // ceux en dehors du composant, sinon utiliser $scope.$digest();
      // mais le plus simple dans notre $interval
    }, 1000);

    // on peut aussi surveiller des changements depuis le JS
    // plutot que dans le template
    // pour les tableaux $watchCollection
    // pour les autres variables $watch (il faudrait créer un nouveau
    // tableau avec $watch, et pas mettre à jour le tableau existant)
    $scope.$watchCollection('$ctrl.prenoms', function() {
      console.log('changement dans le tableau');
    });

    this.prenoms = ['Jean', 'Pierre'];
  }

  PrenomCtrl.prototype.add = function() {
    this.prenoms.push(this.prenom);
  };

  module.component('listPrenoms', {
    controller: PrenomCtrl,
    templateUrl: 'template.html',
  });
  
}());