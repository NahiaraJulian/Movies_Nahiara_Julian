const div = document.getElementById("div_movies")
const input = document.getElementById("search_input")
const select = document.getElementById("genres_select")

function createCard(movie) {
    const article = document.createElement(`article`)
    article.className = "mt-[15px] flex w-[300px] flex-col gap-2 rounded-md border-2 border-violet-600 bg-violet-400"

    const img = document.createElement(`img`)
    img.setAttribute("src", movie.image)
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

    article.append(img, h3, h4, p, anchor)

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
renderCards(movies, div, createCard)

//Array de generos sin repetidos
const genres = (movies.map(movies => movies.genres).flat())
const genresSet = new Set(genres)
const genresArray = Array.from(genresSet)

function createOptions(genres) {
    return `<option value="${genres}">${genres}</option>`
}

const fnReduce = (template, genres) => template + createOptions(genres)
select.innerHTML = genresArray.reduce(fnReduce, `<option selected id="default" value="none" >Select a genres</option>`)



//detectar el evento
input.addEventListener(`input`, () => {
    //filtrar por titulo
    const titleMoviesFiltrados = filterTitleMovies(movies, input.value)
    //filtrar por genero
    const genresMoviesFiltrados = filterGenresMovies(titleMoviesFiltrados, select.value)
    //mostrar las cards de las peliculas
    renderCards(genresMoviesFiltrados, div, createCard)

    if (select.value == "none") {
        const titleMoviesFiltrados = filterTitleMovies(movies, input.value)
        renderCards(titleMoviesFiltrados, div, createCard)
    }
})

//detectar el evento
select.addEventListener(`change`, () => {
    //filtrar por genero
    const genresMoviesFiltrados = filterGenresMovies(movies, select.value)
    //filtrar por titulo
    const titleMoviesFiltrados = filterTitleMovies(genresMoviesFiltrados, input.value)
    //mostrar las cards filtradas
    renderCards(titleMoviesFiltrados, div, createCard)

    if (select.value == "none") {
        renderCards(movies, div, createCard)
    }
})



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