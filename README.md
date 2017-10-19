# Show+

Show+ est une petite application permettant d'afficher une liste de films ou de séries et consulter leur fiches via une interface soignée.

# Cahier des charges

  - Afficher une liste de films ou de séries
  - **Bonus:** pouvoir consulter les détails d'un film ou d'une série

# Technologies utilisées

J'ai listé ci-dessous les outils principaux que j'ai utilisé pour ce projet :

* [ReactJS] - La vedette de cet exercice !
* [Atom] - Mon éditeur de code favoris
* [Create React App] - Facilite la création d'applications React
* [Axios] - Requêtes HTTP asynchrones vers l'API
* [Sass] - Préprocesseur CSS (j'utilise la syntaxe SCSS)
* [React Bootstrap] - Version de Bootstrap pour React
* [MomentJS] - Manipulation des dates de l'API
* [PercentageCircle] - Composant que j'ai un peu modifié pour convenir à mes besoins
* [Lodash] - Manipulation avancée des arrays

Mais aussi la police d'écriture Roboto et le pack d'icône [Font Awesome][Font Awesome].

# Test

Pour lancer le serveur de test et lancer l'application, entrez les commandes suivantes dans votre terminal :

```sh
$ cd show-plus
$ npm start
```

# Conception & Expérience Utilisateur

Pour cette application React, j'ai eu plusieurs axes de réflexion sur l'expérience utilisateur, avant et pendant le développement. Dans un premier temps, j'ai analysé chaque point du cahier de charges pour y répondre au mieux.

J'ai commencé par dessiner un prototype low-res sur papier pour avoir une idée de ce que je voulais développer. En complément, j'ai fait de la veille technologique sur des sites comme Dribbble pour le choix de ma palette de couleur et l'agencement des différents élements. A terme, ce type d'application est amené à compter beaucoup plus de données et retenir les utilisateurs un long moment sur le site. C'est une des raisons pour laquelle j'ai choisi un thème sombre, qui par expérience, évite la fatigue occulaire sur un temps long de lecture.

Pour servir de base à mon développement, j'ai apposé une grille Bootstrap pour mettre en place une application responsive. L'application se présente sous forme d'une galerie de vignettes, en 4 colonnes sur un grand écran. Des vignettes pas trop petites pour que l'on puisse distinguer rapidement leurs informations, mais pas non plus trop grandes pour avoir apercevoir un maximum d'oeuvres sur une même page.

Chaque vignette contient 4 informations principales : une illustration, le titre de l'oeuvre, le ou les genre(s) ainsi qu'une note moyenne par les utilisateurs de TMDB. J'ai choisi de placer la note en overlay par-dessus l'illustration. Pour renforcer sa visibilité, j'ai mis en place le code couleur suivant, pour des notes allant de 0 à 100 :
- 0 -> 60 : Rouge
- 61 -> 70 : Jaune
- 71 -> 80 : Vert clair
- 81 -> 100 : Vert

Au passage de la souris sur chacune des vignettes, je fais disparaître l'overlay pour mettre en avant l'illustration de l'oeuvre et, comme pour simuler une pression physique sur l'élement, j'applique un zoom arrière à l'illustration.

Au chargement de la page, j'ai également choisi de faire apparaître toutes les vignettes en augmentant progressivement taille et opacité. J'ai effectué l'ensemble de ces animations grâce à CSS3.

Un clic sur chaque vignette ouvre un pop-up contenant des détails sur l'oeuvre. Par rapport à une page indépendante, un pop-up permettra à l'utilisateur de plus facilement switcher entre les oeuvres.

Licence
----

MIT


   [Atom]: <https://atom.io/>
   [Create React App]: <https://github.com/facebookincubator/create-react-app>
   [Axios]: <https://github.com/axios/axios>
   [Sass]: <http://sass-lang.com/>
   [React Bootstrap]: <https://react-bootstrap.github.io>
   [MomentJS]: <https://momentjs.com/>
   [Lodash]: <https://lodash.com>
   [Font Awesome]: <http://fontawesome.io/>
   [ReactJS]: <https://reactjs.org/>
   [PercentageCircle]: <https://github.com/JackPu/reactjs-percentage-circle>
