(function() {
  var module = angular.module('contacts/contact-list/contact-list.component', []);

  function ContactListCtrl(contactService) {
    var $ctrl = this;
    contactService.getAll().then(function(contacts) {
      $ctrl.contacts = contacts;
    });
  }

  ContactListCtrl.$inject = ['contactService'];
  // pour tester
  // on peut mettre un titre dans le template des pages
  // et les inclures dans app.component

  module.component('contactList', {
    controller: ContactListCtrl,
    templateUrl: 'app/contacts/contact-list/contact-list.component.html', // relatif à index.html
  })
}());