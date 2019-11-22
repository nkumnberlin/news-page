export function createArticlesLeft(article) {
        return `
        <hr class="featurette-divider">
        <div class="row featurette">
            <div class="col-md-7">
                <h2 class="featurette-heading">${article.title}</h2>
                <p class="lead">${article.description}<p>
            </div>
            <div class="col-md-5">
                <img class="featurette-image img-fluid mx-auto" href="${article.url}" src="${article.urlToImage}">
            </div>
        </div>`
}

export function createArticlesRight(article, i) {
    return `<hr class="featurette-divider">
                <div class="row featurette">
                 <div class="col-md-7 order-md-2">
                         <a href="${article.url}">
                   <h2 class="featurette-heading">${article.title}</h2>
                <p class="lead">${article.description}<p>
                </div>
            <div class="col-md-5 order-md-1">
                            <img class="featurette-image img-fluid mx-auto"  src="${article.urlToImage}">
            </div>
            </div>
`}

export function selectChoices(options) {
    return `
         <option value="${options.id}" id="${options.id}">${options.name}</option>
    `
};

export function createOverlayContent(content){
  return `    <div class="overlay-text">
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
    return `<a class="dropdown-item" href='#' id="${src.id}"> ${src.name}</a>`
}

export function changeResortButton() {
    return `<br\><br\><br\><a class="dropdown-item" id="resortChange"> Resort wechslen</a>`
}

export function noContentAvailable() {
    document.getElementById('newsOf').innerHTML = ""
    return `<div class="alert alert-primary" role="alert">
        Aktuell sind keine Quellen für dieses Resort vorhanden. Bitte wähle ein anderes.
    </div>`
}

export function renderMain(json, initalHeadlines) {
    const main = document.querySelector('main');
    document.getElementById('newsOf').innerText = "Nachrichten von " + '"' + initalHeadlines.articles[0].source.name + '"'
    let articles = json.articles.map(article => createArticlesLeft(article)).join('\n');
    main.innerHTML = articles;
}