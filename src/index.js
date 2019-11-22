import {awsQueryLanguage, awsQuerySpecificHeadlines} from '../src/api/AwsBackendAPI.jsx';
import _ from 'lodash'
import {changeResortButton,reloadPageSnackbar, reloadPageOnError, showSpinner, renderMain, noContentAvailable, selectChoices, createSourceButtons, createOverlayContent} from '../src/renderHTML/RenderHTMLContent.js';

const main = document.querySelector('main');
const defaultSource = "der-tagesspiegel";
const sourceSelector = document.querySelector('.dropdown-menu');
const languages = {lang: [{id: "de", name: "Deutsch"}, {id: "en", name: "Englisch"}]};
const categories = {cat: [{id: "business", name: "Wirtschaft" }, {id: "entertainment", name: "Unterhaltung"}, {id:"general", name: "Allgemein"},
        {id: "health", name: "Gesundheit"}, {id: "science", name: "Wissenschaft"}, {id: "sports", name: "Sport"},
        {id:"technology", name:"Technologie"}, {id: undefined, name: "Keine Präferenz"}]};
const overlayContent = {languageOverlay:"In welcher Sprache möchtest du deine News?", categoryOverlay: "Welche Themenbereiche interessieren dich?"};

let initialSourcesLanguageJSON = "";
let initalHeadlinesJSON = "";
let currentLanguageChoice = "de", currentCategoryChoice = "", activeSource = "";

window.addEventListener('load', ev => {
    init();
    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('sw.js');
            console.log('Service Worker Registered')
        } catch (e) {
            console.error('Registration failed')
        }
    }
})

function init() {
    overlayLanguage();
};

function showSpinnerIndex(hide) {
    let overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
    overlay.innerHTML = showSpinner();
}

function hideSpinnerIndex(hide) {
    setTimeout(function (){
        let overlay = document.getElementById('overlay');
        overlay.style.display = 'none';
        overlay.innerHTML = showSpinner();
        }, 2000)

}

function overlayLanguage() {
    let overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
    overlay.innerHTML = createOverlayContent(overlayContent.languageOverlay);
    let overlayOptions = document.getElementById('overlay-options');
    overlayOptions.innerHTML = languages.lang.map( lang => selectChoices(lang)).join('\n');
    document.getElementById('button-accept').addEventListener( 'click', ev => {
        currentLanguageChoice = overlayOptions.options[overlayOptions.selectedIndex].value;
        overlayCategory(overlay)
    })
}


function overlayCategory(overlay) {
    document.getElementById('newsOf').innerHTML = "";
    document.querySelector('main').innerHTML = "";
    overlay.innerHTML = createOverlayContent(overlayContent.categoryOverlay);
    let overlayOptions = document.getElementById('overlay-options');
    overlayOptions.innerHTML = categories.cat.map( categories => selectChoices(categories)).join('\n')
    document.getElementById('button-accept').addEventListener('click', ev => {
        currentCategoryChoice = overlayOptions.options[overlayOptions.selectedIndex].value;
        overlay.style.display = 'none';
        updateSources();
    })
}

async function updateNotifier() {
    showSpinnerIndex();
    let updatedHeadlinesJSON = await awsQuerySpecificHeadlines(activeSource, initalHeadlinesJSON)
        .then(hideSpinnerIndex())
        .catch(reason => {
            document.getElementById('snackbar').innerHTML = reloadPageOnError(reason)
        });
    eventListenerToReloadPage(updatedHeadlinesJSON);
}

function eventListenerToReloadPage(updatedHeadlinesJSON){
    let snackbar = document.getElementById('snackbar');
    snackbar.innerHTML = reloadPageSnackbar();
    document.getElementById('reloadPage').addEventListener('click', ev => {
        ev.preventDefault();
        renderMain(updatedHeadlinesJSON, initalHeadlinesJSON)
        initalHeadlinesJSON = updatedHeadlinesJSON;
        reAdjustNews();
        console.log('News wurden aktualisiert');
        snackbar.classList.remove('show')
    })
    _.isEqual(initalHeadlinesJSON, updatedHeadlinesJSON) ?
        console.log("snackbar hide"):
        snackbar.className = 'show';
};

//https://blog.aylien.com/getting-started-news-api-part-3-advanced-search/

async function updateSources() {
    const queryPackage = {"language": currentLanguageChoice, "category": currentCategoryChoice};
    showSpinnerIndex();
    initialSourcesLanguageJSON = await awsQueryLanguage(queryPackage)
        .then(hideSpinnerIndex())
        .catch(reason => {
            document.getElementById('snackbar').innerHTML = reloadPageOnError(reason)
        }
    );
    sourceSelector.addEventListener('click', evt => {
            if (evt.target.id !== 'resortChange') {
                activeSource = evt.target.id;
                changeActiveElement(evt);
                showSpecificHeadlines(activeSource);
            } else {
                let overlay = document.getElementById('overlay');
                overlay.style.display = 'block';
                overlayCategory(overlay);
            }
        }
    );
    addSourcesToButton();
}

function addSourcesToButton() {
    sourceSelector.innerHTML = initialSourcesLanguageJSON.sources.map(
        src => createSourceButtons(src)).join('\n')
    sourceSelector.innerHTML += changeResortButton();
    if (initialSourcesLanguageJSON.sources.length === 0){
        main.innerHTML = noContentAvailable();
    }
}

function changeActiveElement(evt){
    let elems = document.querySelectorAll(".active");
    [].forEach.call(elems, function(el) {
        el.classList.remove("active");
    });
    evt.target.className += ' active'
}

async function showSpecificHeadlines(source = defaultSource) {
    let id = source;
    if (typeof source.target !== "undefined") {
        id = source.target.id
    }
    showSpinnerIndex();
    initalHeadlinesJSON = await awsQuerySpecificHeadlines(activeSource)
        .then(hideSpinnerIndex())
        .catch(reason => {
        document.getElementById('snackbar').innerHTML = reloadPageOnError(reason)
    });
    renderMain(initalHeadlinesJSON, initalHeadlinesJSON)
    reAdjustNews();

    setInterval(updateNotifier, 150000, initalHeadlinesJSON);
}

function reAdjustNews(){
    let textClass = document.querySelectorAll('.col-md-7');
    let imageClass = document.querySelectorAll('.col-md-5');
    for(let  i in textClass ){
        if(i % 2 == 0 ){
            textClass[i].className += " order-md-2";
            imageClass[i].className += " order-md-1";
        }
    }
}
