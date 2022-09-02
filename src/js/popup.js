
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
        }

    }

}

let url = chrome.runtime.getURL('./assets/courses.json');
fetch(url)
    .then((response) => response.json()) // file contains json
    .then((json) => {
        this.loadCourses(json);}
    );