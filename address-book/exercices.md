# Exercices

Je vais vous partager l'énoncé sur Github

## Créer une nouvelle page

* créer un nouveau composant contact-show (controller + template)
* inclure le fichier JS dans index.html
* inclure le module dans contacts/contacts.module
* créer une nouvelle route (state dans le jargon ui.router) dans
app.module (URL: /contact/123)
* ajouter un lien dans app.component

## Créer un service

* créer un service contactService (comme hier) contacts/contact.service.js
* inclure le fichier JS dans index.html
* inclure le module dans contacts/contacts.module
* il nous faut un objet avec une méthodes getAll qui retournera tous les
contacts présents à l'URL https://jsonplaceholder.typicode.com/users
(pas besoin de transformer avec map)

## Développer la page contact list

* injecter le service contactService
* appeler la méthode getAll au chargement de la page
* développer le template avec un ng-repeat pour afficher les noms
de tous ces contacts

