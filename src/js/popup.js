
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

        const para = document.createElement("p");
        const node = document.createTextNode(course);
        para.appendChild(node);
        document.getElementById("courses").innerHTML = para;

        course_links.push(courses_json[course]);

    }

}

let url = chrome.runtime.getURL('./assets/courses.json');
fetch(url)
    .then((response) => response.json()) // file contains json
    .then((json) => {
        this.loadCourses(json);}
    );