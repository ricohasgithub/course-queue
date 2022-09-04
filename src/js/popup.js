
let courses_json;
let course_names = [];
let course_links = [];

function loadCourses(json) {

    // Load all courses as arrays of urls from json
    courses_json = json;
    console.log(courses_json);

    for (let course in courses_json) {

        // Create new html elements in popup.html for each link

        course_names.push(course);

        console.log(course);
        document.getElementById("courses").innerHTML += "<h1 class='heading'>" + course + "</h1>";
        document.getElementById("courses").innerHTML += `<div 'target='_blank' id = 'tabButton${course}' class = 'tabButton'>` + `Open Course Tabs </a>`;

        course_links.push(courses_json[course]);
        let course_urls = []

        for (let course_index in courses_json[course]) {
            let course_url = courses_json[course][course_index];
            course_urls.push(course_url);
            // document.getElementById("courses").innerHTML += `<a href=` + course_url + `'target='_blank' id = 'tabButton${course_url}' class = 'tabButton'>` + `hello </a>`;
            // document.getElementById(`tabButton${course}`).onclick = openTabGroup(course_url);
        }

        document.getElementById(`tabButton${course}`).addEventListener('click', openTabGroup, false);
        document.getElementById(`tabButton${course}`).myParam = course_urls;

    }

}

function openTabGroup(evt) {

    console.log("Hello");
    console.log(evt.currentTarget.myParam);

    let course_urls = evt.currentTarget.myParam;

    for (let course_url in course_urls) {
        window.open(course_urls[course_url], '_blank').focus();
    }

}

let url = chrome.runtime.getURL('./assets/courses.json');
fetch(url)
    .then((response) => response.json()) // file contains json
    .then((json) => {
        this.loadCourses(json);}
    );