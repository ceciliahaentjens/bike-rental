# O'velo GraphQL API

Voici le repo pour faire le back de l'application O'velo !
La BDD est déjà prête à être installer !

## Installation

```bash
# Copier le fichier d'environnement. La config de base est déjà spécifier dans le fichier d'exemple
cp .env.example .env
# Installation des dépendances
npm install
```

## Création de la BDD

Pour initialiser votre BDD à 0 il suffit de lancer le script

```bash
npm run initDB
```

Cela créera l'utilisateur `ovelo_u` ayant pour mot de passe `ovelo` ainsi que la BDD `ovelo` avec la structure déjà en place.

Pour réinitialiser les données dans la BDD il faut lancer le script

```bash
npm run resetDB
```

## Lancement de l'API

```bash
npm run dev
```

## documentation

### MCD

[MCD](./docs/MCD.drawio.png)

### Apollo

RDV sur la page de bac à sable de Apollo de l'application web `/`

### Info

Pour le moment le projet ne dispose que d'un serveur apollo basique avec une query / mutation / type / input d'exemple
