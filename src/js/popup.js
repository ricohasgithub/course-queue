
let courses_json;
let course_names = [];
let course_links = [];

let tabColors = ["red", "blue", "cyan", "green", "purple", "orange"];

function loadCourses(json) {

    // Load all courses as arrays of urls from json
    courses_json = json;
    console.log(courses_json);

    const courses_div = document.getElementById("courses");

    for (let course in courses_json) {

        // Create new html elements in popup.html for each link

        course_names.push(course);

        const tabButton = document.createElement('div');
        tabButton.textContent = course;
        courses_div.appendChild(tabButton);
        tabButton.setAttribute("id", `tabButton${course}`);

        course_links.push(courses_json[course]);
        let course_urls = []

        for (let course_index in courses_json[course]) {
            let course_url = courses_json[course][course_index];
            course_urls.push(course_url);    
        }

        let tabColor = "blue";

        if (tabColors.length > 0) {
            let randIndex = Math.floor(Math.random() * tabColors.length);
            tabColor = tabColors[randIndex];
            tabColors.splice(randIndex, 1);
            console.log(tabColors);
        }

        tabButton.title_param = course;
        tabButton.courses_param = course_urls;
        tabButton.tab_color = tabColor;

        tabButton.setAttribute("class", `tabButton ${tabColor}`);

        tabButton.addEventListener('click', async (event) => {
        
            let local_course_title = event.currentTarget.title_param;
            let local_course_urls = event.currentTarget.courses_param;
            let local_course_color = event.currentTarget.tab_color;
        
            const tabsIds = [];
            for (let course_index in local_course_urls) {
                const url = local_course_urls[course_index];
                const tab = await chrome.tabs.create({url});
                tabsIds.push(tab.id);
            }

            const groupId = await chrome.tabs.group({tabIds: tabsIds});
            await chrome.tabGroups.update(groupId, {
                collapsed: false, 
                title: local_course_title, 
                color: local_course_color
            });

        });

    }

}

let url = chrome.runtime.getURL('./assets/courses.json');
fetch(url)
    .then((response) => response.json()) // file contains json
    .then((json) => {
        this.loadCourses(json);}
    );