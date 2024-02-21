const main = document.getElementById("contenedormain")

function createCard(movie) {
    const article = document.createElement(`article`)
    //article.className = ""  agregar clases

    const img = document.createElement(`img`)
    img.setAttribute("src", movie.image)
    img.setAttribute("alt", `Image of ${movie.title}`)

    const h3 = document.createElement(`h3`)
    h3.textContent = `${movie.title}`

    const h4 = document.createElement(`h4`)
    h4.textContent = `${movie.tagline}`

    const p = document.createElement(`p`)
    p.textContent = `${movie.overview}`

    article.append(img, h3, h4, p)

    return article
}

//console.log(createCard(movies[0]))

function renderCards(movies, element, fn){
    const fragment = document.createDocumentFragment()

    for (const iterator of movies) {
        fragment.appendChild(fn(iterator))
    }

    element.appendChild(fragment)
}

renderCards(movies, main, createCard)
