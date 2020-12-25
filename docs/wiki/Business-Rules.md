# Business-Rules

1. Toute référence à un élément (véhicule, client, facture, ...) doit pouvoir être cliquable et doit rediriger l'utilisateur vers le détail de l'élément dans l'onglet père de celui-ci. Une flèche `retour` doit permettre un retour en arrière à tout moment. 
>*exemple :* Dans le détail de la facture, je peux cliquer sur le nom du client, ceci me redirige vers la fiche détaillée du client dans l'onglet "clients". Si je clique sur la flèche `retour` je suis redirigé vers le détail de la facture en question. 

2. Une facture doit être identifiable par un numéro au format `yyyyXXXX` avec `yyyy`l'année d'émission de la facture et `XXXX` un numéro auto-incrémenté. 

3. une facture émise doit être figée. Même si la voiture et/ou le client concerné n'existe plus! 

4. Un article n'est pas lié à un seul fournisseur.

