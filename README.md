
# Description
Création d'un réseau social d'entreprise (projet OpenClassroom)

Possibilité de créer des posts et de pouvoir y répondre en commentaires avec un accès spécial réservé aux admins

# Installation

Ouvrir un terminal sur le backend:

Executer la commande "npm install"
```bash
npm install
```
Se rendre dans config/config.json :
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








