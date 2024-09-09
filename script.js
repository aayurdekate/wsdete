let allcourses = [];
let currentPage = 1;
const coursesPerPage = 5;

document.addEventListener("DOMContentLoaded", () => {
    fetchcourses();
});


//defining the courses from the website
const courses = [
  {"courseType":"v2.ondemand","id":"whkxBTMWEeuZBg7FYEje4Q","slug":"create-an-interactive-story-game-with-twine","name":"Create an interactive story game with Twine"},
  {"courseType":"v2.ondemand","id":"zRhFMLBVEeqP6QqV6TddSw","slug":"create-survey-analyze-results-with-surveymonkey","name":"Use SurveyMonkey to Create a Survey and Analyze Results"},
  {"courseType":"v2.ondemand","id":"LuXbfNnCEeq3nQoreMGNOQ","slug":"performing-data-aggregation-using-sql-aggregate-functions","name":"Performing Data Aggregation using SQL Aggregate Functions"},
  {"courseType":"v2.ondemand","id":"B6cXoZ3VEe6J0A5c28jyYQ","slug":"developing-ai-policy","name":"Developing AI Policy"},
  {"courseType":"v2.ondemand","id":"whkxBTMWEeuZBg7FYEje4Q","slug":"create-an-interactive-story-game-with-twine","name":"Create an interactive story game with Twine"},
  {"courseType":"v2.ondemand","id":"zRhFMLBVEeqP6QqV6TddSw","slug":"create-survey-analyze-results-with-surveymonkey","name":"Use SurveyMonkey to Create a Survey and Analyze Results"},
  {"courseType":"v2.ondemand","id":"LuXbfNnCEeq3nQoreMGNOQ","slug":"performing-data-aggregation-using-sql-aggregate-functions","name":"Performing Data Aggregation using SQL Aggregate Functions"},
  {"courseType":"v2.ondemand","id":"B6cXoZ3VEe6J0A5c28jyYQ","slug":"developing-ai-policy","name":"Developing AI Policy"},
  {"courseType":"v2.ondemand","id":"Kzg9QkDxEeWZtA4u62x6lQ","slug":"music-and-social-action","name":"Music and Social Action"},
  {"courseType":"v2.ondemand","id":"Q7tiH6CiEeiTHQqmhTjSDA","slug":"interventions-and-calibration","name":"Interventions and Calibration"},
  {"courseType":"v2.ondemand","id":"r2017VrTEemLEw4J_47EwA","slug":"cybersecurity-compliance-framework-standards-regulations","name":"Cybersecurity Compliance Framework, Standards & Regulations"},
  {"courseType":"v2.ondemand","id":"7sNP37xrEeiL4Q6DgrZ6DA","slug":"sequence-models-tensorflow-gcp","name":"Natural Language Processing on Google Cloud"},
  {"courseType":"v2.ondemand","id":"rS28ZxGNEe26hQ4jkCdYhQ","slug":"creer-un-tableau-de-bord-d-analyse-marketing-a-l-aide-de-hubspot","name":"CrÃ©er un tableau de bord d'analyse marketing Ã  l'aide de Hubspot"},
  {"courseType":"v2.ondemand","id":"tNI8Ov06Eeyt8Q7irWwuzw","slug":"data-science-decisions-in-time-using-causal-information","name":"Data Science Decisions in Time: Using Causal Information"},
  {"courseType":"v2.ondemand","id":"tEqImn2kEeWb-BLhFdaGww","slug":"protools","name":"Pro Tools Basics"},{"courseType":"v2.ondemand","id":"CVJg1EYkEeejjw678ALX-g","slug":"design-patterns","name":"Design Patterns"},
  {"courseType":"v2.ondemand","id":"CJlO86ktEeyjPxJkzIUqCw","slug":"googlecloud-bracketology-with-google-machine-learning-5ytsd","name":"Bracketology with Google Machine Learning"},
  {"courseType":"v2.ondemand","id":"yO13mkySEeW_MgoxMAgbMQ","slug":"gte-sustainable-cities","name":"Greening the Economy: Sustainable Cities"},
  {"courseType":"v2.ondemand","id":"O3LHo0QTEe-YIQr_7tz45w","slug":"user-interface-design-principles-prototyping-practices","name":"User Interface Design: Principles, Prototyping, Practices"},
];

allcourses = courses;
// this function is used to display the courses
function displaycourses(courses) {
    const courseList = document.getElementById("courses-container");
    courseList.innerHTML = '';

    if (courses.length === 0) {
        courseList.innerHTML = '<p>No courses found.</p>';
        return;
    }

    courses.forEach(course => {
        const courseDiv = document.createElement("div");
        courseDiv.classList.add("course");
        courseDiv.innerHTML = `
            <h3>${course.name}</h3>
            <p>Course Type: ${course.courseType}</p>
            <p>Course ID: ${course.id}</p>
            <p>Course Slug: ${course.slug}</p>
        `;
        courseList.appendChild(courseDiv);
    });
}

// this function is used to apply the filters
function applyFilters() {
    let filteredcourses = allcourses;

    const filtercreator = document.getElementById("filter-creator").value.toLowerCase();
    const sortOption = document.getElementById("sort").value;

    if (filtercreator) {
        filteredcourses = filteredcourses.filter(course => {
            return course.name.toLowerCase().includes(filtercreator) ||
                   course.courseType.toLowerCase().includes(filtercreator) ||
                   course.id.toLowerCase().includes(filtercreator) ||
                   course.slug.toLowerCase().includes(filtercreator);
        });
    }

    if (sortOption === 'type') {
        filteredcourses.sort((a, b) => a.courseType.localeCompare(b.courseType));
    } else if (sortOption === 'course id') {
        filteredcourses.sort((a, b) => a.id.localeCompare(b.id));
    }

    currentPage = 1;
    displaycoursesPaginated(filteredcourses);
}

// this function is used to change the page
function changePage(delta) {
    const totalPages = Math.ceil(allcourses.length / coursesPerPage);
    currentPage += delta;

    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages) currentPage = totalPages;

    displaycoursesPaginated();
}

function displaycoursesPaginated(filteredcourses = allcourses) {
    const start = (currentPage - 1) * coursesPerPage;
    const end = start + coursesPerPage;

    displaycourses(filteredcourses.slice(start, end));
    document.getElementById("current-page").innerText = currentPage;
}

displaycoursesPaginated();



//signup form
const signUpForm = document.getElementById('sign-up');
const signUpError = document.getElementById('sign-up-error');

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const courseId = document.getElementById('course-id').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (name === '' || email === '' || courseId === '' || password === '' || confirmPassword === '') {
        signUpError.textContent = 'Please fill out all fields.';
        return;
    }

    if (password !== confirmPassword) {
        signUpError.textContent = 'Passwords do not match.';
        return;
    }

    console.log('Sign-up form submitted:', {
        name,
        email,
        courseId,
        password,
    });

    signUpForm.reset();
});