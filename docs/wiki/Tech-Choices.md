# Choix des Technologies

## Backend
![backend](img/tech/NodeJs_Express.png)

- Language : `JavaScript`
- Runtime Environment: `Node Js`
- Framework : `Express Js`
- ORM : `Sequelize`

Tout d'abord, vu l'envergure du projet, il me parait important de veiller à une bonne structure et de garder en tête la maintenance du projet au fil du temps. Dans ces circonstances, il est important d'utiliser un framework.
Quant au choix du framework, bien qu'il en existe plusieurs et dans différents languages, je voulais, par simplicité, travailler en javascript. Mon choix s'est porté sur la suite NodeJs-ExpressJs car j'ai déjà travaillé avec ceux-ci et j'aimerais approfondir mes connaissances afin de mieux maîtriser ces technologies. 

## Frontend
![frontend](img/tech/Angular.png)

- Framework : `Angular` avec comme languages :
  - `TypeScript`
  - `HTML`
  - `SCSS`

Tout comme pour le backend, il est évident que l'utilisation d'un framework est indispensable. 
Le choix du framework s'est fait sur base de mon expérience personnelle. En effet, durant mes années d'études, j'ai eu l'occasion d'utiliser différent frameworks frontend tel que React, Vue et Angular. J'ai particulièrement bien aimé travailler avec ce dernier car il impose une certaine rigueur tout en restant relativement simple d'utilisation. 

## Base de données 
![DataBase](img/tech/PostgreSql.png)

Le choix de la base de données a été motivé par quatre critères :
1. **SQL** 
    Après analyse des besoins du client, il ressort clairement un grand nombre de relations entre les différentes données.  Une base de données SQL est donc primordiale pour la bonne organisation du système d'information. 
>
2. **Notoriété** 
    PostgreSQL est fortement utilisé dans le milieu proféssionnel ce qui lui oblige d'être mise à jour régulièrement et ce tant au niveau sécurité que en ajout de fonctionnalités. C'est donc une base de données fiable, utilisable à très long terme et maîtrisée par de nombreux développeurs. 
>
3. **Expérience**
    Bien que toutes les bases de données SQL se ressemble, le fait d'avoir déjà manipuler et de s'être familiariser avec PostgreSql m'offre un gain de temps considérable. 
>
4. **Disponible sur Heroku**
    Heroku (la plateforme d'hébergement choisie) offre la possibilité d'intégrer directement une base de données PostgreSql à notre application. Ceci simplifie énormément le déploiement ainsi que l'intégration de celle-ci avec l'application. 
   
## Tests
![Tests](img/tech/Chai_Mocha.png)

Afin de tester l'application, j'utilise le framework `Mocha` en combinaison avec `Chai`.
Mocha permet d'exécuter les tests et renvoie un log du résultat. Chai quant à lui permet de structurer mes fichiers de tests.  

## Linter
![Linter](img/tech/ESLint.png)

Il est "facile" d'écrire du code mais beaucoup plus compliqué de le rendre cohérent, lisible et portable. Afin de palier à ces problèmes un linter est indispensable. Étant donnée que je travaille principalement avec du `JS`et du `TS`, j'ai opté pour [ESLint](https://eslint.org). Ce linter est 100% configurable pour chaque projet et me permet de garantir, dans l'éventualité où dans le future un autre développeur venait à contribuer au projet, la cohérence de nommage des variables, la configuration de l'IDE et bien d'autre choses. Pour ce qui est du `HTML` et `SCSS` un linter est inclus dans le framework Angular. 

## API-doc
![API-doc](img/tech/insomnia.png)

Une API sans documentation est pratiquement inutilisable. Il existe un grand nombre de technologies pour écrire de la documentation API. Néanmoins, afin de centraliser un maximum d'éléments, j'ai décidé d'utiliser l'application `Insomnia`. `Insomnia` permet non seulement de tester mon API en temps réel (équivalent à Postman) mais permet aussi d'écrire la documentation et de donner des examples pour chaque requêtes. De plus, à l'aide d'un script bash, je peux convertir ma documentation depuis un format json (généré par `Insomnia`) en un fichier HTML qui sera alors déployé automatiquement sur le site-web.

Programme utilisé : [Insomnia.com](https://insomnia.rest)

## Schémas / Design
![draw.io](img/tech/Shema_Design.png)

Pour tout ce qui est schéma de base de données, création de logo ou maquette de fonctionnalités j'utilise :
- [draw.io](https://app.diagrams.net) : création de schémas structurés
- [Figma](https://www.figma.com/files/recent) : design et autre  