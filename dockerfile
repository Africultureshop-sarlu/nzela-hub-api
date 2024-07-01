# Utiliser une image Node.js officielle comme image de base
FROM node:18-alpine

LABEL hb (hobedbayekula@gmail.com)

# RUN apt-get install

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et package-lock.json (si disponible)
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier tout le reste du code source du projet dans le répertoire de travail
COPY . .

# Construire l'application NestJS
RUN npm run build

# Exposer le port sur lequel l'application va tourner
EXPOSE 8300

# Définir la commande pour démarrer l'application
CMD ["npm", "run", "start:prod"]
