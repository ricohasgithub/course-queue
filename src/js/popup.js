
let courses_json;
let course_names = [];
let course_links = [];

function loadCourses(json) {

    // Load all courses as arrays of urls from json
    courses_json = json;
    console.log(courses_json);

    const courses_div = document.getElementById("courses");

    for (let course in courses_json) {

        // Create new html elements in popup.html for each link

        course_names.push(course);

        const courseTitle = document.createElement('h1');
        courseTitle.textContent = course;
        courseTitle.setAttribute("class", "heading");
        courses_div.appendChild(courseTitle);

        const tabButton = document.createElement('button');
        courses_div.appendChild(tabButton);
        tabButton.setAttribute("id", `tabButton${course}`);
        tabButton.setAttribute("class", "tabButton");

        course_links.push(courses_json[course]);
        let course_urls = []

        for (let course_index in courses_json[course]) {
            let course_url = courses_json[course][course_index];
            course_urls.push(course_url);
            // document.getElementById("courses").innerHTML += `<a href=` + course_url + `'target='_blank' id = 'tabButton${course_url}' class = 'tabButton'>` + `hello </a>`;
            // document.getElementById(`tabButton${course}`).onclick = openTabGroup(course_url);
        }

        tabButton.param = course_urls;
        tabButton.addEventListener('click', (event) => {

            console.log("Hello");
            console.log(event.currentTarget.param);
        
            let local_course_urls = event.currentTarget.param;
        
            for (let course_index in local_course_urls) {
                window.open(local_course_urls[course_index], '_blank').focus();
            }

        });

        console.log(tabButton);
        console.log(tabButton.param);

    }

}

let url = chrome.runtime.getURL('./assets/courses.json');
fetch(url)
    .then((response) => response.json()) // file contains json
    .then((json) => {
        this.loadCourses(json);}
    );