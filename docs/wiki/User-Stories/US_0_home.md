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
3. [ ] ST02 - Consulter le stock
4. [ ] ST03 - Ajouter nouvel article dans le stock
5. [ ] MO01 - Onglet Main d'oeuvres
6. [ ] MO02 - Consulter la liste des main d'oeuvres
7. [ ] MO03 - Ajouter un nouveau tarif de main d'oeuvre
8. [ ] CL01 - Onglet Clients
9. [ ] CL02 - Consulter liste clients
10. [ ] CL03 - Ajout nouveau client
11. [ ] VE01 - Onglet Véhicules
12. [ ] VE02 - Consulter tous les véhicules
13. [ ] VE03 - Ajouter nouveau véhicule
14. [ ] FT01 - Onglet Fiches de travail
15. [ ] 🔸 //TODO -> fiches de travailles (consulter, ajouter, detail/modifier, gen devis, gen facture)
16. [ ] FA01 - Onglet Factures
17. [ ] FA02 - Consulter les factures
18. [ ] FA03 - Consulter le détail d'une facture 
19. [ ] FA04 - Télécharger la facture en pdf
20. [ ] 🔸 //TODO -> fournisseur (onglet, consulter, ajouter)
21. [ ] 🔸 //TODO -> commandes (...)
