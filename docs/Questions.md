# Questions 

Ce document contient une liste de questions à poser ou posées au client ou au rapporteur-Ephec ainsi que leurs réponses. 

## Questions client

1. **Lors de la suppression d'un élément, doit-on garder les éléments associé?** 
   > Exemple: Si je supprime un client, dois-je automatiquement supprimer tous ses véhicules, factures, devis,.. ?

   Oui. En faite, la plupart des éléments peuvent exister indépendamment des autres.
   Ainsi un client peut ne pas avoir de véhicule, un véhicule peut ne pas avoir de propriétaire.

2. **Quand il s'agit d'entrer une valeur monétaire, doit-on pouvoir choisir la devise ? Si oui, le taux de conversion doit-il être encodé manuellement (dans un onglet config) ou peut-il être récupéré automatiquement (et donc mis à jour en permanence!)**

   Du point de vue de l'application, tout doit être enregistré en €. Par contre, lors d'une réception de commande, la devise ne doit pas être spécifié. En effet, le taux de conversion sera calculé sur base du montant total (peut importe la devise) et la somme déboursée en €. (voir application slg-order-manager)

3. **Un devis peut être considéré comme une fiche de travail imprimé en pdf ?**
   //TODO

---
## Questions rapporteur-Ephec

1. **Concernant les US prioritaires, faut-il les voir comme étant primordiales pour obtenir un MVP (Minimum Viable Product) ou plutôt comme étant des fonctionnalités que le client veut voir en premier?**
   > Imaginons que le client estime que la consultation des factures est prioritaire. Afin de consulter une facture, il faut que des données (factures) soient présentes dans la base de données. Si aucune autre US est implémentée, il est impossible pour le client d'ajouter des factures (données) dans la DB. Est-ce donc intelligent de commencer par l'implémentation de cette US en sachant que dans un premier temps le client ne pourra que consulter les données déjà existantes dans la DB? Ou vaudrait-il mieux commencer par implémenter une US permettant d'ajouter des factures dans la base de données ? 
