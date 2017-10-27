# Show+

Show+ est une petite application React permettant d'afficher une liste de films ou de séries et consulter leur fiches via une interface soignée.

![Homepage](https://i.imgur.com/mLfxqqm.jpg)
![Movie Details](https://i.imgur.com/WyROWEj.jpg)

## Outils

* [ReactJS]
* [TheMovieDB](https://developers.themoviedb.org/3/)
* [Create React App]
* [Axios]
* [Sass]
* [React Bootstrap]
* [MomentJS]
* [Lodash]
* [PercentageCircle]
* [Font Awesome][Font Awesome].

## Configuration

Pour changer le type de contenu ou le numéro de la page chargée à l'écran, ouvrez *src/App.js* et modifiez les paramètres suivants :

    this.state = {
      type: 'movie', //'movie' ou 'tv
      pageNumber: '1' //numéro de la page
    };

## Lancer l'application :rocket:

À la racine du projet, renommez le fichier *.env.exemple* en *.env*. Ouvrez le fichier puis entrez votre clé API TMDB comme ci-dessous :
  
```REACT_APP_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx```

Enfin, pour lancer le serveur de développement et tester l'application, entrez les commandes suivantes dans votre terminal :

```sh
$ cd show-plus
$ npm start
```

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
