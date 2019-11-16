const BACKENDURL = 'https://tv7vnviejg.execute-api.us-east-1.amazonaws.com/api/';

export async function awsQueryLanguage(queryPackage) {
    const url =   BACKENDURL + `sources?language=${queryPackage.language}&category=${queryPackage.category}`
    const response = await fetch(url);
    return await response.json();
}

export async function awsQuerySpecificHeadlines(id) {
    const url = BACKENDURL + `news?sources=${id}`
    const response  = await  fetch(url);
    return await response.json();
}