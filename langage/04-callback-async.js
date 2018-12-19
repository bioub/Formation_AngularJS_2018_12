setTimeout(function cbA() {
  console.log('A');
}, 0);

setTimeout(function cbB() {
  console.log('B');
}, 1000);

setTimeout(function cbC() {
  console.log('C');
}, 500);

setTimeout(function cbD() {
  console.log('D');
}, 0);


// ici fin s'exécute avant (y compris si le délai vaut 0)
// le callback est donc asynchrone (appelé plus tard)
console.log('Fin');

// à votre avis, l'ordre des lettres et de fin
// Fin - A - D - C - B
// ici, l'ordre est prévisible car les délais sont prédictifs

// si les délais sont non-prédictifs on ne peut pas deviner l'ordre
// ex :
/*
setTimeout(function() {
  console.log('E');
}, Math.random() * 1000);
*/

// c'est le cas malheureusement la plupart du temps
// ex: clic d'un bouton A ou d'un bouton B
// ex: 2 requetes AJAX (vers le serveur), envoyées en même temps
// parfois ça oblige à un programme un peu compliqué
// imaginez qu'on ait besoin des résultats des 2 requetes pour passer à la suite
// on verra demain un chapitre sur un API Promise pour simplifier ça...

// par rapport au code synchrone, il y a 2 notions supplémentaire
// une boucle d'événements
// une file d'attente

// les moteurs JS les plus connus sont tous écrits en C++
// V8 (Google), SpiderMonkey (Mozilla), JavaScriptCore (Apple), Chakra chez Microsoft
// mais Microsoft a annoncé la semaine dernière que les prochaines versions
// de Edge seraient basées sur V8

// côté C++ le code JS s'exécute dans une boucle appelée boucle d'événement (Event Loop)
// le code asynchrone va s'éxécuter dans un prochain passage de cette boucle
// donc plus tard => prochain passage (y compris setTimeout 0)

// on va refaire le schema


// pile d'appel (de fonction)
// ^
// |
// | 
// |
// |st - st - st - st - log ....⟳.... cbA - cbD ....⟳.... cbC ....⟳.... cbD
// +-----------------------------------~1ms--~2ms----------~501ms--------------> temps
// sortie               Fin            A     D             C              D

// à la différence des callbacks synchrones
// setTimeout n'appelle pas le callback
// après l'éxécution de tout le code synchrone, le moteur JS
// passe à la prochaine itération de l'Event Loop
// donc à chaque fois que le thread du moteur est inactif (idle en anglais)

// dans le cas de setTimeout, le délai indique le temps qu'il faut 
// pour que le callback soit placé dans une file d'attente :

// file d'attente (0ms) : cbA - cbD

// dès que le thread est inactif est qu'on a bouclé
// on prend le premier callback de la file et on le place dans la pile d'appel

// file d'attente (~1ms) : cbD
// file d'attente (~2ms) : 
// file d'attente (500ms) : cbC
// file d'attente (~501ms) : 
// file d'attente (1000ms) : cbB
// file d'attente (~1001ms) : 

// pour approndir le sujet, je vous conseille une vidéo sur YouTube (sous titrée)
// Jake Archibald: In The Loop - JSConf.Asia 2018
// https://www.youtube.com/watch?v=cCOL7MC4Pl0

// Jake Archibald, dév chez Google
// dans cette vidéo il schématise le fonctionnement de l'Event Loop du navigateur
// sachant que dans le navigateur, le code JS, s'éxécute dans le même thread
// qui va dessiner la page
// à gauche le code JS qui s'éxécute
// à droite le code qui redessine la page

// un autre moyen de visualiser l'Event Loop
// c'est l'onglet Performance des Devtools de Chrome
// je vais vous montrer une animation faite en JS
// par rapport à ce que je viens de dire
// pour animer il faut que le JS calcule la prochaine position
// puis que le navigateur dessine
// idéalement 60 fois par secondes (60FPS)

// 1 frame = 1 passage dans la boucle
// le navigateur dessine juste avant le prochain passage
// quand je clique, ya 2 callback dans la file d'attente
// celui du click et celui qui calcule la position du prochain frame

// ça permet parfois de comprendre des problèmes de perf

// on fait une pause (10-15 min)

