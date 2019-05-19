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

function displayGenres(genresData) {
  let genresInnerHTML = ''

  for (let genre in genresData) {
    genresInnerHTML += `
      <a class="nav-link border" id="v-pills-${genresData[genre]}-tab" data-toggle="pill" href="#javascript:;" role="tab" aria-controls="v-pills-action"
            aria-selected="false" data-genre-number=${genre}>${genresData[genre]}</a>
    `
  }
  genresDisplay.innerHTML = genresInnerHTML
}

function getGenreBadges(movieGenres) {
  return movieGenres.map(genre => `<span class="badge badge-info mx-1">${genres[genre]}</span>`).join('')
}

function displayMovies(data) {
  return moviesDisplay.innerHTML = data.map(movie => {
    const POSTER_URL = BASE_URL + '/posters/' + movie.image
    const movieGenres = movie.genres

    return `
      <div class="col-sm-6 col-lg-4 col-xl-3 mb-3">
        <div class="card">
          <img src=${POSTER_URL} class="card-img-top" alt="Poster of ${movie.title}">
          <div class="card-body">
            <h6 class="card-title">${movie.title}</h6>
              ${getGenreBadges(movieGenres)}
          </div>
        </div>
      </div>
    `
  }).join('')
}

function getGenreMovies(number) {
  return data.filter(movie => movie.genres.indexOf(Number(number)) >= 0)
}

//get movie data from movie list API
axios
  .get(INDEX_URL)
  .then(response => {
    data = response.data.results
    displayGenres(genres)
    displayMovies(data)
  })
  .catch(error => console.log(error))

//add click event lister to genres list
genresDisplay.addEventListener('click', event => {
  const genreNumber = event.target.dataset.genreNumber
  const movieData = getGenreMovies(genreNumber)

  //display movies of this genre
  displayMovies(movieData)
})

