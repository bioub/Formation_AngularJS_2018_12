(function() {
  var module = angular.module('app.module', []);
  
  function PrenomCtrl($scope) {
    $scope.prenoms = ['Jean', 'Pierre', 'Paul', 'Romain', 'Vincent', 'Jacques'];
  }

  module.controller('PrenomCtrl', PrenomCtrl);

}());