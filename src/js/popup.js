
let url = chrome.runtime.getURL('./assets/courses.json');
fetch(url)
    .then((response) => response.json()) // file contains json
    .then((json) => console.log(json)); 
