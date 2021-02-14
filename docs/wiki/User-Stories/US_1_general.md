## Générale (G)

<!--us-->
<!--title-->
### (G01) Connexion utilisateur
<!--/title-->
<!--description-->
> En tant que personne non-connectée j'aimerais pouvoir me connecter afin d'avoir accès au fonctionnalités de la web-app. 

#### <u>📌 Préconditions :</u>
- **Technique :**
  <!--checklist: "📌 Préconditions technique"-->
  - table `User` doit exister
  <!--/checklist-->
- **Logique :**
  - l'utilisateur doit exister (avoir été créé au préalable)

#### <u>📋 Détail :</u>
Quand la personne navigue vers l'URL du site-web, il arrive sur une page de login contenant un formulaire avec les champs suivant :

- Username: `Text` `required`
- Password: `Text` `required`
- Login : `Button`

Lorsqu'il clique sur le bouton *Login* une requête `POST` est envoyé à l'API afin de tenter d'authentifier l'utilisateur :

```json
method  : POST
url     : /api/login
body    :
{
    "Username": "aaaaaaa",
    "Password": "*******"
}
```

✅ Si l'utilisateur existe et que le mot de passe est correcte, un token JWT doit être renvoyé et l'utilisateur est re-dirigé vers sont dashboard. 

❌ Si la requête échoue: 

- les deux champs texte tremble brièvement
- la bordure des champs texte est rouge
- le champ *Password* est vidé
- un message d'erreur est affiché en dessous du champ *Password* indiquant l'erreur de connexion.

Une fois l'utilisateur connecté, celui-ci a accès à toutes les fonctionnalités de l'application grâce à un token JWT. Ce token JWT est valable jusqu'au lendemain 06h00.

🔑 Durant la totalité de la durée de validité du token JWT, la connexion est automatique et l'utilisateur est redirigé vers son dashboard. 

#### <u>🔍 Critères de validation :</u>
  <!--checklist: "🔍 Critères de validation"-->
  - Une personne ayant entré un mauvais *Username* et/ou mauvais *Password* ne sait pas se connecter
  - Une personne ayant entré un *Username* et un *Password* correcte est connecté et est redirigé vers son dashboard. 
  - Une personne connectée reçoit un token JWT afin de s'authentifier sur le reste de l'application. 
  - Une personne non-connectée avec un token JWT valide, est connectée automatiquement.
  <!--/checklist-->

<!--/description-->
<!--/us-->

---

### (G02) Ajout/Création utilisateur en tant que dev
> En tant qu'utilisateur dev j'aimerais pouvoir créer/ajouter un compte utilisateur de n'importe quel type (A,D,M,C) afin de accorder l'accès à l'application et de donner des droits à certaines personnes.

---

### (G03) Suppression d'un utilisateur en tant qu'dev
> En tant qu'utilisateur dev j'aimerais pouvoir supprimer un compte utilisateur de n'importe quel type (A,D,M,C) afin d'interdire l'accès à l'application et d'enlever des droits à certaines personnes.

---

### (G04) Ajout/Création utilisateur en tant que admin
> En tant qu'utilisateur admin j'aimerais pouvoir créer/ajouter un compte utilisateur de type mécanicien et comptable afin de accorder l'accès à l'application et de donner des droits à certaines personnes.

---

### (G05) Suppression d'un utilisateur en tant que admin
> En tant qu'utilisateur admin j'aimerais pouvoir supprimer un compte utilisateur de type mécanicien et comptable afin d'interdire l'accès à l'application et d'enlever des droits à certaines personnes.

---

### (G06) Déconnexion
> En tant qu'utilisateur j'aimerais pouvoir me déconnecter afin de pouvoir me connecter avec un autre compte utilisateur.

---
