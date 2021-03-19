# User-Stories

## Avant propos 
Type de permission d'un utilisateur :
- comptable (C) 🕵️ :
  - peut uniquement consulter l'ensemble des données
  - peut générer des pdf de factures, ...
- utilisateur (MU 👷‍♂️ :
  - a tout les droits du comptable
  - peut créer/modifier une fiche de travail
  - peut créer/modifier une commande
- administrateur (A) 👨‍💼 : 
  - peut tout faire.
- développeur (D) 👨‍💻 :
  - peut tout faire et a accès aux logs et métriques 

Le mot 'utilisateur' fait référence à un utilisateur connecté (peu importe sa permission).

Afin de clarifier les choses, les User Stories (US) ont été classifiées par famille.
Chaque US est identifiable par un code tel que `AA00` avec `AA`le code de la famille et `00` un numéro. 

Le client souhaite que les grandes fonctionnalités suivantes soient implémentées en priorité :
1. Pouvoir créer/modifier des fiches de travail
2. Pouvoir générer des factures
3. Pouvoir passer des commandes 

Bien évidemment, afin de répondre à ses besoins, une série d'US intermédiaires devront être implémentées. Dès lors, une liste des US triées par ordre d'importance est disponible à la fin de ce document.

## User Stories

<ul>
    <li><a href="US_1_general">Général (G)</a></li>
    <li><a href="US_2_vehicules">Véhciules (VE)</a></li>
    <li><a href="US_3_clients">Client (CL)</a></li>
    <li><a href="US_4_stock">Stock (ST)</a></li>
    <li><a href="US_5_main-oeuvres">Main d'oeuvres (MO)</a></li>
    <li><a href="US_6_fiches-travail">Fiches de travail (FT)</a></li>
    <li><a href="US_7_factures">Factures (FA)</a></li>
    <li><a href="US_8_fournisseur">Fournisseurs (FO)</a></li>
    <li><a href="US_9_commandes">Commandes (CO)</a></li>
    <li><a href="US_10_devis">Devis (DE)</a></li>
    <li><a href="US_11_note-credit">Notes de crédits (NC)</a></li>
</ul>


## User Stories Triées par priorité
> Les US marquée d'un ✔️ ont été implémentée. 
1. [x] G01 - Connexion utilisateur
2. [x] ST01 - Onglet Stock
3. [x] ST02 - Consulter le stock
4. [x] ST03 - Ajouter nouvel article dans le stock
5. [x] ST07 - Rechercher un article
6. [x] ST09 - Supprimer un article
7. [x] ST04 - Consulter/modifier le détail d'un article
8. [x] ST06 - Consulter récapitulatif entrée/sortie d'un article
9. [x] MO01 - Onglet Main d'oeuvres
10. [x] MO02 - Consulter la liste des main d'oeuvres
11. [x] MO03 - Ajouter un nouveau tarif de main d'oeuvre
12. [x] MO05 - Rechercher un main d'oeuvre
13. [x] MO06 - Supprimer une main d'oeuvre
14. [x] MO04 - Consulter/Modifier le détail d'un main d'oeuvre
15. [x] CL01 - Onglet Clients
16. [x] CL02 - Consulter liste clients
17. [x] CL03 - Ajout nouveau client
18. [x] CL09 - Rechercher un client 
19. [x] CL10 - Supprimer un client
20. [x] CL04 - Consulter/modifier détail d'un client
21. [x] FO01 - Onglet Fournisseurs
22. [x] FO02 - Consulter liste des fournisseurs
23. [x] FO03 - Ajouter nouveau fournisseur
24. [x] FO04 - Consulter/Modifier le détail d'un fournisseur
25. [x] FO06 - Rechercher un fournisseur
26. [x] FO07 - Supprimer un fournisseur
27. [ ] CO01 - Onglet Commandes
28. [ ] CO02 - Consulter la liste des commandes
29. [ ] CO03 - Créer une nouvelle commande
30. [ ] CO04 - Consulter le détail d'une commande
31. [ ] CO05 - Rechercher une commande
32. [ ] CO06 - Supprimer une commande
33. [ ] CO07 - Réceptionner une commande
34. [x] FA01 - Onglet Factures
35. [ ] FA02 - Consulter les factures
36. [ ] FA03 - Consulter le détail d'une facture 
37. [ ] FA04 - Télécharger la facture en pdf
38. [x] VE01 - Onglet Véhicules
39. [ ] VE02 - Consulter tous les véhicules
40. [ ] VE03 - Ajouter nouveau véhicule
41. [x] FT01 - Onglet Fiches de travail
42. [ ] 🔸 //TODO -> fiches de travailles (consulter, ajouter, detail/modifier, gen devis, gen facture)
