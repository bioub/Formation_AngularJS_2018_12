(function() {
  var module = angular.module('contacts/contact-show/contact-show.component', []);

  
  function ContactShowCtrl($state, contactService) {
    var $ctrl = this;
    // on pourrait créer une méthode getById(), lui passer l'id
    // et qu'elle nous retourne la promesse d'un contact
    contactService.getById($state.params.contactId).then(function(contact) {
      $ctrl.contact = contact;
    });
  }

  ContactShowCtrl.$inject = ['$state', 'contactService'];

  module.component('contactShow', {
    controller: ContactShowCtrl,
    templateUrl: 'app/contacts/contact-show/contact-show.component.html',
  })
}());