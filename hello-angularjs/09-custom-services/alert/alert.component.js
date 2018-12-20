(function () {
  function AlertCtrl(alertService) {
    this.alertService = alertService;
    this.errors = this.alertService.errors; // le meme tableau
  }

  AlertCtrl.$inject = ['alertService'];

  var module = angular.module('alert/alert.component', [
    'alert/alert.service', // pas obligatoire car déjà fait dans app
    // mais si je supprime app un jour, c'est mieux d'avoir le module
    // qui contient le service que je vais injecter ici
  ]);
  module.component('alert', {
    controller: AlertCtrl,
    templateUrl: './alert/alert.component.html',
  });
}());