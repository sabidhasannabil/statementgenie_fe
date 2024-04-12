//Shrink Menu js

let mainContainer = document.querySelector('.main-container')
let menuBtn = document.querySelector('#menuButton')

menuBtn.onclick = function() {
    mainContainer.classList.toggle('shrink')
    menuBtn.classList.toggle('active')
}
//Url Copy
function copyURL() {
    var copyText = document.getElementById("urlField");
    copyText.select(); 
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Copied the URL: " + copyText.value);
}

// Animation for text labels
const label1 = document.getElementById('label1');
const label2 = document.getElementById('label2');
const label3 = document.getElementById('label3');

const percentage1 = 120;
const percentage2 = 80;
const percentage3 = 40;

animateLabel(label1, percentage1);
animateLabel(label2, percentage2);
animateLabel(label3, percentage3);

function animateLabel(label, percentage) {
  let count = 0;
  const interval = setInterval(() => {
    label.textContent = `${label.textContent.split(':')[0]}: ${count++}`;
    if (count > percentage) clearInterval(interval);
  }, 20);
}

// This will active when backend added.
// async function fetchData() {
//     try {
//       const response = await fetch('/api/completion-data');
//       if (!response.ok) {
//         throw new Error('Failed to fetch data');
//       }
//       const data = await response.json();
//       updateCharts(data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   function updateCharts(data) {
//     const percentage1 = data.percentage1;
//     const percentage2 = data.percentage2;
//     const percentage3 = data.percentage3;

//     document.getElementById('animation1').setAttribute('from', 251 - (251 * percentage1 / 100));
//     document.getElementById('animation2').setAttribute('from', 439 - (439 * percentage2 / 100));
//     document.getElementById('animation3').setAttribute('from', 627 - (627 * percentage3 / 100));

//     animateLabel(document.getElementById('label1'), percentage1);
//     animateLabel(document.getElementById('label2'), percentage2);
//     animateLabel(document.getElementById('label3'), percentage3);
//   }

//   function animateLabel(label, percentage) {
//     let count = 0;
//     const interval = setInterval(() => {
//       label.textContent = `${label.textContent.split(':')[0]}: ${count}`;
//       if (count >= percentage) clearInterval(interval);
//       count++;
//     }, 20);
//   }

//   fetchData();