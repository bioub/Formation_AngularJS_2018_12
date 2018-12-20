(function() {
  /*
    Au lieu de manipuler le scope directement, il faut prendre l'habitude de
    passer par l'objet créer par notre controller ici PrenomCtrl.
    2 intérêts :
    - comme vu précédemment, si on instancie 2 fois une fonction constructeur
    on veut éviter que les méthodes soient dupliquées, (jusqu'ici add est dupliquée,
    puisque définie dans l'objet directement). Il vaudrait mieux définir les
    méthodes sur le prototype.
    - dans Angular v2+, le scope n'existe plus, il faut prendre l'habitude d'utiliser
    autre chose
  */

  // ici app.module est notre module principal
  // chargé depuis la directive ng-app (<body ng-app="app.module">)
  // donc AngularJS ne connait que les éléments créé par ce module
  // pour pouvoir en utiliser d'autres, il faut lier le module
  // button-toggle/button-toggle.component à ce module
  // pour cela on utilise le tableau auquel on va passer la liste
  // des modules auquel il est lié :
  // C'est un concept pas évident à comprendre au début.
  // surtout vous risquez d'oublier, si vous voyez qu'un component ne charge pas
  // ou qu'un filtre ou un service vous est indiqué comme inexistant :
  // 1/ vérifier que la balise script est bien présente dans le HTML
  // 2/ vérifier que votre module est bien inclus ici ou via un autre module
  // il faut créer des dépendances entre ces modules avec le tableau
  var module = angular.module('app.module', [
    'button-toggle/button-toggle.component',
  ]);

  function PrenomCtrl() {
    // idem si on veut supprimer le scope, on peut en passant par l'objet
    // mais l'objet doit etre accessible via le template
    // d'où l'intéret de controllerAs
    this.prenoms = ['Jean', 'Pierre'];
  }

  // si j'écris ça, pour appeler add, il faut que l'objet soit accessible
  // au niveau du template.
  PrenomCtrl.prototype.add = function() {
    this.prenoms.push(this.prenom);
  };

  // on a plus besoin de déclarer le controller dans un module
  // module.controller('PrenomCtrl', PrenomCtrl);

  // à la place on va créer un composant :
  // ce n'est plus une factory, mais directement l'objet
  // pourquoi, car on a déjà la possibilité d'injecter des services
  // dans le controller.
  // les propriétés de l'objets sont pour la plupart existante dans une
  // directive, mais il y en a moins.
  // controllerAs est par défaut à $ctrl, pas besoin de le renseigner si c'est le cas
  // C'est ce qui rend une migration vers Angular difficile
  // En AngularJS on a plusieurs architectures possibles, mais il n'en reste
  // qu'une disponible dans Angular (car cela améliore les perfs)
  // Donc si votre appli n'est par architecturée en composant, c'est compliqué
  // L'autre raison est qu'on utilise sous des bibliothèques open-source qui nous
  // fournissent des directives, (car avant 1.5 il n'y avait pas de composant)
  // et donc en plus de migrer l'application elle même il faudra migrer tout les
  // plugins open-source vers un équivalent dans Angular....
  // idéalement si vous créer de nouvelles pages (un composant est une page aussi)
  // créez des composants.
  // vous pouvez tester (en fait c'est bcp plus simple qu'une directive)
  module.component('listPrenoms', {
    controller: PrenomCtrl,
    templateUrl: 'template.html',
  });
  /*
  module.directive('listPrenoms', function listPrenomsFactory() {
    
    return {
      // dans les autres propriétés possibles :
      // compile, la fonction appelée au moment de la compilation
      // comme ng-bind, ng-model...
      // pour le reste voir : https://docs.angularjs.org/guide/directive
      restrict: 'E',
      controller: 'PrenomCtrl',
      controllerAs: '$ctrl', // le nom qu'on donne à la variable sur le template
      // par convention $ctrl car ce sera le nom automatique dans un composant
      templateUrl: 'template.html',
    }
  });
  */

  // Maintenant on va utiliser un composant qui est en réalité une version
  // particulière d'une directive :
  // - sous forme l'élément
  // - avec toujours un controllerAs
  // - avec un scope isolé, ce qui veut dire que vous n'aurez plus accès
  // au scope du dessus (ce qui est le cas dans Angular v2+)
  // il faudra trouver un autre moyen éventuellement de communiquer :
  // - soit par des attributs du composant (on fera un exemple tout a l'heure)
  // ex: je reçois les prénoms du scope du dessus
  // <list-prenoms prenoms="prenoms"></list-prenoms>
  // - soit par des services (on verra tout à l'heure)
  // dans Angular tout est composant ou presque, les directives existent toujours
  // mais ne peuvent plus avoir de template (en général elle permettent)
  // de modifier des propriétés du DOM, ex: les classes

  // Maintenant je vais faire un 2e exemple dans ce même dossier
  // on va créer un composant d'UI réutilisable
  // J'aimerai créer un bouton à 2 états
  // exemple <button>on</button> qui passe à <button>off</button>
  // En fonctionnalités :
  // - A chaque fois que je click sur le bouton, il doit passer d'un état
  // à un autre OK
  // - J'aimerais que l'on puisse configurer les 2 états pour le rendre encore 
  // plus réutilisable (On/Off, Vrai/Faux, Homme/Femme...)
  // -> pour ça, il faut que le composant accepte des attributs en entrée
  // (on ne peut pas passer par le scope du parent, car le scope du composant est
  // isolé)
  // on va utiliser la clé bindings du composant
  // cette clé est un objet dont chaque clé est le nom d'une propriété
  // et dont la valeur peut-être =, @, <, ou &
  // <: one-way data-binding (le parent passe la valeur au composant)
  // @: le parent passe une string au composant
  // &: one-way data-binding (le composant remonte la valeur au parent)
  // =: two-way data-binding (le composant peut remonter la valeur au parent et
  // le parent descendre la valeur comme ng-model)
  // si le nom de l'attribut et de la propriété interne sont différents :
  // on écrite : nomPropInterne: '<nomAttribut'
  // si nomPropInterne: '<', le nom de l'attribut doit etre le meme
  // ex : <button-toggle states="['Vrai', 'Faux']"></button-toggle>
  // - J'aimerais qu'il me remonte l'état dans lequel il se trouve...

  // Pour commencer je vais créer le template dans le dossier button-toggle

}());