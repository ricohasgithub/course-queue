
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

        course_links.push(courses_json[course]);
        for (let course_index in courses_json[course]) {
            let course_url = courses_json[course][course_index];
            document.getElementById("courses").innerHTML += `<a href=` + course_url + `'target='_blank' id = 'tabButton${course_url}' class = 'tabButton'>` + `hello </a>`;
            document.getElementById(`tabButton${course_url}`).onclick = openTabGroup(course_url);
        }

    }

}

function openTabGroup(course_url) {
    console.log("Hello");
    console.log(course_url);
    window.open(course_url, '_blank').focus();
}

let url = chrome.runtime.getURL('./assets/courses.json');
fetch(url)
    .then((response) => response.json()) // file contains json
    .then((json) => {
        this.loadCourses(json);}
    );