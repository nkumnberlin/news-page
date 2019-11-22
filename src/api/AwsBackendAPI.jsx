const BACKENDURL = 'https://tv7vnviejg.execute-api.us-east-1.amazonaws.com/api/';
const proxyURL = 'https://cors-anywhere.herokuapp.com/';

//https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe

export async function awsQueryLanguage(queryPackage) {
    const url =   BACKENDURL + `sources?language=${queryPackage.language}&category=${queryPackage.category}`
    const token = tokenGenerator();
    const response = await fetch(proxyURL + url, {
        method: 'get',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'text/plain',
            'X-My-Custom-Header': 'value-v',
            'Authorization': token,
        }
    });
    //2Az2Zahlen2Sonderzeichen
    return await response.json();
}
export async function awsQuerySpecificHeadlines(id) {
    const url = BACKENDURL + `news?sources=${id}`
    const token = tokenGenerator();
    const response = await fetch(proxyURL + url, {
        method: 'get',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'text/plain',
            'X-My-Custom-Header': 'value-v',
            'Authorization': token,
        }
    });
    return await response.json();
}


function tokenGenerator() {
    let number =  (Math.random() * (100 - 10 +1)).toString().split('.');
    let letters = letterGen();
    let specialSigns = specialSignsGen();
    return letters + number[0] + specialSigns
}

function letterGen() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 2; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function specialSignsGen() {
    let result = '';
    const characters = '!§$%&/()=?#-_.;,';
    for (let i = 0; i < 2; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}