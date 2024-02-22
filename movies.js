const main = document.getElementById("contenedormain")

function createCard(movie) {
    const article = document.createElement(`article`)
    article.className = "w-[300px] mt-[15px] flex flex-col gap-[5px] border-2 rounded-md border-violet-400 text-white"

    const img = document.createElement(`img`)
    img.setAttribute("src", movie.image)
    img.setAttribute("alt", `Image of ${movie.title}`)

    const h3 = document.createElement(`h3`)
    h3.textContent = `${movie.title}`
    h3.className = "font-bold"

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
