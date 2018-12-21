(function() {
  // on va donc copier/coller souvent
  var module = angular.module('app.component', []);

  // maintenant on va écrire le composant app

  function AppCtrl() {

  }

  module.component('appRoot', {
    controller: AppCtrl,
    templateUrl: 'app/app.component.html', // relatif à index.html
  })
}());