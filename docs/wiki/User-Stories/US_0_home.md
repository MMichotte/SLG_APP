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
5. [x] ST04 - Consulter/modifier le détail d'un article
6. [x] ST07 - Rechercher un article
7. [x] ST09 - Supprimer un article
8. [x] MO01 - Onglet Main d'oeuvres
9. [ ] MO02 - Consulter la liste des main d'oeuvres
10. [ ] MO03 - Ajouter un nouveau tarif de main d'oeuvre
11. [ ] MO04 - Consulter/Modifier le détail d'un main d'oeuvre
12. [ ] MO05 - Rechercher un main d'oeuvre
13. [ ] MO06 - Supprimer une main d'oeuvre
14. [x] CL01 - Onglet Clients
15. [ ] CL02 - Consulter liste clients
16. [ ] CL03 - Ajout nouveau client
17. [x] VE01 - Onglet Véhicules
18. [ ] VE02 - Consulter tous les véhicules
19. [ ] VE03 - Ajouter nouveau véhicule
20. [x] FT01 - Onglet Fiches de travail
21. [ ] 🔸 //TODO -> fiches de travailles (consulter, ajouter, detail/modifier, gen devis, gen facture)
22. [x] FA01 - Onglet Factures
23. [ ] FA02 - Consulter les factures
24. [ ] FA03 - Consulter le détail d'une facture 
25. [ ] FA04 - Télécharger la facture en pdf
26. [ ] 🔸 //TODO -> fournisseur (onglet, consulter, ajouter)
27. [ ] 🔸 //TODO -> commandes (...)
