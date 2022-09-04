
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
        tabButton.textContent = course;
        courses_div.appendChild(tabButton);
        tabButton.setAttribute("id", `tabButton${course}`);
        tabButton.setAttribute("class", "tabButton");

        course_links.push(courses_json[course]);
        let course_urls = []

        for (let course_index in courses_json[course]) {
            let course_url = courses_json[course][course_index];
            course_urls.push(course_url);    
        }

        tabButton.param = course_urls;
        tabButton.addEventListener('click', async (event) => {
        
            let local_course_urls = event.currentTarget.param;
        
            const tabsIds = [];
            for (let course_index in local_course_urls) {
                const url = local_course_urls[course_index];
                const tab = await chrome.tabs.create({url});
                tabsIds.push(tab.id);
                // window.open(local_course_urls[course_index], '_blank').focus();
            }

            const groupId = await chrome.tabs.group({tabIds: tabsIds});
            //chrome.tabGroups.update(groupId, {...});

        });

        console.log(tabButton);
        console.log(tabButton.param);

    }

}

async function createTabGroup(course) {
    let groupId = await chrome.tabs.group({ tabIds: tabId });
    chrome.tabGroups.update(groupId, { collapsed: false, title: course, color: "blue" });
}

let url = chrome.runtime.getURL('./assets/courses.json');
fetch(url)
    .then((response) => response.json()) // file contains json
    .then((json) => {
        this.loadCourses(json);}
    );