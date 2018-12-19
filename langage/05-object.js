// Dernier chapitre de la matinée
// Programmation Orientée Objet en JavaScript

// Petite Histoire
// JavaScript a été créé en 95 par Netscape qui voulait qu'on puisse 
// exécuter du code dans le navigateur
// Netscape fait 2 choses pour ça :
// 1/ un partenariat avec Sun Microsystems pour qu'on puisse exécuter
// du Java sous la forme d'applet
// 2/ créer un langage JavaScript qui va accompagner Java pour des scripts
// simple (ex: valider un formulaire)

// à l'époque: Java pour le code industriel (application)
// JavaScript pour les cas simples

// JavaScript n'a pas été conçu pour créer des applications
// mais a évolué avec les années et maintenant on l'utilise pour ça

// à cause du parteneriat avec Sun, le modèle objet de JavaScript est différent
// de Java car Sun ne voulait pas que JavaScript lui prenne des parts de marché

// en réalité le modèle objet en JS est un système clé/valeur
// équivalent dans d'autres langages :
// Map, Hashtable, dict, struct, associative array...

// Par rapport à Java le modèle est dynamique
// on peut ajouter, modifier, supprimer des propriétés une fois l'objet créé
// en Java le modèle est statique, il faut créer une classe en amont
// et y décrire toutes les propriétés et méthodes ce qui garanti leur existence
// une fois l'objet créé

// autre différence, en JS de nombreux objets sont pré-instanciés
// (pas besoin de savoir les créer)

// Dans le language
console.log('typeof Math', typeof Math); // object
console.log('typeof JSON', typeof JSON); // object

// Dans Node.js
console.log('typeof process', typeof process); // object (dans Node.js, undefined sinon)
console.log('typeof exports', typeof exports); // object (dans Node.js, undefined sinon)

// Dans le navigateur (les API Web)
console.log('typeof document', typeof document); // object (dans le navigateur, undefined sinon)
console.log('typeof window', typeof window); // object (dans le navigateur, undefined sinon)

// Parfois les objets existent dans Node et le navigateur
console.log('typeof console', typeof console); // object

// Comme dis plus haut les objets sont des systèmes clé/valeur
// qu'on peut modifier, ex

console.log('Math.sum', Math.sum); // undefined
// Math.sum n'existe pas, nous allons la créer

Math.sum = function(a, b) {
  return a + b;
};
console.log('Math.sum', Math.sum); // function
console.log('Math.sum(1, 2)', Math.sum(1, 2)); // 3

// attention, c'est considéré comme une mauvaise pratique d'étendre les objets
// existant, car ils sont globaux (ça revient à créer une fonction globale)
// donc risque de conflit
// et aussi parce que les autres développeurs risque de penser que sum existe
// et enfin parce que peut-être qu'un jour la norme va évoluer et introduire
// une méthode sum et ce jour là on risque des conflits...
// pour la petite histoire c'est arrivé récemment avec la méthode flatten sur les
// tableau (qui applati les tableaux imbriqués)
// Mootools qui est un bibliothèque un peu ancienne (génération de jQuery)
// avait créé sa méthode flatten, quand la norme a voulu la créer
// ça a introduit des bugs sur les sites qui utilisait Mootools
// finalement la norme a décidé de renommer la méthode flat pour éviter les conflits

// on peut modifier des clés :
Math.sum = function(a, b) {
  return Number(a) + Number(b); // attention au +, qui fait la concaténation
  // ou l'addition, mais priorité à la concaténation s'il y a au moins une
  // chaine de caractère dans l'expression
};
console.log('Math.sum(1, 2)', Math.sum("1", "2")); // 3

// on peut aussi supprimer les clés
delete Math.sum;
console.log('Math.sum', Math.sum); // undefined

// donc l'objet est bien un système complètement dynamique

// ensuite on va pouvoir créer nos propres objets de 3 façons
// (important pour AngularJS)

// 1 - syntaxe object literal
const coords = {
  x: 10,
  y: 20,
};

console.log('coords.x', coords.x); // 10

// utiliser object litéral :
// - si l'objet est très simple à créer (comme des coordonnées)
// - ou si l'objet n'est créé qu'une seule fois (comme Math)
// (pas de raison d'avoir plusieurs objets Math)

// autre exemple (pas de raison de créer 2 objets random)
const random = {
  getInt: function(min, max) {
    return Math.floor(Math.random() * max - min + 1) + min;
  }
};

console.log('random.getInt(0, 100)', random.getInt(0, 100));


// 2 - factory function (fonction qui retourne un objet)

// ici coords3DFactory va créer des coordonnées mais mettre des valeurs
// par défaut à x, y, z si on ne les renseigne pas
function coords3DFactory(x, y, z) {
  return {
    x: x || 0,
    y: y || 0,
    z: z || 0,
  };
}

const coords3d = coords3DFactory();
console.log('coords3d.z', coords3d.z); // 0

// utiliser factory function :
// - si l'objet nécessite du code pour etre créé (ici les valeurs par défaut)
// - s'il n'y a pas de méthodes, ou alors s'il y a des méthodes que l'objet
// ne soit créé qu'un seule fois

// pourquoi pas de méthode si l'objet est créé plusieurs fois :
function createContact(prenom) {
  return {
    prenom: prenom,
    hello: function() {
      return 'Bonjour je m\'appelle ' + this.prenom;
    }
  }
}

const romain = createContact('Romain');
console.log('romain.hello()', romain.hello()); // Bonjour je m'appelle Romain
const vincent = createContact('Vincent');
console.log('vincent.hello()', vincent.hello()); // Bonjour je m'appelle Vincent

// rappelez vous que les fonctions sont des objets (ex avec interne on l'ont
// retournait la référence de l'objet)
// si on a 2 fonctions qui font la même chose, il faudrait ne créer en mémoire
// qu'un seul objet
// ici on en a créé 2, pour le vérifier on n'a qu'à comparer leur références
// si elles sont différentes -> 2 objets
// le jour où je créé 1000 contacts, je créé 1000 objets hello
// alors qu'il en suffit d'un seul (et donc je dégrade les perfs)
console.log(
  'romain.hello === vincent.hello',
  romain.hello === vincent.hello
); // false



// 2 - constructor function (fonction qui créé un objet avec new)
// ressemblent à l'utilisation à des classes

function Contact(prenom) {
  // this dans le contexte de l'appel const jean = new Contact('Jean');
  // est égal à jean
  // on a vu qu'on pouvait ajouter des clés à un objet
  // on va ajouter des clés à this pour créer des propriétés
  this.prenom = prenom; // on créé dynamique la propriété
  // c'est bien dynamique parce qu'on est dans une fonction
  // j'aurais pu la créer dans un if (elle pourrait ne pas exister)

  // si on place les méthodes ici, elles seront dupliquées
}

// pour les méthodes, le langage prévoit qu'on puisse les définir
// dans le "prototype" (vu dans la doc de MDN)
// la méthode ici est créé une seule fois
Contact.prototype.hello = function() {
  return 'Bonjour je m\'appelle ' + this.prenom;
};

// exemple d'utilisation
// si je met l'opérateur new devant l'appel d'une fonction
// j'obtiens un objet
const jean = new Contact('Jean');
console.log('typeof jean', typeof jean); // object

// précédemment on a vu la pseudo variable arguments
// (créée au moment de l'appel de la fonction)
// mainteant on va utiliser une autre pseudo variable : this
// this comme en Java est la référence interne de l'objet

console.log('jean.prenom', jean.prenom); // Jean

// l'opérateur .
// regarde d'abord dans l'objet si la clé existe (c'est le cas pour prénom)
// sinon elle regarde dans le prototype de la fonction constructeur (ce qui est
// le cas pour hello)
// sinon elle regarde dans le prototype des fonctions constructeurs parent
// (comme de l'héritage en Java) et comme en Java tous les objets héritent
// du prototype de Object (ex: hasOwnProperty)
// sinon elle est undefined
console.log('jean.hello()', jean.hello()); // Bonjour je m'appelle Jean

// avec . on ne peut pas savoir si la clé vient de l'objet ou du prototype
// mais on peut utiliser hasOwnProperty pour savoir
console.log('jean.hasOwnProperty("prenom")', jean.hasOwnProperty("prenom")); // true
console.log('jean.hasOwnProperty("hello")', jean.hasOwnProperty("hello")); // false

// 2 dernier points :
// on a un autre opérateur que . pour accéder aux clés
console.log(Math.PI);
console['log'](Math['PI']);

// [], a l'avantage de pouvoir récupérer la clé à partir d'une expression
const prop = 'PI';
console.log(Math[prop]);

// on peut boucler sur les clés avec la boucle for .. in
for (var key in coords) {
  // clé
  console.log('key', key);
  // valeur
  console.log('coords[key]', coords[key]); 
}


// utiliser constructor function :
// - s'il y a des méthodes dans des objets multi-instanciés
// - si vous avez besoin d'identifier le type de l'objet
// comme en Java

console.log(
  'jean instanceof Contact',
  jean instanceof Contact)
; // true

console.log(
  'jean instanceof Object',
  jean instanceof Object)
; // true

// on va aller déjeuner !
// on reprend à 14h30 