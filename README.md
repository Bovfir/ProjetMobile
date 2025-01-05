# Projet Mobile - Installation et Lancement de l'API 

## Pré-requis  
- [Docker](https://www.docker.com/)  
- [Node.js](https://nodejs.org/) et [npm](https://www.npmjs.com/)  
- [API Repository](https://github.com/didi1219/API) 

---

## Installation de l'API  

### 1. Initialisation d'une base de données PostgreSQL avec Docker  
Exécutez la commande suivante dans votre terminal pour créer et démarrer une instance PostgreSQL :  

```bash
docker run --name postgres -e POSTGRES_PASSWORD=password -e POSTGRES_USER=john -e POSTGRES_DB=projetDB -p 5432:5432 --rm -d postgres
```
### 2. Installation des dépendances
Dans le répertoire du projet, exécutez les commandes suivantes pour installer les packages nécessaires :
```bash
npm i express
npm i -D nodemon
npm pkg set scripts.dev="nodemon server.js"
npm i pg
npm i express-promise-router
npm i dotenv
npm i vine
npm i argon2
npm i jsonwebtoken
npm i cors
npm i multer
npm i sharp
npm i uuid
npm i yup
npm i internal-ip@6.2.0
npm i --save-dev swagger-jsdoc
npm pkg set scripts.genDoc="node ./swagger/swagger_jsdoc.js"
npm i winston
npm i morgan
```

### 3. Initialisation de la base de données
Une fois les dépendances installées, initialisez la base de données en exécutant :
```bash
npm run initDB
```

### 4. Lancement de l'API
Démarrez le projet en mode développement avec la commande :
```bash
npm run dev
```
### 5. Partie Mobile  

⚠️ **Attention :**  
Assurez-vous de modifier le fichier `mobile/API/index.js` en remplaçant l’adresse IP par l’adresse locale fournie par l’API. Cette étape est essentielle pour garantir le bon fonctionnement de la partie mobile.  

## Alternatives
Si l'installation de l'API en local ne fonctionne pas comme prévu, vous avez la possibilité de l'utiliser via deux alternatives :

### 1. Déploiement de l'API sur Docker
https://www.swisstransfer.com/d/3fb1d142-0523-4c3b-97b2-93d61380522c
Téléchargez et extrayez l'archive contenant le Dockerfile.
Ouvrez un terminal, naviguez jusqu'au répertoire extrait, et exécutez :
```bash
docker-compose build
docker-compose up
```
Une fois le build terminé, l'API sera lancée dans Docker.
L'IP à laquelle l'API sera disponible est http://localhost:3001

### 2. Utilisation de l'API en ligne
Utiliser l'adresse de l'API déployée en ligne : http://91.86.119.222:3000
