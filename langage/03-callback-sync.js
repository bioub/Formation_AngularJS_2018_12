// dans ce chapitre on va parler de callback
// en particulier de callback synchrone (on verra asynchrone juste après)

// Depuis ECMAScript 5 (norme sur laquelle se base JS)
// ES5 sorti en 2009 (il faut attendre Internet Explorer 9)
// en ES5 on trouve des nouvelles syntaxes et des nouveaux API (méthodes, classes...)

// exemple de nouvelle syntaxe
var nbs = [
  3,
  4,
  5, // on a le droit depuis ES5 de finir par une virgule
];

// exemple de nouvel API ES5
// on peut boucler sur un tableau avec la méthode forEach :
nbs.forEach(function (nb, i, tab) { // on peut lui donner un nom ou pas
  console.log(nb); // on peut deviner souvent à partir de arguments
  // qui ils sont
});

console.log('cb', typeof cb); // undefined, ici ce nom n'existe pas (donc c'est pareil)
// sauf dans les outils de dév ou le nom s'affiche

// justement la fonction passée en entrée de forEach s'appelle un callback
// c'est une fonction qu'on a déclaré, mais nous ne l'avons pas appelée directement
// c'est JS qui l'a appelée à notre place, pour chaque élément du tableau

// ça veut dire, qu'on ne choisi pas les valeurs passé au callback,
// on peut juste déclarer des arguments pour les récupérer
// si vous ne connaissez pas les valeurs passées, 2 options :
// - la doc (MDN) Array.prototype.forEach() (on va parler de prototype au prochain chapitre)
// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/forEach
// - l'ensemble des valeurs passé à une fonction sont accessible dans la
// pseudo-variable (variable créé lors de l'appel) : arguments

// En programmation: synchrone veut dire tout de suite
// asynchrone veut dire plus tard

// Pour savoir si un callback est synchrone ou non
// on peut faire un console.log à l'intérieur mais aussi après
// si le console.log d'après s'éxécute après, le callback est synchrone
// sinon il est asynchrone

// forEach est apparu en ES5, pour permettre d'implémenter
// de la programmation fonctionnelle (des fonctions remplacent)
// des boucles, if... pour créer des algos, ex :

// on va afficher le carré des nombres pairs du tableau
nbs
  .filter(function cb(nb) {
    return nb % 2 === 0; // filtre si pair
  })
  .map(function cb(nb) {
    return nb * nb; // transforme au carré
  })
  .forEach(function cb(nb) {
    console.log('carré pair', nb);
  })

// c'est juste un style de programmation
// on aura pu écrire la même autrement
// mais avec un peu d'habitude c'est plutot lisible
// quand on sait que filter => filtrer et map => transformer
// tous ces callbacks sont synchrones, on veut qu'il soit appelés tout de suite
// donc dans l'ordre

// schema :


// pile d'appel (de fonction)
// ^
// |
// |                     log
// |cb - cb - cb   cb    cb
// |filter       - map - forEach
// +-------------------------------> temps
// sortie :              16

// le callback synchrone est appelé par la fonction à laquelle vous l'avez passé
// à la différence des callbacks asynchrones...