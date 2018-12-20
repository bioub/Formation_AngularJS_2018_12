// pour éviter les conflits avec d'autres fichiers
// il nous faut un module, par exemple IIFE
// dans d'autres systèmes de modules (on a déjà vu hier CommonJS)
// on aurait pas à inclure la balise script, mais ici oui.
(function() {

  // surtout si je créé une variable module
  // les modules AngularJS permettent :
  // - qu'on ait pas à se soucier de l'ordre des balises scripts
  // - qu'on puisse avoir 2 composants/directives/filtres... avec le même nom, 
  // qui soit utilisés à 2 endroits différents
  // exemple un filtre reverse utilisé dans un composant
  // un autre filtre reverse utilsé dans un autre
  // pour cela, il faut plusieurs modules
  // par convention je vais nommer mon module comme le chemin vers le fichier
  // JS (plus facile de s'en souvenir)
  // toujours le tableau car je suis en train de le créer.
  var module = angular.module('button-toggle/button-toggle.component', []);

  function ButtonToggleCtrl() {
    // ici on recoit les valeurs du dessus
  }

  // le but c'est qu'on puisse cliquer et changer de valeur
  // au dernier index on revient à zéro avec le modulo %
  // attention à la priorité des opérateurs
  ButtonToggleCtrl.prototype.toggle = function() {
    var currentIndex = this.states.indexOf(this.state);
    var nextIndex = (currentIndex + 1) % this.states.length;
    this.state = this.states[nextIndex];
  };

  // pour les valeurs par défaut, on va créer une méthode $onInit()
  // qui sera appelé une fois le composant initialisé
  // (le constructeur appelé et les bindings initiaux effectués)
  ButtonToggleCtrl.prototype.$onInit = function() {
    this.states =  this.states || ['On', 'Off']; // on les remplace si elle n'existe pas
    this.state = this.state || this.states[0]; // pas l'indice, c'est la valeur
  };

  module.component('buttonToggle', {
    controller: ButtonToggleCtrl,
    templateUrl: './button-toggle/button-toggle.component.html',
    // toujours relatif au fichier index.html et pas à ce fichier JS
    // dans Angular V2+ c'est relatif au fichier JS/TS.
    bindings: {
      states: '<', // nous permet de recevoir une valeur en entrée
      // ex: <button-toggle states="uneVariable"></button-toggle>
      // et de surveille les changement de uneVariable avec un watcher
      // @ ça veut dire que je passe la chaine de caractère et pas l'expression
      // ici le tableau ou la variable, on pourrait l'utiliser pour la valeur
      // par défaut de state
      // state: '@',
      // si je veux changer son nom, ex: selected
      // <button-toggle states="['Vrai', 'Faux']" selected="Faux"></button-toggle>
      // state: '@selected',
      // pour finir ce matin, j'aimerai remonter la valeur selectionné au parent
      // pour ça, le parent doit obligatoirement me fournir une variable
      state: '=selected',
      // on voit que ça rend selected obligatoire (car ce doit etre une variable)
      // mais je peux combiner avec une autre variable comme defaultState...
      // on va déjeuner ! On reprend à 14h15-20
    } 
  })
}());