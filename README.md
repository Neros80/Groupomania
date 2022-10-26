
# Description
Création d'un réseaux social d'entreprise

possibilité de créer des posts et de pouvoir y répondre en commentaire avec un accès spécial réservé aux admins

# Installation

Ouvrir un terminal sur le backend:

Executer la commande "npm install"
```bash
npm install
```
Ce rendre dans config/config.json :
Remplacer les password par votre mot de passe MySQL
Executer les commandes suivantes dans la console :
```bash
sequelize db:create

sequelize db:migrate 

nodemone server
```
Ouvrir un terminal sur le frontend:

```bash
npm install
```
```bash
npm run serve
```








