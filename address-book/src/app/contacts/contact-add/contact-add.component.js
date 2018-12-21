(function() {
  var module = angular.module('contacts/contact-add/contact-add.component', []);

  function ContactAddCtrl() {

  }

  module.component('contactAdd', {
    controller: ContactAddCtrl,
    // c'est plus simple dans Angular car relatif à ce fichier :
    // templateUrl: 'contact-add.component.html'
    templateUrl: 'app/contacts/contact-add/contact-add.component.html', // relatif à index.html
  })
}());