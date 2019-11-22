export function createArticlesLeft(article) {
        return `
        <hr class="featurette-divider">
        <div class="row featurette">
            <div class="col-md-7">
                <h2 class="featurette-heading">${article.title}</h2>
               <p class="lead"> 
                <a href="${article.url}" target="_blank">
                ${article.description}
                <p>
                </a>
            </div>
            <div class="col-md-5">
            <a href="${article.url}" target="_blank">
                <img class="featurette-image img-fluid mx-auto" href="${article.url}" src="${article.urlToImage}">
            </div>
            </a>
        </div>`
}

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
export function reloadPageSnackbar() {
    return `<p> Neuer Inhalt vorhanden </p>
                <br/>
            <button class="btn btn-primary" type="button" id="reloadPage">Reload Page</button>`
}

export function reloadPageOnError(reason) {
    debugger
    return `<p> An error occured: ${reason}</p>
                <br/>
            <button class="btn btn-primary" type="button" id="reloadPage">Reload Page</button>`
}

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

export function showSpinner() {
    return `
<div class="overlay-text">
    <div class="container">
        <div class="row">
          <div class="spinner-grow text-muted"></div>
              <div class="spinner-grow text-primary"></div>
              <div class="spinner-grow text-success"></div>
              <div class="spinner-grow text-info"></div>
              <div class="spinner-grow text-warning"></div>
              <div class="spinner-grow text-danger"></div>
              <div class="spinner-grow text-secondary"></div>
          </div>
    </div>
</div>
   `
}