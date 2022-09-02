
let courses_json;
let course_names = [];
let course_links = [];

function loadCourses(json) {

    // Load all courses as arrays of urls from json
    courses_json = json;
    console.log(courses_json);

    for (let course in courses_json) {
        console.log(course);
        course_names.push(course);
        course_links.push(courses_json[course]);
    }

    // Create new html elements in popup.html for each link
    let i = 0;
    for (let course in course_names) {
        console.log(course);
        for (let course_index in course_links[i]) {
            const para = document.createElement("p");
            const node = document.createTextNode(course_links[i][course_index]);
            para.appendChild(node);
            console.log(course_links[i][course_index]);
            i++;
        }
    }

}

let url = chrome.runtime.getURL('./assets/courses.json');
fetch(url)
    .then((response) => response.json()) // file contains json
    .then((json) => {
        this.loadCourses(json);}
    );