(function() {

  var module = angular.module('contacts/contact.service', []);

  function ContactService($http) {
    this.$http = $http;
  }

  ContactService.prototype.getAll = function() {
    return this.$http.get('https://jsonplaceholder.typicode.com/users')
      .then(function(res) {
        // comme ça dans le controller j'aurais directement la liste
        // ça simplifie le controller
        return res.data; 
      });
  };

  ContactService.prototype.getById = function(id) {
    // presque pareil, on ajoute juste /id au bout de l'URL
    return this.$http.get('https://jsonplaceholder.typicode.com/users/' + id)
    .then(function(res) {
      // comme ça dans le controller j'aurais directement la liste
      // ça simplifie le controller
      return res.data; 
    });
  };

  ContactService.prototype.create = function(contact) {
    // ici on utilise la méthode post (et non pas get)
    return this.$http.post('https://jsonplaceholder.typicode.com/users', contact);
  }

  ContactService.$inject = ['$http'];

  module.service('contactService', ContactService);
}());
