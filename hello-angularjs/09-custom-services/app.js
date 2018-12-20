(function() {
  
  var module = angular.module('app.module', [
    'alert/alert.component',
    'alert/alert.service',
  ]);

  // il y a un point important.
  // souvent le code JS est minifié
  // dans du code minifier, on supprimer les espaces, on simplifie des syntaxes
  // quand c'est possible et on renomme les variables avec des noms plus courts.
  // le problème c'est que si je minifie mon code ici je vais renommer les services
  // demandés, on peut alors "annoter" nos services, plusieurs façon :
  // - soit au moment ou j'enregistre le controller/service
  // pour cela on enregistre un tableau plutot que la fonction directement
  // le dernier élément est notre fonction, les éléments précédent le nom des paramètres
  // dans le meme ordre sous forme de string, qui ne sera pas minifiée
  // module.component('listPrenoms', {
  //  controller: ['$http', '$q', PrenomCtrl],
  //  templateUrl: 'template.html',
  // });
  // - soit juste après avoir déclarer le controller
  // - soit automatiquement avec ng-annotation (script en ligne de commande à installer
  // avec npm)
  // en génénal on voit des exemples dans le 1e style

  // je préfère le 2e

  //function PrenomCtrl(a, b) { // ici a recevra $http, b -> $q
  function PrenomCtrl(contactService) { // ici a recevra $http, b -> $q
    var $ctrl = this; // plus lisible si au début du controlleur
    this.prenoms = [];

    // avec mon service, le controller est bcp plus simple
    // aussi si un autre controller à besoin des prenoms
    // c'est factorisé
    // dernier point, les services sont des singletons
    // ça veut dire que si 2 controlleurs demande le meme services
    // l'objet n'est créé qu'une seule fois et partagé entre les 2
    // on n'aura pas 2 objet contactService
    // donc on pourrait utiliser le service pour échanger des infos
    // créer une clé d'un coté et la recupérer de l'autre

    // je peux faire un exemple pour finir
    // je vais créer un service pour afficher mes erreurs
    // sur la page

    // dans l'idéal, ce concept pourrait etre réutiliser sur d'autres sites
    // j'ai interet à en faire un module avec un composant (comme button-toggle)
    contactService.getPrenoms().then(function(prenoms) {
      // this n'est pas celui qu'on pense
      $ctrl.prenoms = prenoms;
    });
  }

  PrenomCtrl.prototype.add = function() {
    this.prenoms.push(this.prenom);
  };

  // je trouve ça plus simple que de le faire dans la création du composant
  // le risque dans les 2 cas, c'est d'oublier
  // si vous oubliez, vous n'aurez le problème que dans la version minifiée
  // qui est compliquée à debugguer...
  // pour éviter ça, ng-annotate est une bonne option si vous obliger à builder
  // sinon on peut activer le "strict-di" (injection de dépendance strict)
  // au moment du ng-app avec ng-strict-di
  // c'est une bonne pratique pour éviter d'oublier mais aussi parce que
  // ça améliore les perfs, sinon AngularJS doit déterminer le nom des variables
  // par introspection (peu performant) alors que la il sait où les trouver
  // (dans ce tableau)
  PrenomCtrl.$inject = ['contactService']; // penser à annoter surtout avec strict-di

  module.component('listPrenoms', {
    controller: PrenomCtrl,
    templateUrl: 'template.html',
  });

  // on va créer notre service (je le fais dans le meme fichier)
  // mais si on le fait dans un autre, pensez à créer un module
  // et le charger comme avec buttonToggle (on fera des exercices demain)

  // pour créer un service je peux utiliser 3 méthodes
  // module.service si je veux enregistrer une fonction constructeur
  function ContactService($http, alertService) {
    this.$http = $http; // il faut mettre $http dans l'objet si vous souhaitez
    // y avoir accès dans une autre méthode
    this.alertService = alertService;
  }
  ContactService.prototype.getPrenoms = function() {
    // si je me trompe d'URL ou que le serveur tombe
    // on va ajouter une erreur au service
    var _this = this;
    return this.$http.get('https://jsonplaceholder.typicode.com/dfkjkjdg')
      .then(function(res) {
        // ici il faut que je transforme, res.data qui est un tableau
        // d'objet, en un tableau de string
        // rappelez vous de la fonction map
        return res.data.map(function(user) {
          return user.name;
        });
      })
      .catch(function(res) {
        // le service me permet bien de communique entre ce composant
        // et le composant d'alert
        _this.alertService.addError('Erreur avec le serveur');
      })
  }

  ContactService.$inject = ['$http', 'alertService']; // il faut annoter $http
  module.service('contactService', ContactService)
  
  // module.factory si je veux enregistrer une fonction factory
  // l'avantage d'une factory est qu'on peut injecter des chose
  // il faudra aussi annoter (ici dans le style 1)
  /*
  module.factory('contactService', ['urlServeur', function(urlServeur) {
    return {
      getPrenoms: function() {
        console.log(urlServeur.contacts);
      }
    }
  }]);
  */

  // module.value si je veux enregistrer une valeur directement comme un object literal 
  // value pourrait être mes URL
  // ex:
  /*
  module.value('urlServeur', {
    'contacts': 'https://jsonplaceholder.typicode.com/users',
    'todos': 'https://jsonplaceholder.typicode.com/todos',
  });
  */
}());