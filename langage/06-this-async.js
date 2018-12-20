function Contact(prenom) {
  this.prenom = prenom;
}

Contact.prototype.hello = function() {
  console.log('SYNC Bonjour je m\'appelle ' + this.prenom);
};

Contact.prototype.helloAsync = function() {
  var _this = this;
  setTimeout(function () {
    // dans la version asynchrone this.prenom === undefined
    // pk ???? parce que ce n'est pas nous qui appelons la fonction
    // donc elle n'est pas appelée sur l'objet romain

    // que vaut this alors ?
    // console.log(this); une instance d'une fonction Timeout et pas Contact
    // comment retrouver romain alors ???
    // solution 1: remarquer qu'on a un Closure ici
    // et que les closures nous permettent de sauvegarder des valeurs qui 
    // changent dans le temps (exemple avec la boucle et le setTimeout i)
    console.log('ASYNC Bonjour je m\'appelle ' + _this.prenom);
    // solution 2: nouveauté de ES5 (pas IE8, mais AngularJS 1.3+ non plus)
    // utiliser la méthode bind d'une fonction (une fonction est un objet avec
    // des méthodes, meme si ça peut sembler currieux)
    // bind créé une closure en interne pour sauvegarder this
    // solution 3: nouveauté de ES6 (pas IE11, il faut attendre Edge chez MS
    // mais possible d'utiliser BabelJS en attendant)
    // utiliser les fonction fléchées pour les callbacks :
    // () => {}
    // car les fonctions fléchées ne créent pas les pseudo-variables
    // this et arguments
    // donc vous aurez la valeur de this de la fonction du dessus.
    // console.log('ASYNC Bonjour je m\'appelle ' + this.prenom);
    
    // je vais utiliser la solution 1 dans la suite (car plus compatible)
  }, 1000);
};

var romain = new Contact('Romain');
romain.hello(); // ici la méthode est 100% synchrone
romain.helloAsync(); // ici la méthode appel du code asynchrone