
# Description
Création d'un réseaux social d'entreprise

possibilité de créer des posts et de pouvoir y répondre en commentaire avec un accès spécial réservé aux admins

# Installation

ouvrir un terminal sur le backend:

 - executer la commande "npm install"
```bash
npm install
```
ce rendre dans config/config.json :
remplacer les password par votre mot de passe MySQL
executer les commandes suivantes dans la console :
```bash
sequelize db:create

sequelize db:migrate 

nodemone server
```
ouvrir un terminal sur le frontend:

```bash
npm install
```
```bash
npm run serve
```








