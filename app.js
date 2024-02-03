const accessKey = "gaLD7V81pu80N_afKJMIY_QpKPCkqe1hjWQw7wdPTRw";

const form = document.querySelector("form");
const input = document.querySelector(".search-input");
const searchResults = document.querySelector(".search-results");
const searchBtn = document.querySelector(".search-button");
const showMoreBtn = document.querySelector(".show-more-button");

let inputData = "";
let page = 1;


async function searchImages(){
    inputData = input.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results

    if(page === 1){
        searchResults.innerHTML = ""
    }

    results.map( (result) => {
        const imageWraper = document.createElement("div");
        imageWraper.classList.add("search-result");

        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWraper.appendChild(image);
        imageWraper.appendChild(imageLink);
        searchResults.appendChild(imageWraper);
    })

    page++
    if(page > 1){
        showMoreBtn.style.display = "block";
    }
}


form.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
})

showMoreBtn.addEventListener("click", () => {
    searchImages();
})