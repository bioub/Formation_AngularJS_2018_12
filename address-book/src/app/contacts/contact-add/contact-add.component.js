(function() {
  var module = angular.module('contacts/contact-add/contact-add.component', []);

  function ContactAddCtrl(contactService, $state) {
    this.contactService = contactService;
    this.$state = $state;
    // il faut que je mette les services dans l'objet si je veux y accéder
    // dans une autre méthode
  }

  ContactAddCtrl.prototype.add = function() {
    // ici normalement vous savez faire, je vais ajouter une méthode
    // au service et je vais appeler cette méthode.
    // Par contre le serveur que j'utilise jsonplaceholder.typicode.com/users
    // n'accepter pas les écritures (sinon ça serait le bazard)
    // mais ils ont quand meme développées les URLs, on aura le bon retour HTTP
    // mais sans que le contact soit créé.
    // il faut que j'injecte le service, on va également inject $state pour
    // la redirection
    var $ctrl = this;
    this.contactService.create(this.contact).then(function() {
      // si tout se passe bien on redirige vers la liste
      $ctrl.$state.go('contact-list');
    });
  };
  // PENSEZ A ANNOTER
  ContactAddCtrl.$inject = ['contactService', '$state'];

  module.component('contactAdd', {
    controller: ContactAddCtrl,
    // c'est plus simple dans Angular car relatif à ce fichier :
    // templateUrl: 'contact-add.component.html'
    templateUrl: 'app/contacts/contact-add/contact-add.component.html', // relatif à index.html
  })
}());