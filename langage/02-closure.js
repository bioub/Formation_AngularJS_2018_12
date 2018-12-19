// on va écrire un 2e exemple avec une closure
// où interne sera appelée en dehors de externe

function externe(msg) {
  function interne() {
    console.log('msg', msg);
  }
  return interne; // une fonction en JS est un objet
  // ici on retourne la référence de l'objet
}

const hello = externe('hello'); // ici hello, est le nom extérieur donné à interne
hello(); // donc on peut appeler interne ici en passant par hello

// en terme de pile d'appel ici on est sous le schema suivant :

// pile d'appel (de fonction)
// ^
// |
// |
// |
// |externe - interne
// +---------------------------> temps

// quand interne est appelée, on est plus dans externe
// plusieurs façon de faire (le plus simple, retourner interne sans l'appeler)
// que devient msg dans ce cas là ?
// 2 possibilités ? msg est détruit ? ou msg est sauvegardé ?
// -> msg est sauvegardé
// y compris dans ce cas de figure on a toujours accès à msg 'Hello'

// dis plus simplement :
// vous aurez toujours accès au portée du dessus (tout de suite ou plus tard)

// parfois, on se sert de ça pour sauvegarder des valeurs
// en général, quand une variable change de valeur au cours du temps
// mais qu'on souhaite accéder à une valeur précédente

// ex (cas d'école, mais plein d'autre cas possible) :

for (var i=0; i<3; i++) {
  // on a enregistre cb 3 fois (on est passé 3 fois dans la boucle)
  setTimeout(function cb() { // cb comme callback (on va définir juste après)
    console.log(i);
  }, 1000);
}

// à votre avis ? dans 1 sec ?
// 3 3 3

// on va refaire le schema pour comprendre :
// on a la valeur de i, à la sortie de la boucle
// on est sortie de la boucle sur la condition i<3

// pile d'appel (de fonction)
// ^
// |
// |
// |
// |for { ... } i=3  cb - cb - cb
// +-----------------1s--------------> temps
// sortie :          3    3    3

// maintenant on va voir qu'avec une closure, on peut sauvegardé
// la valeur de i, au moment du passage dans la boucle
// remarquez que cb et interne font la meme chose
// sauf que interne fait le console.log d'une variable sauvegardée
// on va réécrire le meme exemple avec externe/interne

for (var i=0; i<3; i++) {
  // on a enregistre cb 3 fois (on est passé 3 fois dans la boucle)
  setTimeout(externe(i), 1000); // ici externe retourne interne
  // et interne affiche le i sauvegardé
}

// à votre avis ? dans 1 sec ?
// 0 1 2

// donc dans certain cas, on est obligé de créer cette imbrication de fonction
// pour sauvegarder des choses (ça reste plutôt rare je vous rassure, un peu compliqué)

// pour introduire le prochain chapitre, une question
// à votre avis, que se passe t'il, si on remplace 1000 par 0

for (var i=0; i<3; i++) {
  setTimeout(function cb() {
    console.log(i);
  }, 0);
}

// à votre avis ? dans 0 sec ?
// 3 3 3 (la même chose)

// pourquoi ?
// parce que en JS, il ne peut pas y avoir d'exécution simultanée
// (thread, process, worker...)
// donc soit on fini d'exécuter la boucle, soit on appelle les fonctions
// mais pas les 2 en même temps
// remarque: 0 n'est pas une durée exacte, mais une durée minimum
// (il faut le temps que programme deviennent disponible pour exécuter la suite)