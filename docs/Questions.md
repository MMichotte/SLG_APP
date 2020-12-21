# Questions 

Ce document contient une liste de questions à poser ou posées au client ou au rapporteur-Ephec ainsi que leurs réponses. 

## Questions client

1. **Lors de la suppression d'un élément, doit-on garder les éléments associé?** 
   > Exemple: Si je supprime un client, dois-je automatiquement supprimer tous ses véhicules, factures, devis,.. ?

   Oui. En faite, la plupart des éléments peuvent exister indépendamment des autres.
   Ainsi un client peut ne pas avoir de véhicule, un véhicule peut ne pas avoir de propriétaire.

2. **Quand il s'agit d'entrer une valeur monétaire, doit-on pouvoir choisir la devise ? Si oui, le taux de conversion doit-il être encodé manuellement (dans un onglet config) ou peut-il être récupéré automatiquement (et donc mis à jour en permanence!)**

   Du point de vue de l'application, tout doit être enregistré en €. Par contre, lors d'une réception de commande, la devise ne doit pas être spécifié. En effet, le taux de conversion sera calculé sur base du montant total (peut importe la devise) et la somme déboursée en €. (voir application slg-order-manager)

---
## Questions rapporteur-Ephec

1. **Lors du choix des technologies, faut-il justifier le choix de manière technique ?**
   > Justifier l'utilisation d'une DB SQL ou noSQL me parait pertinent, mais justifier le choix entre Angular ou React moins... 