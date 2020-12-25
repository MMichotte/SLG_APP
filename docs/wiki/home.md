# Description générale

## Description du projet 

Le client, [SLG Classic Cars](https://www.slgcars.be), utilise actuellement une combinaison de 2 logiciels (*[GAD-Garage](https://www.logiciel-garage.fr)* + *SLG-order-manager* (logiciel propriétaire) ) afin de répondre à leurs besoins en matière de :
* Gestion des clients
* Gestion des fournisseurs
* Gestion des véhicules
* Gestion du stock
* Gestion des commandes 
* Gestion des factures 
* Gestions des devis 
* Gestion des fiches de travail
* ... 

Le logiciel *GAD-garage* ne leur convenant plus, la société souhaite développer une nouvelle solution informatique spécialement adaptée à leur façon de travailler et répondant à leurs besoins cités-ci avant. 

Cette solution devra être conçue de façon à pouvoir être adaptée au fil des années en fonction des nouveaux besoins du client. De plus, afin de garantir une utilisation à distance ainsi qu'une grande flexibilité, le client souhaite que la solution soit articulée autour d'une application web. 


## Infrastructures actuelle de l'entreprise 

L'entreprise est actuellement répartie sur 2 sites : 
* Atelier mécanique à [Bierwart](https://www.google.com/maps/place/SLG+Classic+Cars/@50.5557432,5.0357327,18z/data=!4m13!1m7!3m6!1s0x47c1a0961d441825:0x127b3022e2978ae9!2sBierwart,+5380+Fernelmont!3b1!8m2!3d50.55582!4d5.03628!3m4!1s0x47c1a0961dfc0261:0xc4958967f2d2a29d!8m2!3d50.5560786!4d5.0363497)
* Atelier carrosserie à [Hingeon](https://www.google.com/maps/place/SLG+Classic+Cars+Carrosserie/@50.5278029,5.0052034,16.63z/data=!4m13!1m7!3m6!1s0x47c1a100b3bb2095:0x2a0bc08ad485b82f!2sHingeon,+5380+Fernelmont!3b1!8m2!3d50.52545!4d5.00687!3m4!1s0x47c1a1003bf31937:0x513c3afab502f936!8m2!3d50.5295316!4d5.0084916)


L'infrastructure informatique se trouve principalement sur le site de l'atelier mécanique avec : 
* un **serveur** (windows 10 pro) sur lequel le logiciel *GAD-Garage "serveur"* est installé et qui contient la base de données actuelle (propriétaire au logiciel GAD-Garage). Les fichiers servant de base de données pour le logiciel *SLG-order-manager* sont également stocké sur ce serveur. 
* un **ordinateur portable** (windows 10) sur lequel sont installés les logiciels *GAD-Garage "client"* et SLG-order-manager. Ceux-ci sont donc des logiciel client récupérant leurs données directement depuis le serveur. 

La site de la carrosserie n'est équipé que d'un **ordinateur portable** (windows 10). Actuellement, dû à un problème du logiciel *GAD-Garage*, le site de la carrosserie n'a aucun moyen d'encoder ses données. Le gérant doit obligatoirement se rendre sur le site de l'atelier mécanique afin d'avoir accès aux logiciels et de pouvoir encoder ses données! 

L'entreprise enregistre actuellement une grande partie de ses documents importants dans un cloud, néanmoins, aucun back-up vers un cloud ou serveur secondaire n'est mis en place au niveau des bases de données. 
