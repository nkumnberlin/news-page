
export function createArticles(article) {
        return `
    <div class="card col-md-3 newsCard">
        <a href="${article.url}">
            <h2 class="cardTitle">${article.title}</h2>
        <hr/>
                <img class="card-img-top imageTop" src="${article.urlToImage}">
                </hr>
                <p> ${article.description}</p>
        </a>
    </div>`
}

export function selectChoices(options) {
    return `
         <option value="${options.id}" id="${options.id}">${options.name}</option>
    `
};

export function createOverlayContent(content){
  return `
    <div class="overlay-text">
                <div class="container">
                    <div class="row">
                    <p class="text-center" > ${content} </p>
                    <div class="col-sm-8">
                        <div class="select">
                            <select class="select-text" required id="overlay-options">
                            </select>
                            <span class="select-highlight"></span>
                            <span class="select-bar"></span>
                        </div>
                    </div>
                        <div class="col-sm-4">
                           <button type="button" id="button-accept" class="btn btn-secondary">Accept</button>
                        </div>
                    </div>
                </div>
            </div>`
};

export function createSourceButtons(src){
    return `<li type="button" class="list-group-item" id="${src.id}"> ${src.name}</li>`
}

export function changeResortButton() {
    return `<br\><br\><br\><li type="button" class="list-group-item" id="resortChange"> Resort wechslen</li>`
}

export function noContentAvailable() {
    document.getElementById('newsOf').innerHTML = ""
    return `<div class="alert alert-primary" role="alert">
        Aktuell sind keine Quellen für dieses Resort vorhanden. Bitte wähle ein anderes.
    </div>`
}

export function renderMain(json, initalHeadlines) {
    const main = document.querySelector('main');
    document.getElementById('newsOf').innerText = "Nachrichten von " + '"'+ initalHeadlines.articles[0].source.name + '"'
    main.innerHTML = json.articles.map(article => createArticles(article)).join('\n');
}