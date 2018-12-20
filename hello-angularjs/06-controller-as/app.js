(function() {
  /*
    Au lieu de manipuler le scope directement, il faut prendre l'habitude de
    passer par l'objet créer par notre controller ici PrenomCtrl.
    2 intérêts :
    - comme vu précédemment, si on instancie 2 fois une fonction constructeur
    on veut éviter que les méthodes soient dupliquées, (jusqu'ici add est dupliquée,
    puisque définie dans l'objet directement). Il vaudrait mieux définir les
    méthodes sur le prototype.
    - dans Angular v2+, le scope n'existe plus, il faut prendre l'habitude d'utiliser
    autre chose
  */
  var module = angular.module('app.module', []);

  function PrenomCtrl() {
    // idem si on veut supprimer le scope, on peut en passant par l'objet
    // mais l'objet doit etre accessible via le template
    // d'où l'intéret de controllerAs
    this.prenoms = ['Jean', 'Pierre'];
  }

  // si j'écris ça, pour appeler add, il faut que l'objet soit accessible
  // au niveau du template.
  PrenomCtrl.prototype.add = function() {
    this.prenoms.push(this.prenom);
  };

  module.controller('PrenomCtrl', PrenomCtrl);

  module.directive('listPrenoms', function listPrenomsFactory() {
    
    return {
      controller: 'PrenomCtrl',
      controllerAs: '$ctrl', // le nom qu'on donne à la variable sur le template
      // par convention $ctrl car ce sera le nom automatique dans un composant
      templateUrl: 'template.html',
    }
  });

  // Je vais vous partager cet exemple et on va le transformer
  // en composant
}());