const apiKey = "8566b11f65a14d54b8be47b1c01db39e";
const main = document.querySelector('main');
const defaultSource = "der-tagesspiegel";
const sourceSelector = document.querySelector('#sourceSelector');
const languagesAvailable = ['de', 'en']
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

function customerChoices() {
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

function updateNotifier() {
    let url = "amazon";
    document.getElementById('reloadPage').addEventListener('click', ev => {
        ev.preventDefault();
        location.reload();
    })
    setTimeout(async function () {
        console.log("ASYNC FUNCTION")
  //      const response = await fetch(url);
  //      const json = await response.json();
       // if ("unterschied json zu vorher") {
            let snackbar = document.getElementById('snackbar')
            snackbar.className = 'show';
         //}
    })
};

//https://blog.aylien.com/getting-started-news-api-part-3-advanced-search/
async function updateSources() {
    let urlSources = `https://newsapi.org/v2/sources?language=${currentLanguageChoice}&apiKey=${apiKey}`
    const response = await fetch(urlSources);
    const json = await response.json();
    /**
     const json = {
        "status": "ok",
        "sources": [{
            "id": "abc-news",
            "name": "ABC News",
            "description": "Your trusted source for breaking news, analysis, exclusive interviews, headlines, and videos at ABCNews.com.",
            "url": "https://abcnews.go.com",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "abc-news-au",
            "name": "ABC News (AU)",
            "description": "Australia's most trusted source of local, national and world news. Comprehensive, independent, in-depth analysis, the latest business, sport, weather and more.",
            "url": "http://www.abc.net.au/news",
            "category": "general",
            "language": "en",
            "country": "au"
        }, {
            "id": "aftenposten",
            "name": "Aftenposten",
            "description": "Norges ledende nettavis med alltid oppdaterte nyheter innenfor innenriks, utenriks, sport og kultur.",
            "url": "https://www.aftenposten.no",
            "category": "general",
            "language": "no",
            "country": "no"
        }, {
            "id": "al-jazeera-english",
            "name": "Al Jazeera English",
            "description": "News, analysis from the Middle East and worldwide, multimedia and interactives, opinions, documentaries, podcasts, long reads and broadcast schedule.",
            "url": "http://www.aljazeera.com",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "ansa",
            "name": "ANSA.it",
            "description": "Agenzia ANSA: ultime notizie, foto, video e approfondimenti su: cronaca, politica, economia, regioni, mondo, sport, calcio, cultura e tecnologia.",
            "url": "http://www.ansa.it",
            "category": "general",
            "language": "it",
            "country": "it"
        }, {
            "id": "argaam",
            "name": "Argaam",
            "description": "ارقام موقع متخصص في متابعة سوق الأسهم السعودي تداول - تاسي - مع تغطيه معمقة لشركات واسعار ومنتجات البتروكيماويات , تقارير مالية الاكتتابات الجديده ",
            "url": "http://www.argaam.com",
            "category": "business",
            "language": "ar",
            "country": "sa"
        }, {
            "id": "ars-technica",
            "name": "Ars Technica",
            "description": "The PC enthusiast's resource. Power users and the tools they love, without computing religion.",
            "url": "http://arstechnica.com",
            "category": "technology",
            "language": "en",
            "country": "us"
        }, {
            "id": "ary-news",
            "name": "Ary News",
            "description": "ARY News is a Pakistani news channel committed to bring you up-to-the minute Pakistan news and featured stories from around Pakistan and all over the world.",
            "url": "https://arynews.tv/ud/",
            "category": "general",
            "language": "ud",
            "country": "pk"
        }, {
            "id": "associated-press",
            "name": "Associated Press",
            "description": "The AP delivers in-depth coverage on the international, politics, lifestyle, business, and entertainment news.",
            "url": "https://apnews.com/",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "australian-financial-review",
            "name": "Australian Financial Review",
            "description": "The Australian Financial Review reports the latest news from business, finance, investment and politics, updated in real time. It has a reputation for independent, award-winning journalism and is essential reading for the business and investor community.",
            "url": "http://www.afr.com",
            "category": "business",
            "language": "en",
            "country": "au"
        }, {
            "id": "axios",
            "name": "Axios",
            "description": "Axios are a new media company delivering vital, trustworthy news and analysis in the most efficient, illuminating and shareable ways possible.",
            "url": "https://www.axios.com",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "bbc-news",
            "name": "BBC News",
            "description": "Use BBC News for up-to-the-minute news, breaking news, video, audio and feature stories. BBC News provides trusted World and UK news as well as local and regional perspectives. Also entertainment, business, science, technology and health news.",
            "url": "http://www.bbc.co.uk/news",
            "category": "general",
            "language": "en",
            "country": "gb"
        }, {
            "id": "bbc-sport",
            "name": "BBC Sport",
            "description": "The home of BBC Sport online. Includes live sports coverage, breaking news, results, video, audio and analysis on Football, F1, Cricket, Rugby Union, Rugby League, Golf, Tennis and all the main world sports, plus major events such as the Olympic Games.",
            "url": "http://www.bbc.co.uk/sport",
            "category": "sports",
            "language": "en",
            "country": "gb"
        }, {
            "id": "bild",
            "name": "Bild",
            "description": "Die Seite 1 für aktuelle Nachrichten und Themen, Bilder und Videos aus den Bereichen News, Wirtschaft, Politik, Show, Sport, und Promis.",
            "url": "http://www.bild.de",
            "category": "general",
            "language": "de",
            "country": "de"
        }, {
            "id": "blasting-news-br",
            "name": "Blasting News (BR)",
            "description": "Descubra a seção brasileira da Blasting News, a primeira revista feita pelo  público, com notícias globais e vídeos independentes. Junte-se a nós e torne- se um repórter.",
            "url": "https://br.blastingnews.com",
            "category": "general",
            "language": "pt",
            "country": "br"
        }, {
            "id": "bleacher-report",
            "name": "Bleacher Report",
            "description": "Sports journalists and bloggers covering NFL, MLB, NBA, NHL, MMA, college football and basketball, NASCAR, fantasy sports and more. News, photos, mock drafts, game scores, player profiles and more!",
            "url": "http://www.bleacherreport.com",
            "category": "sports",
            "language": "en",
            "country": "us"
        }, {
            "id": "bloomberg",
            "name": "Bloomberg",
            "description": "Bloomberg delivers business and markets news, data, analysis, and video to the world, featuring stories from Businessweek and Bloomberg News.",
            "url": "http://www.bloomberg.com",
            "category": "business",
            "language": "en",
            "country": "us"
        }, {
            "id": "breitbart-news",
            "name": "Breitbart News",
            "description": "Syndicated news and opinion website providing continuously updated headlines to top news and analysis sources.",
            "url": "http://www.breitbart.com",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "business-insider",
            "name": "Business Insider",
            "description": "Business Insider is a fast-growing business site with deep financial, media, tech, and other industry verticals. Launched in 2007, the site is now the largest business news site on the web.",
            "url": "http://www.businessinsider.com",
            "category": "business",
            "language": "en",
            "country": "us"
        }, {
            "id": "business-insider-uk",
            "name": "Business Insider (UK)",
            "description": "Business Insider is a fast-growing business site with deep financial, media, tech, and other industry verticals. Launched in 2007, the site is now the largest business news site on the web.",
            "url": "http://uk.businessinsider.com",
            "category": "business",
            "language": "en",
            "country": "gb"
        }, {
            "id": "buzzfeed",
            "name": "Buzzfeed",
            "description": "BuzzFeed is a cross-platform, global network for news and entertainment that generates seven billion views each month.",
            "url": "https://www.buzzfeed.com",
            "category": "entertainment",
            "language": "en",
            "country": "us"
        }, {
            "id": "cbc-news",
            "name": "CBC News",
            "description": "CBC News is the division of the Canadian Broadcasting Corporation responsible for the news gathering and production of news programs on the corporation's English-language operations, namely CBC Television, CBC Radio, CBC News Network, and CBC.ca.",
            "url": "http://www.cbc.ca/news",
            "category": "general",
            "language": "en",
            "country": "ca"
        }, {
            "id": "cbs-news",
            "name": "CBS News",
            "description": "CBS News: dedicated to providing the best in journalism under standards it pioneered at the dawn of radio and television and continue in the digital age.",
            "url": "http://www.cbsnews.com",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "cnbc",
            "name": "CNBC",
            "description": "Get latest business news on stock markets, financial & earnings on CNBC. View world markets streaming charts & video; check stock tickers and quotes.",
            "url": "http://www.cnbc.com",
            "category": "business",
            "language": "en",
            "country": "us"
        }, {
            "id": "cnn",
            "name": "CNN",
            "description": "View the latest news and breaking news today for U.S., world, weather, entertainment, politics and health at CNN",
            "url": "http://us.cnn.com",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "cnn-es",
            "name": "CNN Spanish",
            "description": "Lee las últimas noticias e información sobre Latinoamérica, Estados Unidos, mundo, entretenimiento, política, salud, tecnología y deportes en CNNEspañol.com.",
            "url": "http://cnnespanol.cnn.com/",
            "category": "general",
            "language": "es",
            "country": "us"
        }, {
            "id": "crypto-coins-news",
            "name": "Crypto Coins News",
            "description": "Providing breaking cryptocurrency news - focusing on Bitcoin, Ethereum, ICOs, blockchain technology, and smart contracts.",
            "url": "https://www.ccn.com",
            "category": "technology",
            "language": "en",
            "country": "us"
        }, {
            "id": "der-tagesspiegel",
            "name": "Der Tagesspiegel",
            "description": "Nachrichten, News und neueste Meldungen aus dem Inland und dem Ausland - aktuell präsentiert von tagesspiegel.de.",
            "url": "http://www.tagesspiegel.de",
            "category": "general",
            "language": "de",
            "country": "de"
        }, {
            "id": "die-zeit",
            "name": "Die Zeit",
            "description": "Aktuelle Nachrichten, Kommentare, Analysen und Hintergrundberichte aus Politik, Wirtschaft, Gesellschaft, Wissen, Kultur und Sport lesen Sie auf ZEIT ONLINE.",
            "url": "http://www.zeit.de/index",
            "category": "business",
            "language": "de",
            "country": "de"
        }, {
            "id": "el-mundo",
            "name": "El Mundo",
            "description": "Noticias, actualidad, álbumes, debates, sociedad, servicios, entretenimiento y última hora en España y el mundo.",
            "url": "http://www.elmundo.es",
            "category": "general",
            "language": "es",
            "country": "es"
        }, {
            "id": "engadget",
            "name": "Engadget",
            "description": "Engadget is a web magazine with obsessive daily coverage of everything new in gadgets and consumer electronics.",
            "url": "https://www.engadget.com",
            "category": "technology",
            "language": "en",
            "country": "us"
        }, {
            "id": "entertainment-weekly",
            "name": "Entertainment Weekly",
            "description": "Online version of the print magazine includes entertainment news, interviews, reviews of music, film, TV and books, and a special area for magazine subscribers.",
            "url": "http://www.ew.com",
            "category": "entertainment",
            "language": "en",
            "country": "us"
        }, {
            "id": "espn",
            "name": "ESPN",
            "description": "ESPN has up-to-the-minute sports news coverage, scores, highlights and commentary for NFL, MLB, NBA, College Football, NCAA Basketball and more.",
            "url": "http://espn.go.com",
            "category": "sports",
            "language": "en",
            "country": "us"
        }, {
            "id": "espn-cric-info",
            "name": "ESPN Cric Info",
            "description": "ESPN Cricinfo provides the most comprehensive cricket coverage available including live ball-by-ball commentary, news, unparalleled statistics, quality editorial comment and analysis.",
            "url": "http://www.espncricinfo.com/",
            "category": "sports",
            "language": "en",
            "country": "us"
        }, {
            "id": "financial-post",
            "name": "Financial Post",
            "description": "Find the latest happenings in the Canadian Financial Sector and stay up to date with changing trends in Business Markets. Read trading and investing advice from professionals.",
            "url": "http://business.financialpost.com",
            "category": "business",
            "language": "en",
            "country": "ca"
        }, {
            "id": "focus",
            "name": "Focus",
            "description": "Minutenaktuelle Nachrichten und Service-Informationen von Deutschlands modernem Nachrichtenmagazin.",
            "url": "http://www.focus.de",
            "category": "general",
            "language": "de",
            "country": "de"
        }, {
            "id": "football-italia",
            "name": "Football Italia",
            "description": "Italian football news, analysis, fixtures and results for the latest from Serie A, Serie B and the Azzurri.",
            "url": "http://www.football-italia.net",
            "category": "sports",
            "language": "en",
            "country": "it"
        }, {
            "id": "fortune",
            "name": "Fortune",
            "description": "Fortune 500 Daily and Breaking Business News",
            "url": "http://fortune.com",
            "category": "business",
            "language": "en",
            "country": "us"
        }, {
            "id": "four-four-two",
            "name": "FourFourTwo",
            "description": "The latest football news, in-depth features, tactical and statistical analysis from FourFourTwo, the UK&#039;s favourite football monthly.",
            "url": "http://www.fourfourtwo.com/news",
            "category": "sports",
            "language": "en",
            "country": "gb"
        }, {
            "id": "fox-news",
            "name": "Fox News",
            "description": "Breaking News, Latest News and Current News from FOXNews.com. Breaking news and video. Latest Current News: U.S., World, Entertainment, Health, Business, Technology, Politics, Sports.",
            "url": "http://www.foxnews.com",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "fox-sports",
            "name": "Fox Sports",
            "description": "Find live scores, player and team news, videos, rumors, stats, standings, schedules and fantasy games on FOX Sports.",
            "url": "http://www.foxsports.com",
            "category": "sports",
            "language": "en",
            "country": "us"
        }, {
            "id": "globo",
            "name": "Globo",
            "description": "Só na globo.com você encontra tudo sobre o conteúdo e marcas do Grupo Globo. O melhor acervo de vídeos online sobre entretenimento, esportes e jornalismo do Brasil.",
            "url": "http://www.globo.com/",
            "category": "general",
            "language": "pt",
            "country": "br"
        }, {
            "id": "google-news",
            "name": "Google News",
            "description": "Comprehensive, up-to-date news coverage, aggregated from sources all over the world by Google News.",
            "url": "https://news.google.com",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "google-news-ar",
            "name": "Google News (Argentina)",
            "description": "Completa cobertura actualizada de noticias agregadas a partir de fuentes de todo el mundo por Google Noticias.",
            "url": "https://news.google.com",
            "category": "general",
            "language": "es",
            "country": "ar"
        }, {
            "id": "google-news-au",
            "name": "Google News (Australia)",
            "description": "Comprehensive, up-to-date Australia news coverage, aggregated from sources all over the world by Google News.",
            "url": "https://news.google.com",
            "category": "general",
            "language": "en",
            "country": "au"
        }, {
            "id": "google-news-br",
            "name": "Google News (Brasil)",
            "description": "Cobertura jornalística abrangente e atualizada, agregada de fontes do mundo inteiro pelo Google Notícias.",
            "url": "https://news.google.com",
            "category": "general",
            "language": "pt",
            "country": "br"
        }, {
            "id": "google-news-ca",
            "name": "Google News (Canada)",
            "description": "Comprehensive, up-to-date Canada news coverage, aggregated from sources all over the world by Google News.",
            "url": "https://news.google.com",
            "category": "general",
            "language": "en",
            "country": "ca"
        }, {
            "id": "google-news-fr",
            "name": "Google News (France)",
            "description": "Informations complètes et à jour, compilées par Google Actualités à partir de sources d&#39;actualités du monde entier.",
            "url": "https://news.google.com",
            "category": "general",
            "language": "fr",
            "country": "fr"
        }, {
            "id": "google-news-in",
            "name": "Google News (India)",
            "description": "Comprehensive, up-to-date India news coverage, aggregated from sources all over the world by Google News.",
            "url": "https://news.google.com",
            "category": "general",
            "language": "en",
            "country": "in"
        }, {
            "id": "google-news-is",
            "name": "Google News (Israel)",
            "description": "כיסוי מקיף ועדכני של חדשות שהצטברו ממקורות בכל העולם על ידי &#39;חדשות Google&#39;.",
            "url": "https://news.google.com",
            "category": "general",
            "language": "he",
            "country": "is"
        }, {
            "id": "google-news-it",
            "name": "Google News (Italy)",
            "description": "Copertura giornalistica completa e aggiornata ottenuta combinando fonti di notizie in tutto il mondo attraverso Google News.",
            "url": "https://news.google.com",
            "category": "general",
            "language": "it",
            "country": "it"
        }, {
            "id": "google-news-ru",
            "name": "Google News (Russia)",
            "description": "Исчерпывающая и актуальная информация, собранная службой &quot;Новости Google&quot; со всего света.",
            "url": "https://news.google.com",
            "category": "general",
            "language": "ru",
            "country": "ru"
        }, {
            "id": "google-news-sa",
            "name": "Google News (Saudi Arabia)",
            "description": "تغطية شاملة ومتجددة للأخبار، تم جمعها من مصادر أخبار من جميع أنحاء العالم بواسطة أخبار Google.",
            "url": "https://news.google.com",
            "category": "general",
            "language": "ar",
            "country": "sa"
        }, {
            "id": "google-news-uk",
            "name": "Google News (UK)",
            "description": "Comprehensive, up-to-date UK news coverage, aggregated from sources all over the world by Google News.",
            "url": "https://news.google.com",
            "category": "general",
            "language": "en",
            "country": "gb"
        }, {
            "id": "goteborgs-posten",
            "name": "Göteborgs-Posten",
            "description": "Göteborgs-Posten, abbreviated GP, is a major Swedish language daily newspaper published in Gothenburg, Sweden.",
            "url": "http://www.gp.se",
            "category": "general",
            "language": "se",
            "country": "se"
        }, {
            "id": "gruenderszene",
            "name": "Gruenderszene",
            "description": "Online-Magazin für Startups und die digitale Wirtschaft. News und Hintergründe zu Investment, VC und Gründungen.",
            "url": "http://www.gruenderszene.de",
            "category": "technology",
            "language": "de",
            "country": "de"
        }, {
            "id": "hacker-news",
            "name": "Hacker News",
            "description": "Hacker News is a social news website focusing on computer science and entrepreneurship. It is run by Paul Graham's investment fund and startup incubator, Y Combinator. In general, content that can be submitted is defined as \"anything that gratifies one's intellectual curiosity\".",
            "url": "https://news.ycombinator.com",
            "category": "technology",
            "language": "en",
            "country": "us"
        }, {
            "id": "handelsblatt",
            "name": "Handelsblatt",
            "description": "Auf Handelsblatt lesen sie Nachrichten über Unternehmen, Finanzen, Politik und Technik. Verwalten Sie Ihre Finanzanlagen mit Hilfe unserer Börsenkurse.",
            "url": "http://www.handelsblatt.com",
            "category": "business",
            "language": "de",
            "country": "de"
        }, {
            "id": "ign",
            "name": "IGN",
            "description": "IGN is your site for Xbox One, PS4, PC, Wii-U, Xbox 360, PS3, Wii, 3DS, PS Vita and iPhone games with expert reviews, news, previews, trailers, cheat codes, wiki guides and walkthroughs.",
            "url": "http://www.ign.com",
            "category": "entertainment",
            "language": "en",
            "country": "us"
        }, {
            "id": "il-sole-24-ore",
            "name": "Il Sole 24 Ore",
            "description": "Notizie di economia, cronaca italiana ed estera, quotazioni borsa in tempo reale e di finanza, norme e tributi, fondi e obbligazioni, mutui, prestiti e lavoro a cura de Il Sole 24 Ore.",
            "url": "https://www.ilsole24ore.com",
            "category": "business",
            "language": "it",
            "country": "it"
        }, {
            "id": "independent",
            "name": "Independent",
            "description": "National morning quality (tabloid) includes free online access to news and supplements. Insight by Robert Fisk and various other columnists.",
            "url": "http://www.independent.co.uk",
            "category": "general",
            "language": "en",
            "country": "gb"
        }, {
            "id": "infobae",
            "name": "Infobae",
            "description": "Noticias de Argentina y del mundo en tiempo real. Información, videos y fotos sobre los hechos más relevantes y sus protagonistas. Léelo antes en infobae.",
            "url": "http://www.infobae.com/?noredirect",
            "category": "general",
            "language": "es",
            "country": "ar"
        }, {
            "id": "info-money",
            "name": "InfoMoney",
            "description": "No InfoMoney você encontra tudo o que precisa sobre dinheiro. Ações, investimentos, bolsas de valores e muito mais. Aqui você encontra informação que vale dinheiro!",
            "url": "https://www.infomoney.com.br",
            "category": "business",
            "language": "pt",
            "country": "br"
        }, {
            "id": "la-gaceta",
            "name": "La Gaceta",
            "description": "El diario de Tucumán, noticias 24 horas online - San Miguel de Tucumán - Argentina - Ultimo momento - Ultimas noticias.",
            "url": "http://www.lagaceta.com.ar",
            "category": "general",
            "language": "es",
            "country": "ar"
        }, {
            "id": "la-nacion",
            "name": "La Nacion",
            "description": "Información confiable en Internet. Noticias de Argentina y del mundo - ¡Informate ya!",
            "url": "http://www.lanacion.com.ar",
            "category": "general",
            "language": "es",
            "country": "ar"
        }, {
            "id": "la-repubblica",
            "name": "La Repubblica",
            "description": "Breaking News, Latest News and Current News from FOXNews.com. Breaking news and video. Latest Current News: U.S., World, Entertainment, Health, Business, Technology, Politics, Sports.",
            "url": "http://www.repubblica.it",
            "category": "general",
            "language": "it",
            "country": "it"
        }, {
            "id": "le-monde",
            "name": "Le Monde",
            "description": "Les articles du journal et toute l'actualit&eacute; en continu : International, France, Soci&eacute;t&eacute;, Economie, Culture, Environnement, Blogs ...",
            "url": "http://www.lemonde.fr",
            "category": "general",
            "language": "fr",
            "country": "fr"
        }, {
            "id": "lenta",
            "name": "Lenta",
            "description": "Новости, статьи, фотографии, видео. Семь дней в неделю, 24 часа в сутки.",
            "url": "https://lenta.ru",
            "category": "general",
            "language": "ru",
            "country": "ru"
        }, {
            "id": "lequipe",
            "name": "L'equipe",
            "description": "Le sport en direct sur L'EQUIPE.fr. Les informations, résultats et classements de tous les sports. Directs commentés, images et vidéos à regarder et à partager !",
            "url": "https://www.lequipe.fr",
            "category": "sports",
            "language": "fr",
            "country": "fr"
        }, {
            "id": "les-echos",
            "name": "Les Echos",
            "description": "Toute l'actualité économique, financière et boursière française et internationale sur Les Echos.fr",
            "url": "https://www.lesechos.fr",
            "category": "business",
            "language": "fr",
            "country": "fr"
        }, {
            "id": "liberation",
            "name": "Libération",
            "description": "Toute l'actualité en direct - photos et vidéos avec Libération",
            "url": "http://www.liberation.fr",
            "category": "general",
            "language": "fr",
            "country": "fr"
        }, {
            "id": "marca",
            "name": "Marca",
            "description": "La mejor información deportiva en castellano actualizada minuto a minuto en noticias, vídeos, fotos, retransmisiones y resultados en directo.",
            "url": "http://www.marca.com",
            "category": "sports",
            "language": "es",
            "country": "es"
        }, {
            "id": "mashable",
            "name": "Mashable",
            "description": "Mashable is a global, multi-platform media and entertainment company.",
            "url": "https://mashable.com",
            "category": "entertainment",
            "language": "en",
            "country": "us"
        }, {
            "id": "medical-news-today",
            "name": "Medical News Today",
            "description": "Medical news and health news headlines posted throughout the day, every day.",
            "url": "http://www.medicalnewstoday.com",
            "category": "health",
            "language": "en",
            "country": "us"
        }, {
            "id": "msnbc",
            "name": "MSNBC",
            "description": "Breaking news and in-depth analysis of the headlines, as well as commentary and informed perspectives from The Rachel Maddow Show, Morning Joe & more.",
            "url": "http://www.msnbc.com",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "mtv-news",
            "name": "MTV News",
            "description": "The ultimate news source for music, celebrity, entertainment, movies, and current events on the web. It's pop culture on steroids.",
            "url": "http://www.mtv.com/news",
            "category": "entertainment",
            "language": "en",
            "country": "us"
        }, {
            "id": "mtv-news-uk",
            "name": "MTV News (UK)",
            "description": "All the latest celebrity news, gossip, exclusive interviews and pictures from the world of music and entertainment.",
            "url": "http://www.mtv.co.uk/news",
            "category": "entertainment",
            "language": "en",
            "country": "gb"
        }, {
            "id": "national-geographic",
            "name": "National Geographic",
            "description": "Reporting our world daily: original nature and science news from National Geographic.",
            "url": "http://news.nationalgeographic.com",
            "category": "science",
            "language": "en",
            "country": "us"
        }, {
            "id": "national-review",
            "name": "National Review",
            "description": "National Review: Conservative News, Opinion, Politics, Policy, & Current Events.",
            "url": "https://www.nationalreview.com/",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "nbc-news",
            "name": "NBC News",
            "description": "Breaking news, videos, and the latest top stories in world news, business, politics, health and pop culture.",
            "url": "http://www.nbcnews.com",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "news24",
            "name": "News24",
            "description": "South Africa's premier news source, provides breaking news on national, world, Africa, sport, entertainment, technology and more.",
            "url": "http://www.news24.com",
            "category": "general",
            "language": "en",
            "country": "za"
        }, {
            "id": "new-scientist",
            "name": "New Scientist",
            "description": "Breaking science and technology news from around the world. Exclusive stories and expert analysis on space, technology, health, physics, life and Earth.",
            "url": "https://www.newscientist.com/section/news",
            "category": "science",
            "language": "en",
            "country": "us"
        }, {
            "id": "news-com-au",
            "name": "News.com.au",
            "description": "We say what people are thinking and cover the issues that get people talking balancing Australian and global moments — from politics to pop culture.",
            "url": "http://www.news.com.au",
            "category": "general",
            "language": "en",
            "country": "au"
        }, {
            "id": "newsweek",
            "name": "Newsweek",
            "description": "Newsweek provides in-depth analysis, news and opinion about international issues, technology, business, culture and politics.",
            "url": "https://www.newsweek.com",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "new-york-magazine",
            "name": "New York Magazine",
            "description": "NYMAG and New York magazine cover the new, the undiscovered, the next in politics, culture, food, fashion, and behavior nationally, through a New York lens.",
            "url": "http://nymag.com",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "next-big-future",
            "name": "Next Big Future",
            "description": "Coverage of science and technology that have the potential for disruption, and analysis of plans, policies, and technology that enable radical improvement.",
            "url": "https://www.nextbigfuture.com",
            "category": "science",
            "language": "en",
            "country": "us"
        }, {
            "id": "nfl-news",
            "name": "NFL News",
            "description": "The official source for NFL news, schedules, stats, scores and more.",
            "url": "http://www.nfl.com/news",
            "category": "sports",
            "language": "en",
            "country": "us"
        }, {
            "id": "nhl-news",
            "name": "NHL News",
            "description": "The most up-to-date breaking hockey news from the official source including interviews, rumors, statistics and schedules.",
            "url": "https://www.nhl.com/news",
            "category": "sports",
            "language": "en",
            "country": "us"
        }, {
            "id": "nrk",
            "name": "NRK",
            "description": "NRK er Norges største tilbud på nett: nyheter fra Norge og verden, lokalnyheter, radio- og tv-program, podcast, vær, helse-, kultur-, underholdning-, humor- og debattstoff.",
            "url": "https://www.nrk.no",
            "category": "general",
            "language": "no",
            "country": "no"
        }, {
            "id": "politico",
            "name": "Politico",
            "description": "Political news about Congress, the White House, campaigns, lobbyists and issues.",
            "url": "https://www.politico.com",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "polygon",
            "name": "Polygon",
            "description": "Polygon is a gaming website in partnership with Vox Media. Our culture focused site covers games, their creators, the fans, trending stories and entertainment news.",
            "url": "http://www.polygon.com",
            "category": "entertainment",
            "language": "en",
            "country": "us"
        }, {
            "id": "rbc",
            "name": "RBC",
            "description": "Главные новости политики, экономики и бизнеса, комментарии аналитиков, финансовые данные с российских и мировых биржевых систем на сайте rbc.ru.",
            "url": "https://www.rbc.ru",
            "category": "general",
            "language": "ru",
            "country": "ru"
        }, {
            "id": "recode",
            "name": "Recode",
            "description": "Get the latest independent tech news, reviews and analysis from Recode with the most informed and respected journalists in technology and media.",
            "url": "http://www.recode.net",
            "category": "technology",
            "language": "en",
            "country": "us"
        }, {
            "id": "reddit-r-all",
            "name": "Reddit /r/all",
            "description": "Reddit is an entertainment, social news networking service, and news website. Reddit's registered community members can submit content, such as text posts or direct links.",
            "url": "https://www.reddit.com/r/all",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "reuters",
            "name": "Reuters",
            "description": "Reuters.com brings you the latest news from around the world, covering breaking news in business, politics, entertainment, technology, video and pictures.",
            "url": "http://www.reuters.com",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "rt",
            "name": "RT",
            "description": "Актуальная картина дня на RT: круглосуточное ежедневное обновление новостей политики, бизнеса, финансов, спорта, науки, культуры. Онлайн-репортажи с места событий. Комментарии экспертов, актуальные интервью, фото и видео репортажи.",
            "url": "https://russian.rt.com",
            "category": "general",
            "language": "ru",
            "country": "ru"
        }, {
            "id": "rte",
            "name": "RTE",
            "description": "Get all of the latest breaking local and international news stories as they happen, with up to the minute updates and analysis, from Ireland's National Broadcaster.",
            "url": "https://www.rte.ie/news",
            "category": "general",
            "language": "en",
            "country": "ie"
        }, {
            "id": "rtl-nieuws",
            "name": "RTL Nieuws",
            "description": "Volg het nieuws terwijl het gebeurt. RTL Nieuws informeert haar lezers op een onafhankelijke, boeiende en toegankelijke wijze over belangrijke ontwikkelingen in eigen land en de rest van de wereld.",
            "url": "https://www.rtlnieuws.nl/",
            "category": "general",
            "language": "nl",
            "country": "nl"
        }, {
            "id": "sabq",
            "name": "SABQ",
            "description": "صحيفة الكترونية سعودية هدفها السبق في نقل الحدث بمهنية ومصداقية خدمة للوطن والمواطن.",
            "url": "https://sabq.org",
            "category": "general",
            "language": "ar",
            "country": "sa"
        }, {
            "id": "spiegel-online",
            "name": "Spiegel Online",
            "description": "Deutschlands führende Nachrichtenseite. Alles Wichtige aus Politik, Wirtschaft, Sport, Kultur, Wissenschaft, Technik und mehr.",
            "url": "http://www.spiegel.de",
            "category": "general",
            "language": "de",
            "country": "de"
        }, {
            "id": "svenska-dagbladet",
            "name": "Svenska Dagbladet",
            "description": "Sveriges ledande mediesajt - SvD.se. Svenska Dagbladets nyhetssajt låter läsarna ta plats och fördjupar nyheterna.",
            "url": "https://www.svd.se",
            "category": "general",
            "language": "se",
            "country": "se"
        }, {
            "id": "t3n",
            "name": "T3n",
            "description": "Das Online-Magazin bietet Artikel zu den Themen E-Business, Social Media, Startups und Webdesign.",
            "url": "https://t3n.de",
            "category": "technology",
            "language": "de",
            "country": "de"
        }, {
            "id": "talksport",
            "name": "TalkSport",
            "description": "Tune in to the world's biggest sports radio station - Live Premier League football coverage, breaking sports news, transfer rumours &amp; exclusive interviews.",
            "url": "http://talksport.com",
            "category": "sports",
            "language": "en",
            "country": "gb"
        }, {
            "id": "techcrunch",
            "name": "TechCrunch",
            "description": "TechCrunch is a leading technology media property, dedicated to obsessively profiling startups, reviewing new Internet products, and breaking tech news.",
            "url": "https://techcrunch.com",
            "category": "technology",
            "language": "en",
            "country": "us"
        }, {
            "id": "techcrunch-cn",
            "name": "TechCrunch (CN)",
            "description": "TechCrunch is a leading technology media property, dedicated to obsessively profiling startups, reviewing new Internet products, and breaking tech news.",
            "url": "https://techcrunch.cn",
            "category": "technology",
            "language": "zh",
            "country": "zh"
        }, {
            "id": "techradar",
            "name": "TechRadar",
            "description": "The latest technology news and reviews, covering computing, home entertainment systems, gadgets and more.",
            "url": "http://www.techradar.com",
            "category": "technology",
            "language": "en",
            "country": "us"
        }, {
            "id": "the-american-conservative",
            "name": "The American Conservative",
            "description": "Realism and reform. A new voice for a new generation of conservatives.",
            "url": "http://www.theamericanconservative.com/",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "the-globe-and-mail",
            "name": "The Globe And Mail",
            "description": "The Globe and Mail offers the most authoritative news in Canada, featuring national and international news.",
            "url": "https://www.theglobeandmail.com",
            "category": "general",
            "language": "en",
            "country": "ca"
        }, {
            "id": "the-hill",
            "name": "The Hill",
            "description": "The Hill is a top US political website, read by the White House and more lawmakers than any other site -- vital for policy, politics and election campaigns.",
            "url": "http://thehill.com",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "the-hindu",
            "name": "The Hindu",
            "description": "The Hindu. latest news, analysis, comment, in-depth coverage of politics, business, sport, environment, cinema and arts from India's national newspaper.",
            "url": "http://www.thehindu.com",
            "category": "general",
            "language": "en",
            "country": "in"
        }, {
            "id": "the-huffington-post",
            "name": "The Huffington Post",
            "description": "The Huffington Post is a politically liberal American online news aggregator and blog that has both localized and international editions founded by Arianna Huffington, Kenneth Lerer, Andrew Breitbart, and Jonah Peretti, featuring columnists.",
            "url": "http://www.huffingtonpost.com",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "the-irish-times",
            "name": "The Irish Times",
            "description": "The Irish Times online. Latest news including sport, analysis, business, weather and more from the definitive brand of quality news in Ireland.",
            "url": "https://www.irishtimes.com",
            "category": "general",
            "language": "en",
            "country": "ie"
        }, {
            "id": "the-jerusalem-post",
            "name": "The Jerusalem Post",
            "description": "The Jerusalem Post is the leading online newspaper for English speaking Jewry since 1932, bringing news and updates from the Middle East and all over the Jewish world.",
            "url": "https://www.jpost.com/",
            "category": "general",
            "language": "en",
            "country": "is"
        }, {
            "id": "the-lad-bible",
            "name": "The Lad Bible",
            "description": "The LAD Bible is one of the largest community for guys aged 16-30 in the world. Send us your funniest pictures and videos!",
            "url": "https://www.theladbible.com",
            "category": "entertainment",
            "language": "en",
            "country": "gb"
        }, {
            "id": "the-new-york-times",
            "name": "The New York Times",
            "description": "The New York Times: Find breaking news, multimedia, reviews & opinion on Washington, business, sports, movies, travel, books, jobs, education, real estate, cars & more at nytimes.com.",
            "url": "http://www.nytimes.com",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "the-next-web",
            "name": "The Next Web",
            "description": "The Next Web is one of the world’s largest online publications that delivers an international perspective on the latest news about Internet technology, business and culture.",
            "url": "http://thenextweb.com",
            "category": "technology",
            "language": "en",
            "country": "us"
        }, {
            "id": "the-sport-bible",
            "name": "The Sport Bible",
            "description": "TheSPORTbible is one of the largest communities for sports fans across the world. Send us your sporting pictures and videos!",
            "url": "https://www.thesportbible.com",
            "category": "sports",
            "language": "en",
            "country": "gb"
        }, {
            "id": "the-times-of-india",
            "name": "The Times of India",
            "description": "Times of India brings the Latest News and Top Breaking headlines on Politics and Current Affairs in India and around the World, Sports, Business, Bollywood News and Entertainment, Science, Technology, Health and Fitness news, Cricket and opinions from leading columnists.",
            "url": "http://timesofindia.indiatimes.com",
            "category": "general",
            "language": "en",
            "country": "in"
        }, {
            "id": "the-verge",
            "name": "The Verge",
            "description": "The Verge covers the intersection of technology, science, art, and culture.",
            "url": "http://www.theverge.com",
            "category": "technology",
            "language": "en",
            "country": "us"
        }, {
            "id": "the-wall-street-journal",
            "name": "The Wall Street Journal",
            "description": "WSJ online coverage of breaking news and current headlines from the US and around the world. Top stories, photos, videos, detailed analysis and in-depth reporting.",
            "url": "http://www.wsj.com",
            "category": "business",
            "language": "en",
            "country": "us"
        }, {
            "id": "the-washington-post",
            "name": "The Washington Post",
            "description": "Breaking news and analysis on politics, business, world national news, entertainment more. In-depth DC, Virginia, Maryland news coverage including traffic, weather, crime, education, restaurant reviews and more.",
            "url": "https://www.washingtonpost.com",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "the-washington-times",
            "name": "The Washington Times",
            "description": "The Washington Times delivers breaking news and commentary on the issues that affect the future of our nation.",
            "url": "https://www.washingtontimes.com/",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "time",
            "name": "Time",
            "description": "Breaking news and analysis from TIME.com. Politics, world news, photos, video, tech reviews, health, science and entertainment news.",
            "url": "http://time.com",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "usa-today",
            "name": "USA Today",
            "description": "Get the latest national, international, and political news at USATODAY.com.",
            "url": "http://www.usatoday.com/news",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "vice-news",
            "name": "Vice News",
            "description": "Vice News is Vice Media, Inc.'s current affairs channel, producing daily documentary essays and video through its website and YouTube channel. It promotes itself on its coverage of \"under - reported stories\".",
            "url": "https://news.vice.com",
            "category": "general",
            "language": "en",
            "country": "us"
        }, {
            "id": "wired",
            "name": "Wired",
            "description": "Wired is a monthly American magazine, published in print and online editions, that focuses on how emerging technologies affect culture, the economy, and politics.",
            "url": "https://www.wired.com",
            "category": "technology",
            "language": "en",
            "country": "us"
        }, {
            "id": "wired-de",
            "name": "Wired.de",
            "description": "Wired reports on how emerging technologies affect culture, the economy and politics.",
            "url": "https://www.wired.de",
            "category": "technology",
            "language": "de",
            "country": "de"
        }, {
            "id": "wirtschafts-woche",
            "name": "Wirtschafts Woche",
            "description": "Das Online-Portal des führenden Wirtschaftsmagazins in Deutschland. Das Entscheidende zu Unternehmen, Finanzen, Erfolg und Technik.",
            "url": "http://www.wiwo.de",
            "category": "business",
            "language": "de",
            "country": "de"
        }, {
            "id": "xinhua-net",
            "name": "Xinhua Net",
            "description": "中国主要重点新闻网站,依托新华社遍布全球的采编网络,记者遍布世界100多个国家和地区,地方频道分布全国31个省市自治区,每天24小时同时使用6种语言滚动发稿,权威、准确、及时播发国内外重要新闻和重大突发事件,受众覆盖200多个国家和地区,发展论坛是全球知名的中文论坛。",
            "url": "http://xinhuanet.com/",
            "category": "general",
            "language": "zh",
            "country": "zh"
        }, {
            "id": "ynet",
            "name": "Ynet",
            "description": "ynet דף הבית: אתר החדשות המוביל בישראל מבית ידיעות אחרונות. סיקור מלא של חדשות מישראל והעולם, ספורט, כלכלה, תרבות, אוכל, מדע וטבע, כל מה שקורה וכל מה שמעניין ב ynet.",
            "url": "http://www.ynet.co.il",
            "category": "general",
            "language": "he",
            "country": "is"
        }]
    };

     **/
    sourceSelector.innerHTML = json.sources.map(
        src => `<button type="button" class="list-group-item list-group-item-action" id="${src.id}"> ${src.name}</button>`
    ).join('\n')
    sourceSelector.addEventListener('click', showSpecificHeadlines, false)

    updateNotifier();

}

async function updateNews() {
    //const response = await fetch(urlNews);
    //const json = await response.json();
    const json = {
        "status": "ok",
        "totalResults": 38,
        "articles": [{
            "source": {"id": null, "name": "Espn.com"},
            "author": null,
            "title": "Buckeyes DE Chase Young out vs. Maryland due to potential NCAA issue - ESPN",
            "description": "Buckeyes defensive end Chase Young will not play Saturday against Maryland due to a possible NCAA issue from 2018 that the Ohio State athletic department is looking into, the school announced.",
            "url": "https://www.espn.com/college-football/story/_/id/28034200/buckeyes-de-chase-young-vs-maryland-due-potential-ncaa-issue",
            "urlToImage": "https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2019%2F1105%2Fr623789_1296x729_16%2D9.jpg",
            "publishedAt": "2019-11-08T13:35:59Z",
            "content": "Ohio State Buckeyes defensive end Chase Young, a Heisman Trophy contender who has been the most dominant defensive player in the FBS this season, is being held out because of a potential undisclosed violation of NCAA rules, the university announced Friday.\r\nY… [+1130 chars]"
        }, {
            "source": {"id": null, "name": "Youtube.com"},
            "author": null,
            "title": "The mistake that toppled the Berlin Wall - Vox",
            "description": "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
            "url": "https://www.youtube.com/watch?v=Mn4VDwaV-oo",
            "urlToImage": null,
            "publishedAt": "2019-11-08T13:00:05Z",
            "content": null
        }, {
            "source": {"id": "the-verge", "name": "The Verge"},
            "author": "Jon Porter",
            "title": "Motorola Moto G8 video leak reveals triple rear cameras - Circuit Breaker",
            "description": "A newly leaked promotional video has given us our first look at Motorola’s Moto G8. The video shows a device with a triple rear-camera array (including a main 48-megapixel sensor), and a screen with a small teardrop notch up top.",
            "url": "https://www.theverge.com/circuitbreaker/2019/11/8/20954865/motorola-moto-g8-leaks-camera-leak-news-features-teardrop-notch",
            "urlToImage": "https://cdn.vox-cdn.com/thumbor/uqz4xzW73vdjYeNZJDuplCtSHWs=/0x0:1864x976/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/19358328/moto_g8.jpg",
            "publishedAt": "2019-11-08T12:49:48Z",
            "content": "Filed under:\r\nBut theres no word on a release date\r\nImage: Evan Blass\r\nA newly leaked promotional video has given us our first look at Motorolas Moto G8, which looks set to be the third entry in the G8 lineup behind the Moto G8 Play and Moto G8 Plus that were… [+911 chars]"
        }, {
            "source": {"id": null, "name": "Youtube.com"},
            "author": null,
            "title": "Buffalo Wild Wings employee dies after exposure to cleaning chemical - CBS This Morning",
            "description": "An employee at a Buffalo Wild Wings in Massachusetts died after being exposed to a chemical cleaning agent. Hazmat crews were called to the Burlington restau...",
            "url": "https://www.youtube.com/watch?v=5FlI56yUwUs",
            "urlToImage": "https://i.ytimg.com/vi/5FlI56yUwUs/maxresdefault.jpg",
            "publishedAt": "2019-11-08T12:39:46Z",
            "content": "An employee at a Buffalo Wild Wings in Massachusetts died after being exposed to a chemical cleaning agent. Hazmat crews were called to the Burlington restaurant Thursday after reports of a chemical reaction in the kitchen. At least 10 other customers and wor… [+1311 chars]"
        }, {
            "source": {"id": null, "name": "Cheatsheet.com"},
            "author": "Stefan Preston",
            "title": "Fans Think Meghan Markle's Wedding Dress Had an Unusual Connection to Jennifer Lopez - Showbiz Cheat Sheet",
            "description": "Here's a strange connection fans have made to Meghan Markle's wedding dress and Jennifer Lopez.",
            "url": "https://www.cheatsheet.com/entertainment/fans-think-meghan-markles-wedding-dress-had-an-unusual-connection-to-jennifer-lopez.html/",
            "urlToImage": "https://www.cheatsheet.com/wp-content/uploads/2019/11/hrh-meghan-markle-1024x759.jpg",
            "publishedAt": "2019-11-08T12:04:48Z",
            "content": "It has been a year and a half since Meghan Markle’s splendid wedding ceremony, where she and Prince Harry officially tied the knot. Still, fans can’t stop talking about the fairytale event, including the celebrity guests, the multi-cultural ceremony, and, of … [+3716 chars]"
        }, {
            "source": {"id": null, "name": "Cnet.com"},
            "author": "Katie Conner",
            "title": "Black Friday: 6 Amazon Prime membership benefits that will help you shop - CNET",
            "description": "Here's how to take advantage of your yearly subscription.",
            "url": "https://www.cnet.com/how-to/black-friday-6-amazon-prime-membership-benefits-that-will-help-you-shop/",
            "urlToImage": "https://cnet2.cbsistatic.com/img/BaFR48QqxvwiotVgxjpf4RDNGpQ=/756x567/2019/11/05/7fc40948-4604-4962-b785-b55d4b22266b/04-amazon-echo-studio.jpg",
            "publishedAt": "2019-11-08T12:00:01Z",
            "content": "Your Amazon Prime benefits make Black Friday shopping easier.\r\nSarah Tew/CNET\r\nBlack Friday, a time to shop huge sales online and in stores, is almost here and Amazon already has its early deals ready to go Nov. 22. If you've got an Amazon Prime membership, y… [+3976 chars]"
        }, {
            "source": {"id": null, "name": "Livescience.com"},
            "author": "Brandon Specktor",
            "title": "Battle-Scarred Viking Shield-Maiden Gets Facial Reconstruction for First Time - Livescience.com",
            "description": "First unearthed in 1900, this 1,000-year-old Viking shield-maiden was apparently cut down in her prime.",
            "url": "https://www.livescience.com/Viking-shield-maiden-facial-reconstruction.html",
            "urlToImage": "https://cdn.mos.cms.futurecdn.net/gnri5MarQag8wU2XDrCw2T-1200-80.jpg",
            "publishedAt": "2019-11-08T12:00:00Z",
            "content": "When the sword came down upon her head, the blade cut her to the bone. Scientists studying the Viking\r\n woman's fractured skull 1,000 years later still aren't sure whether the blow actually killed her — however, the trove of weapons buried with her make it cl… [+2739 chars]"
        }, {
            "source": {"id": null, "name": "10tv.com"},
            "author": "https://www.facebook.com/TegnaInc/",
            "title": "10 hospitalized after insulin given instead of flu shots - 10TV",
            "description": "Ten people in northern Oklahoma were hospitalized after reportedly being given insulin instead of flu shots Wednesday.",
            "url": "https://www.10tv.com/article/10-hospitalized-after-insulin-given-instead-flu-shots-2019-nov",
            "urlToImage": "https://www.10tv.com/sites/default/files/styles/article_image/public/images/2017/06/21/Flu%20vaccine%20ineffective.jpg?itok=pytn_puD",
            "publishedAt": "2019-11-08T11:53:05Z",
            "content": "Ten people in northern Oklahoma were hospitalized after reportedly being given insulin instead of flu shots Wednesday.\r\nKTUL in Tulsa reports it happened at Jacquelyn House, a care facility in Bartlesville. Police say first responders arrived and found multip… [+357 chars]"
        }, {
            "source": {"id": "the-washington-post", "name": "The Washington Post"},
            "author": "Katie Shepherd",
            "title": "Trump ‘violates all recognized democratic norms,’ federal judge says in biting speech on judicial independence - The Washington Post",
            "description": "U.S. District Judge Paul Friedman slammed President Trump for political attacks on federal judges, calling his aggressive insults a threat to judicial independence.",
            "url": "https://www.washingtonpost.com/nation/2019/11/08/judge-says-trump-violates-democratic-norms-judiciary-speech/",
            "urlToImage": "https://www.washingtonpost.com/resizer/FhZChi28Vpxv1WngXcyX4tqunvY=/1440x0/smart/d1i4t8bqe7zgj6.cloudfront.net/11-08-2019/t_46bfe798def64b61b7947978c50eff25_name_trump_scaled.jpg",
            "publishedAt": "2019-11-08T11:41:00Z",
            "content": "We are in unchartered territory, said Friedman, 75, an appointee of President Bill Clinton. We are witnessing a chief executive who criticizes virtually every judicial decision that doesnt go his way and denigrates judges who rule against him, sometimes in ve… [+4726 chars]"
        }, {
            "source": {"id": "business-insider", "name": "Business Insider"},
            "author": "Theron Mohamed",
            "title": "'It seems insane now' — WeWork employees bought into cofounder Adam Neumann's vision but grew worried as red flags mounted - Business Insider",
            "description": "'It seems insane now' â WeWork employees bought into cofounder Adam Neumann's vision but grew worried as red flags mounted",
            "url": "https://markets.businessinsider.com/news/stocks/wework-employees-startup-rise-fall-new-yorker-2019-11-1028672772",
            "urlToImage": "https://images.markets.businessinsider.com/image/5dbe32a2e0ee7e45507721b3-2400/gettyimages-1079941750.jpg",
            "publishedAt": "2019-11-08T11:25:07Z",
            "content": "Michael Kovac/Getty Images for WeWork\r\n<ul><li>WeWork employees were swept up by cofounder and then-CEO Adam Neumann's wild ambitions and enthralled by his startup's cool culture and lavish perks, according to the New Yorker.</li><li>\"In retrospect, there's n… [+2896 chars]"
        }, {
            "source": {"id": null, "name": "Bbc.com"},
            "author": "https://www.facebook.com/bbcnews",
            "title": "US election 2020: Michael Bloomberg mulls presidential bid - BBC News",
            "description": "New York's former mayor is concerned current Democratic hopefuls cannot beat Donald Trump in 2020.",
            "url": "https://www.bbc.com/news/world-us-canada-50340989",
            "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/B17E/production/_109583454_057850040.jpg",
            "publishedAt": "2019-11-08T10:12:32Z",
            "content": "Image copyrightEPAImage caption\r\n Michael Bloomberg has highlighted climate change and gun control as key issues\r\nBillionaire businessman Michael Bloomberg is considering entering the race for the US Democratic Party's presidential nomination.\r\nThe ex-New Yor… [+3848 chars]"
        }, {
            "source": {"id": "politico", "name": "Politico"},
            "author": "TIM ALBERTA",
            "title": "Who Will Betray Trump? - POLITICO",
            "description": "Donald Trump knows there are potential traitors in his midst. His presidency could depend on keeping them at bay.",
            "url": "https://www.politico.com/magazine/story/2019/11/08/trump-impeachment-republicans-congress-229904",
            "urlToImage": "https://static.politico.com/51/fe/c9839d4943f5ba9a82b2eab1ad07/colorchanges.jpg",
            "publishedAt": "2019-11-08T10:10:00Z",
            "content": "Tim Alberta is chief political correspondent at Politico Magazine.\r\nFrom the moment Francis Rooney expressed alarm to his House colleagues that Donald Trump might have abused presidential power in his dealings with Ukraineand more dramatically, that an impeac… [+32016 chars]"
        }, {
            "source": {"id": null, "name": "Gamesindustry.biz"},
            "author": null,
            "title": "PlayStation to open development studio in Malaysia - GamesIndustry.biz",
            "description": "The new office will provide animation services to developers building exclusive PlayStation 5 games",
            "url": "https://www.gamesindustry.biz/articles/2019-11-08-playstation-to-open-malaysian-development-studio",
            "urlToImage": "https://images.eurogamer.net/2019/articles/2019-11-08-09-43/Screenshot_2019_11_08_at_09.43.30.png",
            "publishedAt": "2019-11-08T10:04:32Z",
            "content": "Share this article\r\nCompanies in this article\r\nSony Interactive Entertainment\r\nPlayStation will open a new development office in Malaysia in 2020.\r\nIt's the company's first Southeast Asian studio and will provide art and animation as part of Worldwide Studios… [+1735 chars]"
        }, {
            "source": {"id": "the-new-york-times", "name": "The New York Times"},
            "author": null,
            "title": "American Companies Tiptoe Toward China’s Big Shopping Day - The New York Times",
            "description": "Taylor Swift will be there. But tensions over trade and Hong Kong have made some U.S. retailers wary ahead of Singles Day.",
            "url": "https://www.nytimes.com/2019/11/08/business/media/singles-day-american-companies.html",
            "urlToImage": "https://static01.nyt.com/images/2019/11/07/business/07CHINA-ADS-02/07CHINA-ADS-02-facebookJumbo.jpg",
            "publishedAt": "2019-11-08T10:00:00Z",
            "content": "You dont want to be known as an American brand you want to be known as a Chinese brand, said Joe Tripodi, a former chief marketing officer at Coca-Cola and Subway. There will always be aspects of your brand that have dimensions of your origin, but the success… [+1572 chars]"
        }, {
            "source": {"id": "nbc-news", "name": "NBC News"},
            "author": "Phil Helsel, Alex Johnson",
            "title": "Paradise regained: A year after the Camp Fire, a resilient town rebuilds - NBC News",
            "description": "A year after the Camp Fire all but wiped Paradise, California, off the map, new homes are being built, businesses are reopening and residents are moving back.",
            "url": "https://www.nbcnews.com/news/us-news/paradise-regained-year-after-camp-fire-resilient-town-rebuilds-n1077991",
            "urlToImage": "https://media2.s-nbcnews.com/j/newscms/2019_45/3088216/191106-paradise-california-one-year-later-ew-944p_f4641a2ff83906a752b831c776f4f06b.nbcnews-fp-1200-630.jpg",
            "publishedAt": "2019-11-08T09:52:00Z",
            "content": "Mattier, whose home survived, plans to stay, and so does her sister, Flo Beauchemin, 66, who was in the process of buying a house in Paradise with her husband when the fire struck. The house remained intact and they later moved in.\r\nLet our news meet your inb… [+6188 chars]"
        }, {
            "source": {"id": "cnn", "name": "CNN"},
            "author": "Sherisse Pham, CNN Business",
            "title": "Disney says Hong Kong protests could wipe out $275 million in theme park profit - CNN",
            "description": "Hong Kong's political crisis is hitting the local Disneyland hard.",
            "url": "https://www.cnn.com/2019/11/08/business/hong-kong-protests-disney/index.html",
            "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/191108013907-disneyland-hong-kong-protests-restricted-super-tease.jpg",
            "publishedAt": "2019-11-08T09:45:00Z",
            "content": null
        }, {
            "source": {"id": "cnn", "name": "CNN"},
            "author": "Analysis by Stephen Collinson, CNN",
            "title": "Democrats' impeachment inquiry hits overdrive - CNN",
            "description": "A push by House Democrats to impeach President Donald Trump by Christmas reflects urgent political pressures but also a deeper driving force: a belief that they have got the impeachment goods on him.",
            "url": "https://www.cnn.com/2019/11/08/politics/donald-trump-impeachment-democrats-hearings-republicans/index.html",
            "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/191106205727-02-trump-rally-la-1106-super-tease.jpg",
            "publishedAt": "2019-11-08T09:29:00Z",
            "content": null
        }, {
            "source": {"id": "usa-today", "name": "USA Today"},
            "author": "Andrea Mandell",
            "title": "Too cute! Selena Gomez twinned with her 6-year-old sister at the 'Frozen 2' premiere - USA TODAY",
            "description": "At Thursday night's world premiere of \"Frozen 2,\" Selena Gomez brought her 6-year-old sister, Gracie Teefey. The two twinned in Marc Jacobs.",
            "url": "https://www.usatoday.com/story/entertainment/celebrities/2019/11/07/frozen-2-selena-gomez-twins-6-year-old-sister-film-premiere/2527410001/?utm_source=google&utm_medium=amp&utm_campaign=speakable",
            "urlToImage": "https://www.gannett-cdn.com/presto/2019/11/08/USAT/ae7570ce-4b57-4348-a926-6615492a47b8-AP_World_Premiere_of__Frozen_2__-_Arrivals.JPG?crop=2137,1202,x1,y158&width=1600&height=800&fit=bounds",
            "publishedAt": "2019-11-08T08:37:52Z",
            "content": "Elsa and Anna return on screen for a new adventure in Frozen II, playing in theaters on November 22.\r\n USA TODAY\r\nGet ready for a cuteness overload.\r\nAt Thursday night's world premiere of \"Frozen 2,\" Selena Gomez brought the cutest date of all her 6-year-old … [+2797 chars]"
        }, {
            "source": {"id": "the-new-york-times", "name": "The New York Times"},
            "author": null,
            "title": "LeBron James Can Play in Whatever Shoes He Wants. Why Can’t Odell Beckham Jr.? - The New York Times",
            "description": "Beckham, the Cleveland Browns’ oft-fined star receiver, was forced to change his cleats or else on Sunday.",
            "url": "https://www.nytimes.com/2019/11/08/sports/football/odell-beckham-nfl-cleat-rules.html",
            "urlToImage": "https://static01.nyt.com/images/2019/11/08/sports/08nfl-cleats-print/merlin_163815291_74bce674-0390-48c1-9745-58eee5840daf-facebookJumbo.jpg",
            "publishedAt": "2019-11-08T08:00:00Z",
            "content": "Even if you try to put the team colors on the shoe, it still runs the risk of a fine, he said. Its definitely tough, especially when you do see the N.B.A. and all restrictions are off.\r\nLast season, the N.B.A. changed its rules to allow sneakers of any color,… [+1375 chars]"
        }, {
            "source": {"id": "cnbc", "name": "CNBC"},
            "author": "Fred Imbert",
            "title": "Dow futures point to slight gains at the open as stocks close out a big week - CNBC",
            "description": "U.S. stock index futures were lower Friday morning.",
            "url": "https://www.cnbc.com/2019/11/08/dow-futures-us-china-trade-tariffs-consumer-data.html",
            "urlToImage": "https://image.cnbcfm.com/api/v1/image/106083525-1573051748409preview-3.jpg?v=1573051759",
            "publishedAt": "2019-11-08T07:20:00Z",
            "content": "U.S. stock index futures pointed to a little changed open on Friday following a record-setting session for the major stock indexes. \r\nAround 7 a.m. ET, Dow Jones Industrial Average futures were unchanged but pointed to a gain of 33 points at the open. S&amp;P… [+1841 chars]"
        }]
    }
    renderMain(json)
}

async function showSpecificHeadlines(source = defaultSource) {
    /**
     const json = {
        "status": "ok",
        "totalResults": 10,
        "articles": [{
            "source": {"id": "der-tagesspiegel", "name": "Der Tagesspiegel"},
            "author": "Hannes Heine",
            "title": "\"Menschen, nicht Algorithmen sollen entscheiden“",
            "description": "Beim Tagesspiegel-Fachforum ging es am Montag um die Zukunft des Gesundheitswesens. Noch spielen Roboter eine geringe Rolle.",
            "url": "https://www.tagesspiegel.de/politik/roboter-am-bett-des-patienten-menschen-nicht-algorithmen-sollen-entscheiden/25220106.html",
            "urlToImage": "https://www.tagesspiegel.de/images/422324172/25220104/3-format530.jpg",
            "publishedAt": "2019-11-12T18:19:47+00:00",
            "content": "Werden Roboter bald Pflegekräfte ersetzen? Digitalisierung im Allgemeinen und Robotik im Besonderen werden im Gesundheitswesen eine größere Rolle spielen darin waren sich beim Tagesspiegel-Fachforum am Montag alle Experten einig. Der Bundespflegebeauftragte, … [+2155 chars]"
        }, {
            "source": {"id": "der-tagesspiegel", "name": "Der Tagesspiegel"},
            "author": "Arne Bensiek",
            "title": "Hauptzeuge im Falk-Prozess belastet Verlagserbe schwer",
            "description": "Im Mordprozess gegen Alexander Falk sagt der Hauptzeuge aus. Er bezichtigt den Multimillionär, Drahtzieher eines Anschlags auf einen Rechtsanwalt zu sein.",
            "url": "https://www.tagesspiegel.de/gesellschaft/panorama/bring-ihn-zum-schweigen-hauptzeuge-im-falk-prozess-belastet-verlagserbe-schwer/25219830.html",
            "urlToImage": "https://www.tagesspiegel.de/images/prozess-gegen-unternehmer-falk/25219978/2-format530.jpg",
            "publishedAt": "2019-11-12T18:15:03+00:00",
            "content": "Etem E. betritt den Gerichtssaal nur zögerlich. Bevor er seinen Platz im Zeugenstand einnimmt, prüft sein Blick die Zuschauerreihen, so als habe er Angst. Bei seinem letzten Auftritt vor Gericht hatte er kürzlich noch zwei sichtbar bewaffnete Begleiter an sei… [+4377 chars]"
        }, {
            "source": {"id": "der-tagesspiegel", "name": "Der Tagesspiegel"},
            "author": null,
            "title": "Strikte Abstands-Regel für Windräder geplant",
            "description": "Das Gesetz soll bereits gelten, wenn mehr als fünf Wohngebäude zusammenstehen. Doch die Neuregelung sorgt für Ärger.",
            "url": "https://www.tagesspiegel.de/politik/1000-meter-zu-wohnsiedlungen-strikte-abstands-regel-fuer-windraeder-geplant/25217838.html",
            "urlToImage": "https://www.tagesspiegel.de/images/strikte-abstands-regel-fuer-windraeder-geplant/25217920/1-format530.jpg",
            "publishedAt": "2019-11-12T18:05:12+00:00",
            "content": "Die geplante Regelung für den Abstand von 1000 Metern zwischen Windrädern und Wohnsiedlungen soll einem Gesetzentwurf zufolge schon gelten, wenn mehr als fünf Wohngebäude zusammenstehen. Das geht aus dem Referentenentwurf von Bundeswirtschaftsminister Peter A… [+5293 chars]"
        }, {
            "source": {"id": "der-tagesspiegel", "name": "Der Tagesspiegel"},
            "author": "Nicola Kuhn",
            "title": "„Die Welt, aus der ich komme, ist verschwunden“",
            "description": "Viele Orte in seinem Heimatkiez erinnern den Maler Norbert Bisky an die bewegten 90er. Beim Spaziergang mischen sich die Zeiten wie auf seinen Gemälden.",
            "url": "https://www.tagesspiegel.de/berlin/-norbert-bisky-zeigt-ausstellung-zum-mauerfall-die-welt-aus-der-ich-komme-ist-verschwunden/25209602.html",
            "urlToImage": "https://www.tagesspiegel.de/images/heprodimagesfotos83120191110dora_823_1_20191109150521174-jpg/25209614/4-format530.jpg",
            "publishedAt": "2019-11-12T18:02:52+00:00",
            "content": "Wann, wenn nicht jetzt?\", hatte sich Norbert Bisky gefragt und die Herausforderung angenommen: eine Doppelausstellung zum Thema 30 Jahre Mauerfall und Deutschlands aktueller Verfassung. Die eine findet in der Villa Schöningen direkt hinter der Glienicker Brüc… [+8505 chars]"
        }, {
            "source": {"id": "der-tagesspiegel", "name": "Der Tagesspiegel"},
            "author": "Elke Linda Buchholz",
            "title": "Das Kreuz von Ferrara lebt",
            "description": "Ein lange verschollenes Gemälde aus dem Besitz der Humboldt-Uni kehrt zurück.",
            "url": "https://www.tagesspiegel.de/kultur/restaurierung-eines-renaissance-gemaeldes-das-kreuz-von-ferrara-lebt/25219498.html",
            "urlToImage": "https://www.tagesspiegel.de/images/03_gg_bastianino_lebendeskreuzferrara_detail_restaurierung/25220060/2-format530.jpg",
            "publishedAt": "2019-11-12T18:01:06+00:00",
            "content": "Ganz unten auf der drei Meter hohen Altartafel von Sebastiano Filippi aus dem 16. Jahrhundert lugt einem die Fratze des Bösen aus feurigem Höllendunkel entgegen. Aber mitten hindurch ziehen sich klaffende Risse in der Malschicht. Millimeterarbeit steht an. No… [+2402 chars]"
        }, {
            "source": {"id": "der-tagesspiegel", "name": "Der Tagesspiegel"},
            "author": "Robert Kiesel",
            "title": "Die S-Bahn wird aufgeteilt",
            "description": "Der Senat will, dass künftig mehrere Unternehmen die S-Bahn betreiben. Die Gewerkschaft warnt vor Chaos.",
            "url": "https://www.tagesspiegel.de/berlin/senat-beschliesst-vergabeverfahren-die-s-bahn-wird-aufgeteilt/25219892.html",
            "urlToImage": "https://www.tagesspiegel.de/images/heprodimagesfotos83120191113bahn_287_1_20191112163558766-jpg/25219874/3-format530.jpg",
            "publishedAt": "2019-11-12T17:59:30+00:00",
            "content": "Version:0.9 StartHTML:0000000136 EndHTML:0000000857 StartFragment:0000000172 EndFragment:0000000821 SourceURL:about:blank#blocked \r\nDie S-Bahn wird revolutioniert, und geht es nach Verkehrssenatorin Regine Günther (Grüne), bekommen die Fahrgäste davon nicht d… [+5036 chars]"
        }, {
            "source": {"id": "der-tagesspiegel", "name": "Der Tagesspiegel"},
            "author": "Christoph von Marschall",
            "title": "Sicherheit muss auch sichtbar sein",
            "description": "Die Debatte über deutsche Sicherheitspolitik kommt seit Jahren zu kurz. Anders als die Kanzlerin forciert Kramp-Karrenbauer sie – aus gutem Grund. Ein Kommentar.",
            "url": "https://www.tagesspiegel.de/politik/debatte-ums-oeffentliche-geloebnis-sicherheit-muss-auch-sichtbar-sein/25219992.html",
            "urlToImage": "https://www.tagesspiegel.de/images/geloebnis-vor-dem-reichstagsgebaeude/25220010/1-format530.jpg",
            "publishedAt": "2019-11-12T17:59:12+00:00",
            "content": "Die Verteidigungsministerin lässt nicht locker. Alle paar Tage drängt sie die Gesellschaft mit neuen Vorstößen, die Sicherheitspolitik ernster zu nehmen: Schutzzone in Nordsyrien; gemeinsame Seepatrouillen der Europäer bis vor Chinas Küste, denn freie Handels… [+3195 chars]"
        }, {
            "source": {"id": "der-tagesspiegel", "name": "Der Tagesspiegel"},
            "author": "Ronja Ringelstein",
            "title": "Die Berliner CDU will grüner werden",
            "description": "Die Berliner CDU will grüner werden - bei ihrem Parteitag zum Thema Nachhaltigkeit diskutiert die Partei am Dienstagabend in Charlottenburg.",
            "url": "https://www.tagesspiegel.de/berlin/parteitag-zu-nachhaltigkeit-die-berliner-cdu-will-gruener-werden/25218800.html",
            "urlToImage": "https://www.tagesspiegel.de/images/parteitag1/25220048/2-format530.jpg",
            "publishedAt": "2019-11-12T17:56:49+00:00",
            "content": "Die CDU Berlin trifft sich an diesem Dienstagabend zum Kleinen Parteitag zum Thema Nachhaltigkeit. Landeschef Kai Wegner sagte bei seiner Eröffnungsrede, er sei wegen der Themenwahl im Vorfeld viel gefragt worden, ob die CDU nun grün werde. Nein, wir bleiben … [+3085 chars]"
        }, {
            "source": {"id": "der-tagesspiegel", "name": "Der Tagesspiegel"},
            "author": null,
            "title": "Schwede in Berlin wegen Waffenschmuggel in Fernbus angeklagt",
            "description": "Er wollte Sturmgewehre, eine Pumpgun und eine Pistole im Reisegepäck von Serbien nach Schweden schaffen. Nun kommt der 24-Jährige in Berlin vor Gericht.",
            "url": "https://www.tagesspiegel.de/berlin/mit-kalaschnikow-im-reisegepaeck-schwede-in-berlin-wegen-waffenschmuggel-in-fernbus-angeklagt/25219466.html",
            "urlToImage": "https://www.tagesspiegel.de/images/autobahnbruecke-bei-wittlich-in-der-eifel/25219572/2-format530.jpg",
            "publishedAt": "2019-11-12T17:36:42+00:00",
            "content": "Im Mai wurde er mit schweren Waffen im Gepäck in einem Reisebus gestellt. Nun ist gegen den Mann aus Schweden in Berlin Anklage erhoben worden. Es gehe um einen Verstoß gegen das Kriegswaffenkontrollgesetz, sagte der Sprecher der Staatsanwaltschaft, Martin St… [+888 chars]"
        }, {
            "source": {"id": "der-tagesspiegel", "name": "Der Tagesspiegel"},
            "author": "Thorsten Mumme",
            "title": "Die Stille nach Scholz' Sätzen ist ohrenbetäubend",
            "description": "Steuersenkungen? Der Finanzminister sagt vor den Arbeitgebern, was diese nicht hören wollen; Altmaier widerspricht. In einem Punkt aber ist die Regierung einig.",
            "url": "https://www.tagesspiegel.de/wirtschaft/ansage-beim-arbeitgebertag-die-stille-nach-scholz-saetzen-ist-ohrenbetaeubend/25219418.html",
            "urlToImage": "https://www.tagesspiegel.de/images/steuerschaetzung/25219516/1-format530.jpg",
            "publishedAt": "2019-11-12T17:31:05+00:00",
            "content": "Viel schwammiger kann man eine Absichtserklärung kaum formulieren. Über Themen wie die unterschiedliche steuerliche Behandlung von Familienbetrieben und Kapitalgesellschaften nachzudenken, sei immer gut, sagte Bundesfinanzminister und Vizekanzler Olaf Scholz … [+4805 chars]"
        }]
    };
     **/
    let id = source;
    if (typeof source.target !== "undefined") {
        id = source.target.id
    }
    const response = await fetch(
        `https://newsapi.org/v2/` +
        `top-headlines` +
        `?sources=${id}` +
        `&apiKey=${apiKey}`
    );
    const json = await response.json();

    renderMain(json)
    //https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=8566b11f65a14d54b8be47b1c01db39e
}

function createArticles(article) {
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

function renderMain(json) {
    main.innerHTML = json.articles.map(createArticles).join('\n');
}