(function () {
  function AlertService($timeout) {
    this.errors = [];
    this.$timeout = $timeout;
  }

  AlertService.prototype.addError = function(msg) {
    var _this = this;
    this.errors.push(msg);
    // je vais ajouter le fait qu'il s'autosupprime au bout de 5 secondes
    this.$timeout(function() {
      var i = _this.errors.indexOf(msg);
      _this.errors.splice(i, 1);
    }, 5000);
  }

  AlertService.$inject = ['$timeout'];

  var module = angular.module('alert/alert.service', []);
  module.service('alertService', AlertService);
}());

// voilà pour aujourd'hui
// donc on a vu les principaux concepts
// demain on va créer une Single Page Application
// et je vous donnerai plus d'exercice