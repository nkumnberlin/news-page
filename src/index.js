import {awsQueryLanguage, awsQuerySpecificHeadlines} from '../src/api/AwsBackendAPI.jsx'
import {createArticles, customerChoices, createSourceButtons} from '../src/renderHTML/RenderHTMLContent.js';

const apiKey = "8566b11f65a14d54b8be47b1c01db39e";
const main = document.querySelector('main');
const defaultSource = "der-tagesspiegel";
const sourceSelector = document.querySelector('#sourceSelector');
const languagesAvailable = ['de', 'en']

let initialSourcesLanguageJSON = "";
let initalHeadlinesJSON = "";
let urlNews = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
let currentLanguageChoice = "", categorySource;

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
    let actionButtons = document.getElementById('overlay');
    actionButtons.style.display = 'block';
    actionButtons.innerHTML = customerChoices();

    for (let i in languagesAvailable) {
        document.getElementById(languagesAvailable[i]).addEventListener('click', ev => {
            ev.preventDefault();
            currentLanguageChoice = ev.target.id;
            actionButtons.style.display = 'none';
            updateSources();
        })
    }
};

function updateNotifier() {
    let url = "amazon";
    document.getElementById('reloadPage').addEventListener('click', ev => {
        ev.preventDefault();
        location.reload();
    })
    console.log("ASYNC FUNCTION")
    //      const response = await fetch(url);
    //      const json = await response.json();
    // if ("unterschied json zu vorher") {
    let snackbar = document.getElementById('snackbar')
    snackbar.className = 'show';
    //}
};

//https://blog.aylien.com/getting-started-news-api-part-3-advanced-search/

async function updateSources() {
    const queryPackage = {"language": currentLanguageChoice, "apiKey": apiKey};
    initialSourcesLanguageJSON = await awsQueryLanguage(queryPackage);
    sourceSelector.innerHTML = initialSourcesLanguageJSON.sources.map(
        src => createSourceButtons(src)).join('\n')
    sourceSelector.addEventListener('click', showSpecificHeadlines, false)
}


async function showSpecificHeadlines(source = defaultSource) {
    let id = source;
    if (typeof source.target !== "undefined") {
        id = source.target.id
    }
    const queryPackage = {"id": id, "apiKey": apiKey};
    initalHeadlinesJSON = await awsQuerySpecificHeadlines(queryPackage);
    renderMain(initalHeadlinesJSON)
    //interval
    console.log("timeout")


    //show
    //nach 5 sek, 3 sek
    setTimeout(function () {
            setInterval(function () {
                updateNotifier()
            }, 3000);
        }, 5000
    )
    //https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=8566b11f65a14d54b8be47b1c01db39e
}

function renderMain(json) {
    main.innerHTML = json.articles.map(article => createArticles(article)).join('\n');
}