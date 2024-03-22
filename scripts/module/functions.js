export function createCard(movie) {
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

export function renderCards(movies, element, fn){
    const fragment = document.createDocumentFragment()

    for (const iterator of movies) {
        fragment.appendChild(fn(iterator))
    }
    
    element.innerHTML = ""

    element.appendChild(fragment)
}

export function createOptions(genres) {
    return `<option value="${genres}">${genres}</option>`
}

export function filterTitleMovies(listMovies, title) {
    return listMovies.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()))
}

export function filterGenresMovies(listMovies, selectGenres) {
    if(selectGenres == 0){
        return listMovies
    }else{
        return listMovies.filter(movie => movie.genres.includes(selectGenres))
    }
}

export function createDetails(div, movieFind) {
    const imgn = "https://moviestack.onrender.com/static/" + movieFind.image
    div.innerHTML = `
    <img src="${imgn}" alt="Image of ${movieFind.title}" class="mx-2 rounded-md border border-violet-600 md:object-cover md:w-2/5" />
        <div class="flex flex-col gap-2 md:w-[50%] md:items-start">
            <h3 class="px-2 text-2xl font-bold text-white">${movieFind.title} </h3>
            <h4 class="px-2 text-lg font-medium text-white">${movieFind.tagline}</h4>
            <p class="px-2 pb-2 text-white text-violet-400">${movieFind.genres.join(`, `)}</p>
            <p class="px-2 pb-2 text-white">${movieFind.overview}</p>
        </div>

        <table class="text-white mx-2 md:w-2/5">
            <thead class="border border-violet-600">
                <td class="w-36 border border-violet-600 pl-1">Original languaje</td>
                <td class="w-36 border border-violet-600 pl-1">${movieFind.original_language}</td>
            </thead>
            <tbody>
                <tr>
                    <td class="border border-violet-600 pl-1">Release date</td>
                    <td class="border border-violet-600 pl-1">${movieFind.release_date}</td>
                </tr>

                <tr>
                    <td class="border border-violet-600 pl-1">Runtime</td>
                    <td class="border border-violet-600 pl-1">${movieFind.runtime} mins</td>
                </tr>

                <tr>
                    <td class="border border-violet-600 pl-1">Status</td>
                    <td class="border border-violet-600 pl-1">${movieFind.status}</td>
                </tr>
            </tbody>
        </table>

        <table class="text-white mx-2 md:w-[50%]">
            <thead>              
                <tr>
                    <td class="w-36 border border-violet-600 pl-1">Vote average</td>
                    <td class="w-36 border border-violet-600 pl-1">${movieFind.vote_average} %</td>
                </tr>

                <tr>
                    <td class="border border-violet-600 pl-1">Budget</td>
                    <td class="border border-violet-600 pl-1">USD ${movieFind.budget.toLocaleString()}</td>
                </tr>

                <tr>
                    <td class="border border-violet-600 pl-1">Revenue</td>
                    <td class="border border-violet-600 pl-1">USD ${movieFind.revenue.toLocaleString()}</td>
                </tr>
            </thead>
        </table>
    `
}