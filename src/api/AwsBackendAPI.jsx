const BACKENDURL = 'https://newsapi.org/v2/';
const API = '&apiKey=';

export async function awsQueryLanguage(queryPackage) {
    const SOURCES = 'sources?language='
    const url = `${BACKENDURL}${SOURCES}${queryPackage.language}${API}${queryPackage.apiKey}`
    const response = await fetch(url);
    return await response.json();
}

export async function awsQuerySpecificHeadlines(queryPackage) {
    const HEADLINES = 'top-headlines?sources='
    const url = `${BACKENDURL}${HEADLINES}${queryPackage.id}${API}${queryPackage.apiKey}`
    const response  = await  fetch(url);
    return await response.json();
}