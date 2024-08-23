const dateLabel = document.getElementById('date');
const timeLabel = document.getElementById('time');
const images = ['./Images/Duke.png', './Images/GolangMascot.png'];
let imageIndex = 0;

// Time Related
const now = new Date();
const month = now.getMonth();
const day = now.getDate();
const year = now.getFullYear();

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayOfWeek = daysOfWeek[now.getDay()];


// Form Modal
let modal = document.getElementById("myModal");

// Function to open the modal
function openModal() {
    modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
}

// Close the modal if the user clicks anywhere outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


displayTimeAndDate();
const interval1 = setInterval(() => {
    displayTimeAndDate();
}, 1000);
const interval2 = setInterval(() => {
  changeBanner();
}, 3000);


function displayTimeAndDate()
{
	let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let newformat = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

	timeLabel.innerHTML = "Time : " + hours + ":" + minutes + " " + newformat;
	dateLabel.innerHTML = "Date : " + (month+1) + " / " + day + " / " + year + " (" + dayOfWeek + ") ";
}

function changeBanner() {
    if(imageIndex < 1) {
        imageIndex++;
    }else {
        imageIndex = 0;
    }
    const element = document.getElementById('banner');
    element.style.backgroundImage = 'url("' + images[imageIndex] + '")';
}

// Yah, I can't use the github API, because that will leak my API token, and Im to lazy to do it
function openRepo(name) {
    if(name === "CodexPad") {
        window.open("https://github.com/SarryGeezOwO/CodexPad", "_blank");
    }
    else if(name === "Code_Journey") {
        window.open("https://github.com/SarryGeezOwO/Code_Journey", "_blank");
    }
    else if(name === "CFR_Parser") {
        window.open("https://github.com/SarryGeezOwO/CFR_Parser", "_blank");
    }
    else if(name === "GoCmdTools") {
        window.open("https://github.com/SarryGeezOwO/GoCmdTools", "_blank");
    }
}

function goUp() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('scroll', () => {
    const scrollElement = document.querySelector('.goUp');
    const scrollAmount = window.scrollY || document.documentElement.scrollTop;
    const triggerHeight = 600; // Change this value to the scroll amount you want

    if (scrollAmount > triggerHeight) {
        scrollElement.classList.add("enable");
    } else {
        scrollElement.classList.remove("enable");
    }
});

function toggleProject(element) {
    const child = element.querySelector(".project-toggle");
    child.classList.toggle("show");

    const icon = element.querySelector(".dropIcon");
    if(!child.classList.contains('show')) {
        icon.innerHTML = `<i class='bx bx-chevron-up'></i>`;
    }
    else {
        icon.innerHTML = `<i class='bx bx-chevron-down'></i>`;
    }
}


// Update Log rendering
fetch('./Data/UpdateLog.json')
  .then(response => response.json())
  .then(data => {

    data.forEach(log => {
      const logEntry = document.createElement('div');
      logEntry.innerHTML = `<div class="update"><h3>${log.date}</h3><p>${log.content}</p></div>`;
      document.getElementById('update-log').appendChild(logEntry);
    });

  })
  .catch(error => console.error('Error fetching the update log:', error));
