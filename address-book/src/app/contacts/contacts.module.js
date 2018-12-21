(function() {
  // ce module contacts.module
  // sert à regrouper toutes les pages contacts
  // de telle sorte que je n'inclus que ce module dans app.module
  // (plutot que toutes les pages)

  // ça fait beaucoup de fichier, dans Angular on a un programme
  // en ligne de commande qui les génères, exemple :
  // ng generate component contacts/contact-list (va créer les 2 fichiers
  // et inclure le composant dans contacts/contacts.module)
  // malheureusement on n'a pas ça pour AngularJS

  // toutes ces étapes sont un peu lourdes, mais c'est toujours pareil
  // - créer le module
  // - inclure le script
  // - dépendre du module depuis un autre module (qui sera lui meme inclus
  // directement ou indirectement dans app.module)
  var module = angular.module('contacts/contacts.module', [
    'contacts/contact-list/contact-list.component',
    'contacts/contact-add/contact-add.component',
    'contacts/contact-show/contact-show.component',
    'contacts/contact.service',
  ]);
}());