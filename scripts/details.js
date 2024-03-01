const urlParams = new URLSearchParams(location.search)
const id = urlParams.get(`id`)
const div = document.getElementById(`div_details`)

const url = "https://moviestack.onrender.com/api/movies"
const init = {
    method: "GET",
    headers : {"x-api-key":"0ff70d54-dc0b-4262-9c3d-776cb0f34dbd"},
}

let movies = []

fetch (url, init)
    .then((resolve) => resolve.json())
    .then ((data) => {
        movies = data.movies
        console.log(movies);

        const movieFind = movies.find(movie => movie.id == id)
        console.log(movieFind);

        createDetails(div,movieFind)
    })
    .catch((error) => console.log('error:', error))




function createDetails(div, movieFind) {
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
