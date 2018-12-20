// autre intéret des promesses
// gérer le cas ou plusieurs opérations async
// démarrent et ou on a besoin d'attendre que la
// dernière soit terminer pour faire quelque chose

// ex:
// vous devez récupérer des données du serveur sur 3 URLS
// différentes et ensuite les fusionner.

// je vais créer un faux $http pour cet exemple
var baseDeDonnees = {
  '/contacts': {
    '12': {
      prenom: 'Romain',
      societe_id: '3'
    },
    '234': {
      prenom: 'Vincent',
      societe_id: '10'
    }
  },
  '/societes': {
    '3': {
      nom: 'Formation.tech',
    },
    '10': {
      nom: 'CGI',
    }
  },
};

// ici j'aimerai faire 2 requetes vers ces de URL
// pour pouvoir fusionner les données des ces 2 map (clé/valeur, la clé est 
// l'id pour fusionner plus facilement).

// pour vous montrer le problème je vais écrire ça avec le style callback
// puis améliorer avec le style Promise.

function fakeRequest(url, callback) {
  // simuler une requete avec un setTimeout aléatoire entre 0 et 1s
  var delay = Math.floor(Math.random() * 1001);
  setTimeout(() => {
    var data = baseDeDonnees[url];
  
    // si on a trouvé les données on retourne
    // { status: 200, data: {...}}
    // sinon
    // { status: 404, err: {...}}
    // en appelant le callback
    if (data) {
      callback({
        status: 200,
        data: data,
        delay: delay,
      })
    }
    else {
      callback({
        status: 404,
        err: 'No data found',
        delay: delay,
      })
    }
  }, delay);
}

// ça simule bien une fausse requete AJAX.
/*
fakeRequest('/contacts', function(res) {
  if (res.status === 200) {
    console.log(res.data); // les données
    console.log('recues en ' + res.delay + 'ms');
  } else {
    console.log(res.err); // une erreur
    console.log('recue en ' + res.delay + 'ms');
  }
})
*/

// Maintenant on va envoyer 2 requetes en meme,
// car j'aimerai fusionner les contacts et les societes
// pour simplifier je ne teste pas l'erreur
var contacts, societes, cpt = 0;

/*
fakeRequest('/contacts', function(res) {
  // on fusionne ici ?
  // ici ou en dessous, on ne peut pas savoir, car ce n'est
  // pas prédictif contrairement à setTimeout(function() {}, 500);
  // la solution, créer un compteur, quand on aura reçu les 2 réponse,
  // et donc que le compteur sera à 2, on pourra fusionner
  contacts = res.data;
  if (++cpt === 2) {
    // on peut fusionner
    fusion(contacts, societes);
  }
});

fakeRequest('/societes', function(res) {
  // ou ici ?
  societes = res.data;
  if (++cpt === 2) {
    // on peut fusionner
    fusion(contacts, societes);
  }
});
*/

function fusion(contacts, societes) {
  // par exemple
  console.log({
    prenom: contacts['12'].prenom,
    societe: societes[contacts['12'].societe_id].nom,
  });
}

// ou la ? la c'est pas possible, car le code est async
// ça aurait été possible et surtout plus simple s'il était synchrone.

// maintenant on va faire pareil avec des promesses.
// donc il faut que je traduire mon API en Promise.

// si la requete echoue j'appel le callback du catch
// si la requete est un succes le callback du then
function fakeRequestPromise(url) {
  return new Promise(function(resolve, reject) {
    fakeRequest(url, function(res) {
      if (res.status === 200) {
        resolve(res); // on appelle le callback du then
      } else {
        reject(res); // on appelle le callback du catch
      }
    });
  })
}

// par rapport au style callback
// - interet numéro 1
// pas besoin de faire un if, puisqu'on a déjà 2 callback pour succès/erreur
// dans le then, vous savez que les données sont là.
// - interet numéro 2
// que j'utilise fakeRequestPromise ou $http ou n'importe quel
// autre API basé sur des Promise, je sais déjà ou mettre mes callback
// normé, c'est toujours .then(function success() {})
// et .catch(function erreur() {})
/*
fakeRequestPromise('/contacts')
  .then(function(res) {
    console.log(res.data);
  })
  .catch(function(res) {
    console.log(res.err);
  })
  */

// 3e interet comme vu dans 07-api-promise, on peut enchainer plus
// facilement les requetes

// enfin ici on va pour savoir quand les 2 requetes on terminées
// avec Promise.all

// Promise.all prend un tableau de promesses en entrée
// et retourne une promesse qui sera appelée quand toutes les
// opérations auront terminé
// cette partie est beaucoup plus simple
Promise.all([
  fakeRequestPromise('/contacts'), // on aura les réponse dans le meme ordre
  fakeRequestPromise('/societes'),
]).then(function(responses) {
  const contacts = responses[0].data;
  const societes = responses[1].data;
  fusion(contacts, societes);
})

// on fait une petite pause ?
// et ensuite on va utilser $http puis créer nos propres services.