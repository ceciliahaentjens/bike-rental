# Parcours - Node.js / React / GraphQL

Tu viens de terminer la partie **Node.js**, **React** et **GraphQL**.  
Tu as appris beaucoup de nouvelles notions, et il faut désormais les valider. C'est l'objet de ce parcours.

## Qu'est-ce qu'un parcours ? 🤔

Un parcours (ou parcours du combattant, ou Parkour!) est un exercice, en autonomie, où on va te demander de mettre en pratique ce qui a été vu pendant les cours.
Son nom officiel est _Evaluation en Cours de Formation_ (a.k.a ECF). C'est un élément obligatoire pour le Titre Professionnel.  
Mais au delà du côté officiel, un parcours, c'est surtout l’occasion de **se confronter à la mise en pratique des connaissances acquises** dans un « gros » projet,
et, ensuite, de savoir quelles notions sont à reviser pour continuer de s'améliorer.

Pendant la durée du parcours, il n'y aura donc **aucune entraide entre étudiants** (et oui, on a dit "en autonomie").  
Par contre, tu peux, bien entendu, consulter tous les supports de cours et aller fouiller sur internet. Comme en situation professionnelle.

D'ailleurs, pour aller plus loin dans la mise en situation professionnelle, une _Lead Developer_ (Fanny) et des _Senior Developers_ seront disponibles
pour t'orienter/t'aider, afin **d'éviter de rester bloqué** trop longtemps. 5 jours, ça passe vite ! Comme dans le monde pro, rester bloquer sur un problème
longtemps n'est ni utile, ni rentable pour qui que ce soit.

## C'est quoi le programme ? 📺

- lundi : rendez-vous à 9h en cockpit (bon, normalement, tu y es déjà en lisant ces lignes)
- chaque jour suivant : rdv à 9h en cockpit. La _Lead Developer_ et un _Senior Developer_ vont débriefer la journée passée, parler des soucis rencontrés et faire des rappels si nécessaires
- chaque jour : jusqu'à 17h, tu avances sur ton projet et tu peux demander de l'aide aux _Lead/Senoir Devs_
- chaque jour : vers 15h, on te demandera de remplir un rapport d'activité
- vendredi 15h : on arrête de coder, on fait un _commit_ et un _push_, puis on va se détendre 30min
- vendredi 15h30 : on se retrouve en cockpit, tous ensemble, pour revenir sur la formation, échanger, discuter et prendre du recul

## Qu'est-ce qu'on attend de toi ? 👇

Voici la liste des différents objectifs pédagogiques (vus en cours) que tu devras mettre en oeuvre dans ce parcours. Si certains ne te semblent pas clairs, n’hésite surtout pas à demander des explications !

### Frontend

- Décrire une interface à l'aide de composants
- Appliquer le paradigme déclaratif pour gérer une application avec état
- Calculer un état dérivé
- Appliquer le paradigme déclaratif aux champs de formulaires
- Appliquer une solution de router front
- Consommer une API depuis un projet React
- Utiliser une bibliothèque de composants

### Backend

- Mettre en place un serveur GraphQL
- Importer une base de données SQL
- Déclarer des schémas GraphQL
- Implémenter les Resolvers GraphQL
- Mettre en place des associations entre les entités GraphQL
- Consommer une API REST avec GraphQL

### Modélisation de base de données

- Concevoir une base de données

### :warning: Attention

Il sera très difficile de _tout_ réaliser. **On prefèrera 50% des fonctionnalités bien faites que 100% des fonctionnalités mal faites.**

## Comment s'organiser ? 📚

Tu vas tout d’abord créer un _GitHub Project_ dans ton dépôt, puis y ajouter 7 colonnes : Backlog, J1, J2, J3, J4, J5 et Done.  
Durant la première heure, dans la colonne "Backlog", tu vas créer une "carte" par fonctionnalité demandée dans le CDC, ou par "tâche" que tu identifies, c'est au choix.  
Puis, tu pourras déplacer ces cartes dans les colonnes J1 à J5, selon ton estimation initiale. Il peut rester des cartes dans le Backlog si tu estimes qu'il ne sera pas possible de les réaliser dans les 5 jours.  
Pour t'aider à prioriser/estimer, il y a une section "Planning" dans le CDC.  
Enfin, je pense que tu sais dans quelle colonne déplacer les cartes quand elles seront terminées :wink:

Il est recommandé de **créer une branche par fonctionnalité**, et de faire un merge dans master une fois la fonctionnalité mise en place.

Pour toute demande au _Lead Dev_, tu devras passer par la création d'une issue dans ton dépôt (et côté profs, on a un intégration qui permet d'avoir automatiquement un message dans notre Slack, aussitôt une issue créée par un étudiant 😜). Cela t'obligera à _bien décrire ton problème_ dans l'issue, et cela nous permettra d'avoir un suivi plus précis, avec un historique des échanges. Encore une fois, comme dans le monde pro !

## Quel est le sujet du parcours ? 🎯

=> **Mettre en place un outil de gestionnaire d'une entreprise qui loue des vélos au travers de nombreux points de vente.**  
Un vélo peut être loué à Paris et rendu à Marseille, pour prendre l’exemple d’un petit trajet.  
Tu dois te douter du nom de cet outil... _vélO'_ :wink: 🚲

**:bulb: Conseil du jour, bonjour**  
Prends bien le temps de lire TOUT l'énoncé avant de commencer à coder.  
De nombreux éléments sont fournis, pour gagner du temps. Ce serait dommage de passer à côté :wink:

Pour plus de détails, tu peux aller **[lire le cahier des charges](doc/Cahier-des-charges.pdf)** :wink:

## Franchement, on est sympa…

Ne perds pas de temps sur le design, utilises une librairie de composants comme _Material UI_ !

## Rappels 🤓

- **Ne fonce pas tête baissée dans le code**, on attend de toi une certaine prise de recul : **planifie ton travail en sprints** de **1 jour**.
  - Tu es _fortement_ encouragé.e à **utiliser des outils de gestion de projet, tel que GitHub Project** (car intégré à ton repo, c’est le mieux, tout au même endroit :wink:).
  - Le but n’est pas de s’épuiser à essayer de tout faire (donc à la va vite…), mais bien de **faire ce que tu peux (en t’appliquant :sparkles:)**.
- C’est un **parcours en autonomie**, qui va/doit te permettre de faire un bilan personnel et fiable de ta réelle progression dans la formation. C’est donc très important de respecter cette règle du jeu !
  - En cas de besoin d’aide, et seulement après avoir correctement cherché et épuisé toutes tes sources d’informations : tu es invité à **ouvrir des issues directement dans ton repo sur GitHub**, et un *lead/Senior dev* viendra y répondre… probablement sans te donner _la_ solution _toute cuite_, mais en t’orientant avec bienveillance :hugs:
- Avance **fonctionnalité par fonctionnalité** => passe à la suite seulement quand tu as fini d’implémenter les règles métiers et l’UI/UX prévues par le CDC
- Utilise **git à son plein potentiel** => pour chaque nouvelle fonctionnalité, crée une nouvelle branche de travail, et commit très souvent
- **La réunion à 9h et le rapport d’activité sont obligatoires ;)**

À toi d’jouer !
