(function() {
  var module = angular.module('app.module', []);

  function PrenomCtrl($scope) {
    $scope.prenoms = ['Jean', 'Pierre'];
    $scope.add = function() {
      $scope.prenoms.push($scope.prenom);
    }
  }

  module.controller('PrenomCtrl', PrenomCtrl);

  // 2 paramètres : nom + factory function
  // le nom ici doit être en camelCase et pas en spinal-case
  // si plusieurs mot, les séparer par une majuscule
  module.directive('listPrenoms', function listPrenomsFactory() {
    // on voit que la factory est bien appelée.
    // console.log('listPrenomsFactory');
    // cette factory doit retourner un objet qui respecte certaines clés
    // par exemple on peut lui associer un controller et un template
    // c'est mon exemple
    // ` => nouveauté d'ECMAScript 6 (pas IE)
    // c'est pas une apostrophe c'est un backquote
    // ALTGR-7 sur un clavier windows
    // l'intérêt par rapport aux appostrophe : multi-lignes
    // Pour IE11 : 2 options (BabelJS qui transforme en apostrophe sur 1 ligne)
    // de mettre le template dans un fichier externe (on va plutot faire ça)
    return {
      controller: 'PrenomCtrl',
      templateUrl: 'template.html', // relatif au fichier index.html pas à app.js (dans le meme dossier juste son nom)
      /*
      template: `
      <div>
      Prénom : <input ng-model="prenom">
      <button ng-click="add()">+</button>
    </div>
    <p ng-repeat="prenom in prenoms track by $index">
      • {{prenom}}
    </p>
    <p>{{prenoms.length}} prenoms</p>
      `,
      */
    }
  });

  /*
  Maintenant on va créer la directive.
  Pour la créer on utilise la méthode directive d'un module
  (pour l'instant il n'y a qu'un module, mais on en ajoutera d'autre plus tard)
  */
}());