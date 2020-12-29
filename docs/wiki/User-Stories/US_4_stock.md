## Stock (ST)

<!--us-->
<!--title-->
### (ST01) Onglet Stock
<!--/title-->
<!--description-->
> En tant qu'utilisateur j'aimerais avoir un onglet `Stock` afin de pouvoir y gérer tout ce qui concerne mes articles.
<!--/description-->
<!--/us-->
---

<!--us-->
<!--title-->
### (ST02) Consulter le stock
<!--/title-->
<!--description-->
> En tant qu'utilisateur j'aimerais pouvoir consulter une liste des articles dans mon stock sous forme d'un tableau afin d'avoir un résumé des informations de chaque article. 

#### <u>📌 Préconditions :</u>
- **Technique :**
  <!--checklist: "📌 Préconditions technique"-->
  - table `Stock` doit exister
  <!--/checklist-->
- **Logique :**
  - /

#### <u>📋 Détail :</u>
Quand l'utilisateur clique sur l'onglet `Stock` de la barre des menus, une requête `GET` est envoyée à l'API afin de récupérer les 25 premiers produits: 

```json
method  : GET
url     : /api/products?show=0-24
```

En attendant la réponse du serveur, la page est chargée avec :

- la structure du tableau (les headers)
- un spinner à la place des données 

✅ Si la requête abouti avec succès: les données sont chargées dans le tableau

❌ Si la requête échoue: un message d'erreur est affiché

S'il existe plus de 25 produits, des petites flèches en dessous du tableau permettent de charger les 25 produits suivants et ensuite remplacer les lignes du tableau existant par les "nouveaux" produits. 
Un compteur se trouvant à gauche des deux flêches permet de savoir la plage de produits actuellement affichée. 

**exemple :**
<!--img-->
![table navigation](img/mocks/Table_nav.png)
<!--/img-->

#### <u>🔍 Critères de validation :</u>
<!--checklist: "🔍 Critères de validation"-->
- Un utilisateur peut consulter une table reprenant tous les produits, chaque ligne de la table correspond à un produit.
- Si aucun produit existe, l'utilisateur voit un message indiquant qu'aucun produit n'a été trouvée et ce à la place du contenu de la table.
<!--/checklist-->

<!--/description-->
<!--/us-->

---

### (ST03) Ajouter nouvel article dans le stock
> En tant qu'utilisateur j'aimerais pouvoir ajouter un nouvel article et encoder les informations ci-dessous afin pouvoir garder un trâce de celui-ci.

informations à encoder :
  - référence article
  - désignation 
  - dernier prix d'achat (HT)
  - prix vente (HT)
  - prix vente (TTC)
  - marge 
  - Quantité stock 
  - Quantité réservée
  - Quantité dispo 
  - Note 
A noter que l'utilisateur peut soit encoder le prix d'achat HT ainsi que le prix de vente HT afin que la marge soit calculée, soit encoder le prix d'achat HT ainsi que la marge afin que le prix de vente HT soit calculé.

---

### (ST04) Consulter/modifier le détail d'un article
> En tant qu'utilisateur j'aimerais pouvoir double-cliquer sur un article afin de pouvoir consulter et modifier toutes ses informations.

ATTENTION : modifier manuellement la quantité d'un article implique d'ajouter une facture fictive uniquement dans le tableau d'entrées/sorties. 

---

### (ST05) Consulter les fiches de travails dans lesquelles l'article est utilisé
> En tant qu'utilisateur j'aimerais pouvoir consulter toutes les fiches de travail contenant cet article.
Éléments devant apparaître dans la synthèse: 
  - ???#TODO

---

### (ST06) Consulter récapitulatif entrée/sortie d'un article
> En tant qu'utilisateur j'aimerais pouvoir consulter un récapitulatif des entrées/sorties de stock de cet article.

Pour chaque ligne, les éléments suivant doivent apparaître: 
  - Quantité (+ ou - en fonction de si c'est une entrée ou une sortie)
  - n° de la facture (client ou fournisseur) associée 
  - Prix d'achat/vente 
  - Date de l'ajout
  
---

### (ST07) Rechercher un article
> En tant qu'utilisateur j'aimerais pouvoir rechercher un article sur base de critères tel que le nom de le référence de l'article ou sa désignation afin de pouvoir retrouver plus facilement un véhicule en particulier.

---

### (ST08) Calculer la valeur du stock
> En tant qu'utilisateur j'aimerais pouvoir calculer la valeur de mon stock à tout moment afin de de connaître la valeur de celui-ci.

---

### (ST09) Supprimer un article
> En tant qu'utilisateur j'aimerais pouvoir supprimer un article de manière définitive afin de ne pas encombrer la liste des articles avec des articles dont je n'ai plus besoin de garder une trâce ou qui n'existent plus.

---
