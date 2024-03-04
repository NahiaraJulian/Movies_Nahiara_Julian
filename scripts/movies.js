const $div = document.getElementById("div_movies")
const $input = document.getElementById("search_input")
const $select = document.getElementById("genres_select")
const buttons = document.querySelectorAll("button")

const url = "https://moviestack.onrender.com/api/movies"
const init = {
    method: "GET",
    headers : {"x-api-key":"0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"},
}

let movies = JSON.parse(localStorage.getItem("movies")) || []

fetch (url, init)
    .then((resolve) => resolve.json())
    .then ((data) => {
        movies = JSON.parse(localStorage.getItem("movies")) || data.movies
        //console.log(movies);
        renderCards(movies, $div, createCard)
        createSelect(movies, $select)
        addProperties(movies)
         
        //movies = JSON.parse(localStorage.getItem("movies"))
        //console.log(movies)                

        $input.addEventListener(`input`, () => {
            movies =JSON.parse(localStorage.getItem("movies")) || data.movies
            //filtrar por titulo
            const titleMoviesFiltrados = filterTitleMovies(movies, $input.value)
            //filtrar por genero
            const genresMoviesFiltrados = filterGenresMovies(titleMoviesFiltrados, $select.value)
            //mostrar las cards de las peliculas
            renderCards(genresMoviesFiltrados, $div, createCard)

            if ($select.value == "none") {
                const titleMoviesFiltrados = filterTitleMovies(movies, $input.value)
                renderCards(titleMoviesFiltrados, $div, createCard)
            }
        })

        $select.addEventListener(`change`, () => {
            movies =JSON.parse(localStorage.getItem("movies")) || data.movies
            //filtrar por genero
            const genresMoviesFiltrados = filterGenresMovies(movies, $select.value)
            //filtrar por titulo
            const titleMoviesFiltrados = filterTitleMovies(genresMoviesFiltrados, $input.value)
            //mostrar las cards filtradas
            renderCards(titleMoviesFiltrados, $div, createCard)

            if ($select.value == "none") {
                renderCards(movies, $div, createCard)
            }                                                    
        })

        $div.addEventListener(`click`, (e) => {
            console.log(e.target.dataset);            
            movies =JSON.parse(localStorage.getItem("movies")) || data.movies            

            //buscar la pelicula que se le hace click al boton
            //cambiarle la propiedad favorite a true a la pelicula encontrada
            //cambiarle el color a los corazones
            //recorrer el array de peliculas y seleccionar las que tienen la propiedad favorite:true         
            
            const movie = movies.find(movie => movie.id == e.target.dataset.buttonid)
            
            //console.log( movie.favorite )
            console.log(e.target)            
            
            //console.log( "estado anterior:", movie.favorite )            
            changeProperties(movie)
            //console.log( "now:", movie.favorite )
            //console.log(movies)

            let favFilteredMovie = filterByProperty(movies) //|| JSON.parse(localStorage.getItem("favFilteredMovie"))
            console.log(favFilteredMovie);
            
            const titleMoviesFiltrados = filterTitleMovies(movies, $input.value)
            const genresMoviesFiltrados = filterGenresMovies(titleMoviesFiltrados, $select.value)
            renderCards(genresMoviesFiltrados, $div, createCard)
            
            if ($select.value == "none") {
                const titleMoviesFiltrados = filterTitleMovies(movies, $input.value)
                renderCards(titleMoviesFiltrados, $div, createCard)
            }
            movies = localStorage.setItem("movies", JSON.stringify(movies))
            localStorage.setItem("favFilteredMovie", JSON.stringify(favFilteredMovie))
            //favFilteredMovie = JSON.parse(localStorage.getItem("favFilteredMovie"))
        })
  
    })
    .catch((error) => console.log('error:', error))


function createOptions(genres) {
    return `<option value="${genres}">${genres}</option>`
}

function createCard(movie) {
    const article = document.createElement(`article`)
    article.className = "relative mt-[15px] flex w-[300px] flex-col gap-2 rounded-md border-2 border-violet-600 bg-violet-400"

    const img = document.createElement(`img`)
    img.setAttribute("src", "https://moviestack.onrender.com/static/" + movie.image)
    img.setAttribute("alt", `Image of ${movie.title}`)
    img.className = "rounded-t-md"

    const h3 = document.createElement(`h3`)
    h3.textContent = `${movie.title}`
    h3.className = "text-black font-bold px-2 text-lg line-clamp-1"

    const h4 = document.createElement(`h4`)
    h4.textContent = `${movie.tagline}`
    h4.className = "text-black font-medium px-2 line-clamp-1"

    const p = document.createElement(`p`)
    p.textContent = `${movie.overview}`
    p.className = "text-black px-2 pb-1 line-clamp-3"

    const anchor = document.createElement(`a`)
    anchor.textContent = `More details`
    anchor.className = "text-black px-2 pb-2 underline text-violet-600"
    anchor.setAttribute("href",`./details.html?id=${movie.id}`)

    const button = document.createElement(`button`)
    button.textContent = `❤`
    button.className = `w-11 h-11 absolute self-end mt-1 mr-1 bg-violet-950 rounded-full ${movie.color || "text-white"} text-4xl`
    
    button.setAttribute("data-buttonid", `${movie.id}`)

    article.append(img, h3, h4, p, anchor, button)

    return article
}

function renderCards(movies, element, fn){
    const fragment = document.createDocumentFragment()

    for (const iterator of movies) {
        fragment.appendChild(fn(iterator))
    }
    
    element.innerHTML = ""

    element.appendChild(fragment)
}

function createSelect(movies, select) {
    //Array de generos sin repetidos
    const genres = (movies.map(movies => movies.genres).flat())
    const genresSet = new Set(genres)
    const genresArray = Array.from(genresSet)
    
    const fnReduce = (template, genres) => template + createOptions(genres)
    select.innerHTML = genresArray.reduce(fnReduce, `<option selected id="default" value="none" >Select a genres</option>`)
}

function filterTitleMovies(listMovies, title) {
    return listMovies.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()))
}

function filterGenresMovies(listMovies, selectGenres) {
    if(selectGenres == 0){
        return listMovies
    }else{
        return listMovies.filter(movie => movie.genres.includes(selectGenres))
    }
}

function addProperties(listMovies) {
    for (const movie of listMovies) {
        movie.favorite = false
        if (movie.favorite == false) {            
            movie.color = "text-white"
        }else{
            movie.color = "text-red-600"
        }
    }
}

function changeProperties(movie) {
    movie.favorite = !movie.favorite
    if (movie.favorite == false) {            
        movie.color = "text-white"
    }else{
        movie.color = "text-red-600"
    }
}

function filterByProperty(listMovies){
    return listMovies.filter(movie => movie.favorite == true)
}

function changeColor(movie, e, favFilteredMovie) {
    if (movie.favorite == true) {                
        e.target.className = "w-11 h-11 absolute self-end mt-1 mr-1 bg-violet-950 rounded-full text-red-600 text-4xl"
    }else{
        e.target.className = "w-11 h-11 absolute self-end mt-1 mr-1 bg-violet-950 rounded-full text-white text-4xl"
    }
}