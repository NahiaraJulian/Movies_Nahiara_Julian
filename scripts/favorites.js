const $div = document.getElementById("div_movies_favs")
//const $input = document.getElementById("search_input")
//const $select = document.getElementById("genres_select")
//const buttons = document.querySelectorAll("button")

const url = "https://moviestack.onrender.com/api/movies"
const init = {
    method: "GET",
    headers : {"x-api-key":"0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"},
}

let movies = JSON.parse(localStorage.getItem("movies")) || []

if ($div.innerHTML == "") {
    console.log("add movies");
    console.log($div)
    $div.innerHTML = `<a class="flex justify-center items-center border-violet-500 border-e-4 border-b-4 rounded-full bg-violet-400 w-64 h-10 font-semibold raleway" href="./movies.html">Add your favorites movies ❤</a>`
}

fetch (url, init)
    .then((resolve) => resolve.json())
    .then ((data) => {
        movies = JSON.parse(localStorage.getItem("movies")) || data.movies
        console.log(movies);
        //renderCards(movies, $div, createCard)
        let favFilteredMovie =JSON.parse(localStorage.getItem("favFilteredMovie"))  //filterByProperty(movies) || 
        console.log(favFilteredMovie);
        renderCards(favFilteredMovie, $div, createCard)
        addProperties(movies)
       
        //movies = JSON.parse(localStorage.getItem("movies"))
        //console.log(movies)                

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
            
            renderCards(favFilteredMovie, $div, createCard)
            movies = localStorage.setItem("movies", JSON.stringify(movies))
            localStorage.setItem("favFilteredMovie", JSON.stringify(favFilteredMovie))
            //favFilteredMovie = JSON.parse(localStorage.getItem("favFilteredMovie"))
            if ($div.innerHTML == "") {
                console.log("add movies");
                console.log($div)
                $div.innerHTML = `<a class="flex justify-center items-center border-violet-500 border-e-4 border-b-4 rounded-full bg-violet-400 w-64 h-10 font-semibold raleway" href="./movies.html">Add your favorites movies ❤</a>`
            }
        })
  
    })
    .catch((error) => console.log('error:', error))



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

function crearteButton(div){
    div.innerHTML = `<div class="mt-12 w-full flex flex-col items-center gap-5 md:flex-row md:justify-center md:gap-28" >
    <a class="flex justify-center items-center border-violet-500 border-e-4 border-b-4 rounded-full bg-violet-400 w-64 h-10 font-semibold raleway" href="./movies.html">Add your favorites movies ❤</a>
    </div>`
}
