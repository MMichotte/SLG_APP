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

// TODO -> trad en français..

# Order workflows

## General information

#### There are **2 types of carts** :
1. **General cart**
This cart is a fictional cart that has no reference in the database. It is used to group products that need to be ordered but for which the supplier is not defined yet.
The user can therefor not delete the cart and it cannot be associated to a specific order. 

>
2. **Supplier cart (order)**
This cart is considered as an `OPEN`order in which the user can add/update/delete products that need to be ordered from a **defined** supplier. 
Each cart is considered as an order in the database. 
There can only be one `OPEN` order at a time for each supplier.

#### Various rules : 
1. An **order** has 4 status options: 
   - `OPEN`
   - `ORDERED`
   - `PD (Partially Delivered)`
   - `CLOSED`  

2. A **productOrder** (a product associated to an order) has 4 status options:
   - `PENDING`
   - `ORDERED`
   - `RECEIVED`
   - `BO (Back Order)`


## Pages :
- ORDERS (& carts) 
  > **Header :** Searchbox, new-cart btn
  > **Panel_1 :** table containing the general cart and all `OPEN` orders
  > **Panel_2 :** table containing all `not OPEN` orders. 
- CART-DETAIL
  > **Header :** Supplier name (if supplier-cart), order-status, generate-order-btn
  > **Panel_1 :** Form: input select product, input note (opt), input quantity
  > **Panel_2 :** table containing all productOrders of the current cart.  
- ORDER-DETAIL
  > **Header :** Supplier name, order-status, generate-bill-btn
  > **Panel_1 :** Form: input select product, input note (opt), input quantity -> readonly
  > **Panel_2 :** table containing all productOrders of the current cart.  -> readonly 
- BILL
  > **Header :** Order n°, Supplier name, create-bill-btn (create-bill-btn is only active if at least 1 product has been filled and if the required form-fiels are valid.)
  > **Panel_1 :** Form: input shipping-fees, input Debited-amount, input invoicen° (opt), input note (opt)
  > **Panel_2 :** table containing all productOrders with: order-n°, ref-name, status, input quantity-received, input invoice-price-pc, purchase-price-pc
  > footer -> add-product-btn + total of invoice (in supplier currency) => used as a check



## Flows :

#### Creating a supplier-cart  ✅ Done
1. The user clicks on the `New Cart` button and is asked to select a supplier.
2. The system checks whether there already is an open order (= cart) for the selected supplier.
   - **if no :** a new order is created associated with the supplier and with an `OPEN`status. The user is redirected to the newly created cart. 
   - **if yes :** a warning message is displayed and the user is redirected to the existing supplier-cart.

#### Adding/Updating a product to a cart ✅ Done
1. The user clicks on the `Edit` button of the cart in which he wants to add one or more products. 
2. The user searches for a product in the search bar and selects one. He can enter a text-note associated to that product (optional) and the desired quantity.
3. When the user selects a product, the system checks whether the product exists and if it was already added to the cart.
   - **if the product doesn't exist :** The form is invalid
   - **if the product is already in the cart :** The information (quantity, note) of the product is inserted into the form. The `save` button becomes an `update` button.
   - **if it's a new product :** /
4. If all fields are valid he can save/update the product to the cart.
5. The system immediately sends a post/patch request and updates the table on a valid response. 
   - **if it's in the general-cart :** The product is created/updated `w/o an orderId`!
   - **else :** The product is created/updated w/ the orderId of the cart. 

#### Deleting a product from a cart  ✅ Done
1. The user clicks on the `Edit` button of the cart in which he wants to add one or more products. 
2. The user clicks on the `trash` button of the product he wants to remove from the cart.
3. The system asks him for confirmation.
   - **if confirmed :** The product is delete -> delete request and update table on valid response.
   - **if not conf :** Nothing is done.

#### Generating an order from a cart
##### From the general cart ✅ Done
1. The user clicks on the `Edit (pencil)` button of the general-cart.
2. The user selects all the products he whishes to order (shift-click or ctr-click or select-all btn)
3. The user clicks on the `generate new order` button (disabled if no product is selected) and is asked to select a supplier.
4. The system checks whether there already is an open order (= cart) for the selected supplier.
   - **if yes :** the system updates the orderId of all the selected products with the existing order id and redirects the user to that order. (the cart is NOT ordered!)
   - **if no :** 
     1. The system creates a new order with the given supplier.
     2. The system updates all the selected products with the newly created orderId and sets the product status to `ORDERED`. (this automatically sets the order status to `ORDERED`)
     3. The system redirects the user to the orders-page

##### From a supplier cart ✅ Done
1. The user clicks on the `Edit (pencil)` button of the cart.
2. The user clicks on the `generate order` button.
3. The system updates the order-status to `ORDERED`. (this automatically sets the product-order-status to `ORDERED` for all product-orders)

#### Deleting an order/cart ✅ Done
At any moment, a supplier-cart or `ORDERED` order can be deleted.
Orders that are `PD`ord `Closed` cannot be deleted! 

#### Consulting an order ✅ Done
1. The user clicks on the `Consult (eye)` button of the order.
2. The user can select a product and see it's detail but he can't add/edit a product.
3. The user can `process`the order (see below)
> ❗️ When an order is in a `ORDERED`status, it's in a **readonly** mode. 
> ❗️ A product can still be deleted but a Waring should be displayed to indicate that this is not a normal behavior. 

#### Processing an order ✅ Done
1. The user clicks on the `Consult (eye)` button of the order. (see above)
2. The user clicks on the `Generate bill` button.
3. The system displays the proper page (see pages)
4. The user can fill in the forms 
5. The system only saves the bill on the create-bill action! 
6. On the create-bill action :
   1. ...

##### A.) A product was received w/ the correct quantity. ✅ Done
1. The product-info is updated.
2. The product-status is set to `RECEIVED` 

##### B.) A product was received w/ quantity < ordered-quantity. ✅ Done
1. The product is displayed with 2 statuses (`RECEIVED` and `BO` with the missing quantity displayed in the BO status.)
2. on save :
   1. A new order-product is created with the same info as the original product but its quanity = missing quantity and status = `BO`
   2. The original product is updated and its status is set to `RECEIVED` 
   
##### C.) A product was received w/ quantity > ordered-quantity. ✅ Done
1. The system searches for all the same products from the same supplier that have à `BO` status.
   1. **If it finds any :** update the BO product quantity (if quant is still < ordered quant, do as above), set the status accordingly and join add product in the table and bill.
   2. **If not :** next
2. Update the product and set the status to `RECEIVED`

##### D.) A product was not received. ✅ Done
1. Set the product status to `BO`.
   
##### E.) A product was received but it was not pat of the current order. ✅ Done
1. The user clicks on the add-product.
2. The system displays a popup with the required fields to created a new productOrder.
3. Go to step C. 
