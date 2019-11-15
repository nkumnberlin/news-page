
export function createArticles(article) {
    return `
    <div class="card col-sm-4 shadow-sm">
        <a href="${article.url}">
            <h2>${article.title}</h2>
        <hr/>
                <img class="card-img-top imageTop" src="${article.urlToImage}">
                </hr>
                <p> ${article.description}</p>
        </a>
    </div>`
}

export function customerChoices() {
    return `
    <div class="overlay-text"> 
        <div class="container">
        <p class="text-center"> In welcher Sprache möchtest du deine News? </p>
            <div class="row btn-choice-language">
                <button type="button" class="btn btn-secondary col-sm-6" id="en"> Englisch</button>
                <button type="button" class="btn btn-secondary col-sm-6" id="de"> Deutsch</button>
            </div>
        </div>
    </div>
    `
};

export function createSourceButtons(src){
    return `<button type="button" class="list-group-item list-group-item-action" id="${src.id}"> ${src.name}</button>`
}
