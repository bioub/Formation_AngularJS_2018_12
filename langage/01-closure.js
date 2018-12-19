// Ici on va parler de concepts souvent méconnus en JS
// et pourtant de plus en plus utilisé (AngularJS, Node.js...)
// il y a une série de livres (en anglais) open-source qui parle de ces sujets :
// https://github.com/getify/You-Dont-Know-JS
// en français il y a un bon article (traduit en français) dans le même esprit 
// dans la doc de Mozilla (MDN)
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Une_r%C3%A9introduction_%C3%A0_JavaScript

// Pour exécuter les exemples :
// node chemin-vers-le-fichier.js

// Le premier : Closure

// En JavaScript contrairement à de nombreux langages, on peut imbriquer des fonctions
// ex :
var variableGlobale = 'g';
function externe(msg) { // ça revient au même, msg est déclaré dans externe
  // var msg = 'msg'; // pour interne dans la portée de closure
  function interne() {
    // portée locale
    console.log('msg', msg); // ici msg existe
    // dans un sens interne n'existe pas à l'extérieur
    // dans l'autre sens tout ce qui est déclaré à l'extérieur existe
    // dans interne
    // notamment la portée définie par externe pour interne
    // s'appelle une closure
  }

  // si j'appelle interne ici (interne existe ici)
  // il aura accès à msg
  interne();
}

externe('Hello');
// interne n'existe que dans externe (sa portée est la fonction externe)
console.log('typeof interne', typeof interne); // undefined

// en terme de pile d'appel ici on est sous le schema suivant :

// pile d'appel (de fonction)
// ^
// |
// |
// |interne
// |externe
// +---------------------------> temps

// quand interne est appelée, on est toujours dans externe
// donc on peut trouver normal que msg existe