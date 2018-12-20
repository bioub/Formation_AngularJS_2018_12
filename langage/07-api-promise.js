// rappelez vous des problèmes avec les callback asynchrone
// 1 - on est obligé d'imbriquer pour attendre qu'une opération se termine
// ex jeu du plus ou moins avec la fonction jouer :


// imaginez 7 opérations asynchrone qui s'enchainent....
// ça va ressemble à une pyramide :
/*
setTimeout(() => {
  console.log('1s');
  setTimeout(() => {
    console.log('1s de plus');
    setTimeout(() => {
      console.log('1s de plus');
      setTimeout(() => {
        console.log('1s de plus');
        setTimeout(() => {
          console.log('1s de plus');
          setTimeout(() => {
            console.log('1s de plus');
            setTimeout(() => {
              console.log('1s de plus');
            }, 1000);
          }, 1000);;
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

// on donne deux noms à ce problème :
// callback hell (l'enfer des callbacks)
// pyramid of doom (pyramide de la damnation)

// un site en parle
// http://callbackhell.com/
// on va y voir un exemple Node.js avec plein de callback imbriqués
// dans lequel on redimensionne toutes les images présentes dans un dossier

// pour éviter ça, on peut utiliser l'API Promise
// nouveauté ES6
// avant ES6, c'était déjà possible via des bibliothèques
// bluebird, q....
// dans AngularJS, on a un service qui s'appelle $q
// et qui permette d'utiliser l'API y compris sur IE11

// La plupart du temps, vous utiliserez des promises avec des APIs existant
// $http par exemple.
// ici je vais écrire une fonction timeout, qui va réécrire setTimeout 
// sous forme de promesse (Promise)

function timeout(delayMs) {
  // ici on va passer un callback appelée executor
  // au constructeur de Promise, ce callback est appelée tout de suite
  // dans cet exécuteur on va appeler la fonction qui démarre l'opération
  // asynchrone ici (setTimeout)
  // ici via la Closure j'ai accès à delayMs
  // dans le callback de setTimeout, il faut que j'appelle le callback
  // passé au then(), pour ça Promise me fourni ce callback en premier
  // paramètre de l'exécuteur qu'on appelle resolve.
  // C'est pas évident à comprendre au début, mais encore une fois,
  // ce qui nous intéresse c'est d'utiliser les promesses pas les créer
  // car c'est déjà fait pour $http.
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, delayMs);
  });
}

// a la différence d'une version basé sur un callback
// la version Promise retourne un objet dans lequel on va placer nos callbacks.
// setTimeout(function() {}, 1000);
// timeout(1000).then(function() {});

// dans cet objet, on trouve 2 méthodes :
// then dans lequel on va placer notre callback de succès
// catch dans lequel on va placer notre callback d'erreur
// avec timeout, pas d'erreur possible, mais avec $http il faudra penser au catch

// on aimerait que le callback du then soit appelé au bout de delayMs millisecondes
// pour l'instant ce n'est pas le cas.

// ça fonctionne
// là où ça devient intéressant, c'est quand on enchaine des opérations
// asynchrone, ex :

// écrit comme ça, c'est même pire qu'avant :
/*
timeout(1000)
  .then(function() {
    console.log('1s');
    timeout(1000)
      .then(function() {
        console.log('1s de plus');
      });
  });
  */

// avec Promise, si dans le callback d'un then ou d'un catch,
// vous retournez à nouveau une promise, on est pas obligé
// d'imbriquer, à la place on va chainer, c'est à dire mettre le .then
// après le .then précédent
 timeout(1000)
  .then(function() {
    console.log('1s');
    return timeout(1000); // uniquement possible car je retourne ici un promesse
  })
  .then(function() {
    console.log('1s de plus');
    return timeout(1000);
  })
  .then(function() {
    console.log('1s de plus');
    return timeout(1000);
  })
  .then(function() {
    console.log('1s de plus');
    return timeout(1000);
  })
  .then(function() {
    console.log('1s de plus');
    return timeout(1000);
  })
  .then(function() {
    console.log('1s de plus');
  });

// il n'y a plus l'effet de pyramide