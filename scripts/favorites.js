const $div = document.getElementById("div_movies")
/*
const url = "https://moviestack.onrender.com/api/movies"
const init = {
    method: "GET",
    headers : {"x-api-key":"0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"},
}
*/
let favsmovies = JSON.parse(localStorage.getItem("favFilteredMovie")) || []
console.log(favsmovies)
renderCards(favsmovies, $div, createCard)
/*
fetch (url, init)
    .then((resolve) => resolve.json())
    .then ((data) => {
        movies = data.movies
        console.log(movies);
        renderCards(movies, $div, createCard)
        
        addPropertyFav(movies)

        const buttons = document.querySelectorAll("button")
        let favsMovies = []
        //const article = document.querySelectorAll("article")
        
        /*
        console.log(buttons)
        for (const buttonFav of buttons) {
            buttonFav.addEventListener(`click`, () => {
                console.log(buttonFav)
                const newClass = "w-11 h-11 absolute self-end mt-1 mr-1 bg-violet-950 rounded-full text-red-600 text-4xl"            
                if (buttonFav.className.includes("text-white")) {
                    buttonFav.className = newClass
                }else{
                    buttonFav.className = "w-11 h-11 absolute self-end mt-1 mr-1 bg-violet-950 rounded-full text-white text-4xl"
                }                        
            })
        }*/

  /*     

        $div.addEventListener(`click`, (e) => {
            console.log(e.target.dataset);
            //buscar la pelicula que se le hace click al boton
            // cambiarle la propiedad favorite a true a la pelicula encontrada
            //evaluar todas las movies que tengan la propiedad fav:true y agregarlas a un array

            
            const movie = movies.find(movie => movie.id == e.target.dataset.buttonid)
            //const buttonFavo = movies.find( button => dataset.buttonid == movie.id )
            //console.log(buttonFavo);
            //console.log( movie.favorite )
            console.log(movie)

            //changePropertyFav(movie)
            console.log( "estado anterior:", movie.favorite )
            movie.favorite = !movie.favorite
            console.log( "now:", movie.favorite )
            
           
                     
        })
        
        

        /*
         if (movie.favorite == true) {
                favsMovies.push(movie)
                console.log(favsMovies)
            }
         */  /*
    })
    .catch((error) => console.log('error:', error))

*/

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
    button.className = "w-11 h-11 absolute self-end mt-1 mr-1 bg-violet-950 rounded-full text-red-600 text-4xl"
    //button.setAttribute("id", "button_fav")
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

function addPropertyFav(listMovies) {
    for (const movie of listMovies) {
        movie.favorite = false
    }
}
