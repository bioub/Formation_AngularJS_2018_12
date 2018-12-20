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
  function PrenomCtrl($interval, $rootScope, $scope, $http) {
    // $http, permet de faire des requetes vers le serveur
    // et de relancer la détection de changement une fois la reponse reçu
    // il vaut mieux $http que XMLHttpRequest ou jQuery.ajax ou fetch ou axios...

    // à nouveau il faut que je fasse un point langage

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