(function() {

  var module = angular.module('contacts/contact.service', []);

  function ContactService($http) {
    this.$http = $http;
  }

  ContactService.prototype.getAll = function() {
    return this.$http.get('https://jsonplaceholder.typicode.com/users')
      .then(function(res) {
        return res.data; // comme ça dans le controller j'aurais directement la liste
      });
  };

  ContactService.$inject = ['$http'];

  module.service('contactService', ContactService);
}());

// on va aller déjeuner on reprend à 14h
// on finira avant 17h je pense (on a presque fini)