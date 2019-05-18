const genresDisplay = document.getElementById('genres-display')
const moviesDisplay = document.getElementById('movies-display')
const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies'
let data = []
const genres = {
  "1": "Action",
  "2": "Adventure",
  "3": "Animation",
  "4": "Comedy",
  "5": "Crime",
  "6": "Documentary",
  "7": "Drama",
  "8": "Family",
  "9": "Fantasy",
  "10": "History",
  "11": "Horror",
  "12": "Music",
  "13": "Mystery",
  "14": "Romance",
  "15": "Science Fiction",
  "16": "TV Movie",
  "17": "Thriller",
  "18": "War",
  "19": "Western"
}

//create MovieList constructor function
function MovieList() { }

//create instance
const movieList = new MovieList()

//add display genres method to MovieList
MovieList.prototype.displayGenres = function (genresData) {
  let genresInnerHTML = ''

  for (let genre in genresData) {
    genresInnerHTML += `
      <a class="nav-link border rounded-0" id="v-pills-${genresData[genre]}-tab" data-toggle="pill" href="#javascript:;" role="tab" aria-controls="v-pills-action"
            aria-selected="false" data-genre-number=${genre}>${genresData[genre]}</a>
    `
  }
  genresDisplay.innerHTML = genresInnerHTML
}

//add get genres badges method to MovieList
MovieList.prototype.getGenreBadges = function (movieGenres) {
  return movieGenres.map(genre => `<span class="badge badge-info mx-1">${genres[genre]}</span>`).join('')
}

//add display movies method to MovieList
MovieList.prototype.displayMovies = function (data) {
  return moviesDisplay.innerHTML = data.map(movie => {
    const POSTER_URL = BASE_URL + '/posters/' + movie.image
    const movieGenres = movie.genres

    return `
      <div class="col-sm-6 col-lg-4 col-xl-3 mb-3">
        <div class="card">
          <img src=${POSTER_URL} class="card-img-top" alt="Poster of ${movie.title}">
          <div class="card-body">
            <h6 class="card-title">${movie.title}</h6>
              ${movieList.getGenreBadges(movieGenres)}
          </div>
        </div>
      </div>
    `
  }).join('')
}

//get movie data from movie list API
axios
  .get(INDEX_URL)
  .then(response => {
    data = response.data.results
    movieList.displayGenres(genres)
    movieList.displayMovies(data)
  })
  .catch(error => console.log(error))

//add get genre movies to MovieList
MovieList.prototype.getGenreMovies = function (number) {
  return data.filter(movie => movie.genres.indexOf(Number(number)) >= 0)
}

//add click event lister to genres list
genresDisplay.addEventListener('click', event => {
  const genreNumber = event.target.dataset.genreNumber
  const movieData = movieList.getGenreMovies(genreNumber)

  //display movies of this genre
  movieList.displayMovies(movieData)
})

