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
   
   Fondamentalement une fiche de travail que j'imprime peut être un devis. Et ensuite je travaille dans la fiche de travail en question, c'est bien.
   Il faudra juste que je puisse imprimer avec une en tête "devis", pour que le client sache de quoi il s'agit.

4. **Un client peut-il avoir plusieurs adresses? (facturation/livraison/...)**


---
## Questions rapporteur-Ephec

1. **Concernant les US prioritaires, faut-il les voir comme étant primordiales pour obtenir un MVP (Minimum Viable Product) ou plutôt comme étant des fonctionnalités que le client veut voir en premier?**
   > Imaginons que le client estime que la consultation des factures est prioritaire. Afin de consulter une facture, il faut que des données (factures) soient présentes dans la base de données. Si aucune autre US est implémentée, il est impossible pour le client d'ajouter des factures (données) dans la DB. Est-ce donc intelligent de commencer par l'implémentation de cette US en sachant que dans un premier temps le client ne pourra que consulter les données déjà existantes dans la DB? Ou vaudrait-il mieux commencer par implémenter une US permettant d'ajouter des factures dans la base de données ? 

   Poser la question, c’est un peu y répondre.
   Il faut vraiment mettre la priorité sur ce qui est utilisable (MVP) mais d’un point de vue du client. Il faut donc mettre la priorité sur ce qu’il te demande mais que ce soit opérationnel, sinon cela ne sert à rien.

2. **Quel niveau de détail faut-il dans une DB? -> Jusqu'a quel point faut il décortiquer les différents tables?**

