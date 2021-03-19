## Commandes (CO)

<!--us-->
<!--title-->
### (CO01) Onglet Commandes
<!--/title-->
<!--description-->
> En tant qu'utilisateur j'aimerais avoir un onglet `Commandes` afin de pouvoir y gérer tout ce qui concerne mes commandes. 
<!--/description-->
<!--/us-->

---

<!--us-->
<!--title-->
### (CO02) Consulter la liste des commandes
<!--/title-->
<!--description-->
> En tant qu'utilisateur j'aimerais pouvoir consulter la liste des commandes afin de pouvoir connaître son statut ainsi qu'un résumé des informations de chaque commande.
<!--/description-->
<!--/us-->

---

<!--us-->
<!--title-->
### (CO03) Créer une nouvelle commande
<!--/title-->
<!--description-->
> En tant qu'utilisateur j'aimerais pouvoir créer une nouvelle commande afin de pouvoir l'envoyer à mon fournisseur.
Une commande est donc lié à un et un seul fournisseur et est constitué de plusieurs produits. Pour chaque produit je doit pouvoir encoder la quantité souhaité ainsi qu'une éventuelle note en texte libre.
<!--/description-->
<!--/us-->

---

<!--us-->
<!--title-->
### (CO04) Consulter le détail d'une commande
<!--/title-->
<!--description-->
> En tant qu'utilisateur j'aimerais pouvoir consulter le détail d'une commande afin d'y retrouver tous les articles associé et leurs statut. 
<!--/description-->
<!--/us-->

---

<!--us-->
<!--title-->
### (CO05) Rechercher une commande
<!--/title-->
<!--description-->
> En tant qu'utilisateur j'aimerais pouvoir rechercher une commande afin de la trouver plus facilement.
<!--/description-->
<!--/us-->

---

<!--us-->
<!--title-->
### (CO06) Supprimer une commande
<!--/title-->
<!--description-->
> En tant qu'utilisateur j'aimerais pouvoir supprimer une commande afin de ne plus garder trace de celle-ci.
Attention qu'on ne peut supprimer une commande que si le statut de tous les articles de celle-ci est à 'ordered' ou 'Back order'!
<!--/description-->
<!--/us-->

---

<!--us-->
<!--title-->
### (CO07) Réceptionner une commande
<!--/title-->
<!--description-->
> En tant qu'utilisateur j'aimerais pouvoir réceptionner une commande afin de mettre à jour mon stock avec les nouvelles arrivées.


Possibilités: 
1. Je reçoit tout ce que j'ai commandé ni plus, ni moins et dans les bonnes quantités.
2. Je reçoit une partie de ce que j'ai commandé, certains articles sont en BO.
3. Je reçoit tout ET des articles venant d'une autre commande car ils étaient en BO.
4. Je reçoit une partie ET des articles venant d'une autre commande car ils étaient en BO.
5. 2, 3, 4 avec des mauvaises quantités.

Flow:
-> création d'une facture à partir d'une commande sur base des articles sélectionné (manual selection | select-all)
-> dans la page de génération de facture :
  -> possibilité de modifier la quantité de chaque article reçu (par déf = quant de la commande)
  -> ajout du prix de chaque article (devise fournisseur)
  -> ajout du prix des frais de port (devise fournisseur)
  -> ajout du prix de débité  (devise locale)
    -> avec ces infos on peut calculer le taux de change 
    -> répartir le prix des fdp sur l'ensemble des articles (en % par rapport au prix de l'article )
    -> calculer le nouveau prix de l'article en divise locale 
  -> afficher en temps réel le nouveau prix en euro 
  -> possibilité d'ajouter une note en texte libre
  -> possibilité d'ajouter le n° de la facture fournisseur associé. 
  -> btn save 
-> lors du save de la facture : 
  -> tous les articles concerné passe en état "Received"
  -> leurs prix est maj
  -> la quantity_received est maj
  -> le prix du produit concerné est maj (table produit)
  -> la quantité du produit concerné est maj (table produit)
  -> la facture est enregistrée en db


Je ne peux que sélectionner les articles qui sont dans un état "ordered" ou "BO" 
Au niveau de la commande, un statut indique: open/closed (closed si tous les articles sont "received') 
Je peux supprimer un article d'une commande (j'ai annuler la commande de cet article)
Je peux supprimer une commande (uniquement si tous les articles sont en "ordered" ou "B0")
Si un article de la commande n'existe pas dans la db, je dois pouvoir le créer.

<!--/description-->
<!--/us-->

---
