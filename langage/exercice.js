// on va faire un petit exercice
// je vais vous partager l'énoncer sur Github

// Jeu du plus ou moins
// 1 - Générer un nombre entier aléatoire
// entre 0 et 100
// -> API Math : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math
// 2 - Demander au joueur de trouver le nombre en indiquant trop grand
// ou trop petit jusqu'à ce qu'il trouve
// je vais écrire le début avec un API de Node.js : Readline
// 3 - Stocker toutes les tentatives précédentes dans un tableau
// et afficher le contenu avant chaque nouvelle tentative
//-> API Array : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array

// ici j'importe un "module" du code JS qui se trouve dans un autre
// fichier (qui a une portée propre)
// dans le navigateur on aura créé une balise script (et la portée aurait été
// globale)
// Ce type de Module s'appelle CommonJS (supporté par Node.js)
// on peut les utiliser dans le navigateurs avec des bibliothèques comme :
// webpack, rollup, parcel, browserify, SystemJS par exemple...
// pour simplifier je ne le ferais dans AngularJS, mais ça peut être le cas
// de vos projets
// il existe une version plus moderne :
// module ECMAScript (apparus en ES6 -> 2015 -> Microsoft Edge minimum, pas IE)
// qui ressemble à ça :
// import readline from 'readline';
// on utilise en général les mêmes bibliothèques pour pouvoir les utiliser
const readline = require('readline');

// const => ES6 (comme var, mais on ne peut pas réaffecter une valeur)

// readline est un API qui permet de lire une ligne
// c'est une abstraction dans le sens où la ligne peut être lue :
// dans un fichier, sur le clavier, sur une socket, dans une chaine de caractères...
// donc il faut le configurer :
const rl = readline.createInterface({
  input: process.stdin, // dans Node process.stdin -> le clavier
  output: process.stdout, // dans Node process.stdout -> le terminal (la console)
});

// avec la méthode question de rl, on peu poser une question :
// arrow function (fonction fléchée) nouveauté de ES6 (pas IE11)
// les nouveautés de ES6 peuvent se transformer en ES5 avec la bibliothèque
// babelJS (on ne le fera pas dans la formation mais vos projets l'utilise peut être)
// () => {} -----> comme function() {}
// remarque arguments n'existe pas dans une fonction fléchée
function jouer() {
  // si le tableau est rempli
  if (essais.length) {
    console.log('Vous avez déjà joué : ' + essais.join(' - '));
    // join -> conversion tableau -> string avec un séparateur au choix
    // plutot qu'une boucle
    // conseil aller lire les doc MDN sur string et array qu'on utilise beaucoup
    // plutot que de réinventer des algos
  }

  rl.question('Quel est le nombre ? ', (reponse) => {
    // ici reponse est de type string, pour convertir en nombre :
    const entierSaisi = Number(reponse);

    essais.push(entierSaisi);

    if (entierSaisi > entierAlea) {
      console.log('Trop Grand');
      return jouer(); // plutot qu'un else on préfère souvent
      // sortir de la fonction pour alléger la suite
    }

    if (entierSaisi < entierAlea) {
      console.log('Trop Petit');
      return jouer(); // plutot qu'un else on préfère souvent
      // sortir de la fonction pour alléger la suite
    }
    
    console.log('Gagné');
    rl.close();
  });
}

const entierAlea = Math.floor(Math.random() * 101);
const essais = [];
jouer();

// le but est de pouvoir rejouer
// le code va s'écrire différent si le callback est synchrone ou asynchrone
// synchrone on peut mettre question dans une boucle
// parce qu'on ne passera pas à la question suivante tant qu'on aura pas répondu
// asynchonre dans une boucle, les questions se posent automatiquement
// sans qu'on ait le temps de répondre
// donc pour attentre, il faut imbriquer les callbacks
// pour savoir si synchrone ou pas, console.log('Fin')
// donc ici callback asynchrone

// comme on ne connait pas le nombre de question
// on va placer question dans une fonction
// en fonction de la réponse soit on appelle cette fonction pour rejouer
// soit rl.close() pour quitter le programme
// CTRL-C pour killer le programme

// on peut penser que le code est récursif mais en fait non


// pile d'appel (de fonction)
// ^
// |
// |                                             question         question
// |                            question         jouer            jouer
// |require - createInterface - jouer    ....... =>       ....... =>
// +---------------------------------------------ENTREE-----------ENTREE--> temps
// sortie           

// après question il n'y a plus de code synchrone
// le callback sera appeler si quelqu'un appuie sur la touche ENTREE
// donc le callback asynchrone fait que le code n'est pas récursif
// meme si en regardant le code on pourrait le penser

// je vous partage le code et à vous de jouer !