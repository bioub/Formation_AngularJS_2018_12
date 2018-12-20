(function() {
  // bonne pratique garder un module JS (pour ne pas créer de conflit de variable)

  // on va écrire dans un fichier JS externe, la complétion sera meilleure
  // angular a sa propre notion de module, proche de celle si dessus
  // mais dans un contexte angular
  // on ne peut plus créer un controller sans créer de module (on pouvait jusqu'à la 1.2)
  
  // un module a besoin d'un nom
  // la méthode module avec 1 seul paramètres va récupérer un module existant
  // avec 2 paramètres elle créé le module
  // pour l'instant on en a jamais créé, donc il faut 2 param
  // 2e param tableau vide pour le moment
  var module = angular.module('app.module', []);

  // pour déclarer un controller on utilise la méthode controller du module
  // cette méthode prendre 2 paramètres
  // un nom (string)
  // une fonction constructeur
  function PrenomCtrl($scope) {
    // pour l'instant pas d'arguments
    // console.log(arguments); // dans un callback on peut récupérer les arguments

    // dans angular on a un conteneur d'injection de dépendances = annuaire d'objet
    // quand on a besoin d'un objet il suffit de le demander à l'annuaire
    // pour ça il faut connaitre son nom
    // par exemple dans un controller on récupérer :
    // - $element: element du DOM sur lequel se trouve le controller
    // - $scope: le scope associé à ce controller
    // si je récupère le scope on pourra créer des variables et des fonctions

    // si le nom demandé à l'injecteur n'existe pas vous aurez l'erreur :
    // Error: [$injector:unpr] Unknown provider: [name]Provider <- [name] <- PrenomCtrl

    // quand une erreur se produit dans Angular (et celle ci n'est pas très claire au début)
    // on a sur le site, une référence des erreurs possible et dans la console
    // un lien est généré vers cette référence
    // parfois ça aide à mieux comprendre

    // ici $scope est l'objet auquel on a accès dans la console
    // avec angular.element($0).scope()
    // c'est un objet JS, on peut ajouter modifier supprimer des clés
    $scope.prenoms = ['Jean', 'Pierre'];
    $scope.add = function() {
      $scope.prenoms.push($scope.prenom);
    }

    $scope.delete = function(i) {
      $scope.prenoms.splice(i, 1); // supprime 1 élément à partir de i
    };
  }

  module.controller('PrenomCtrl', PrenomCtrl); // la fonction est souvent anonyme

  // pour utiliser un controller, on va utiliser la directive ng-controller
  // lui passer le nom du controller et angular saura qu'il doit instancier
  // notre fonction constructeur
  // ici : new PrenomCtrl()
  // quelque part c'est un callback (ce n'est pas nous qui l'appelons)
}());