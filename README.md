# Show+

Show+ is a small React APP that allow to display a list of movies and series and watch their details with a cool UI, using the TMDB [TheMovieDB](https://developers.themoviedb.org/3/) API.

![Homepage](https://i.imgur.com/mLfxqqm.jpg)
![Movie Details](https://i.imgur.com/WyROWEj.jpg)

## Tools

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

To change the type of content or the page number loaded on screen, open *src/App.js* and edit the parameters below :

    this.state = {
      type: 'movie', //'movie' or 'tv
      pageNumber: '1' //page number
    };

## Launch the APP :rocket:

At the root of the project, rename the file *.env.exemple* to *.env*. Open the file and enter your TMDB API key as below :
  
```REACT_APP_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx```

Finally, to launch the development server and test the application, enter the command below in your terminal :

```sh
$ cd show-plus
$ npm start
```

License
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
