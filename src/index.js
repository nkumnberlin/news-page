const apiKey = "8566b11f65a14d54b8be47b1c01db39e";
const main = document.querySelector('main');
var url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

window.addEventListener('load', ev => {
    updateNews();
})

async function updateNews() {
    console.log("url: ", url);
    const response = await fetch(url);
    const json = response.json();

    main.innerHTML = json.articles.map(createArticles).join('\n');
}

function createArticles(article) {
    return `
    <div class="article">
        <a href="${article.url}">
            <h2>${article.title}</h2>
                <img src="${article.urlToImage}">
                <p> ${article.description}</p>
        </a>
    </div>`

}