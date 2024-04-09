//FAQ
function toggleFAQ(element) {
  var isActive = element.classList.toggle("active");
  var answer = element.querySelector(".faq-answer");
  var icon = element.querySelector(".faq-icon img");

  // Close all other open FAQs and reset their icons
  var allQuestions = document.querySelectorAll(".faq-question");
  allQuestions.forEach(function (item) {
    if (item !== element) {
      item.classList.remove("active");
      item.querySelector(".faq-answer").style.display = "none";
    }
  });

  // Toggle the current FAQ and icon
  if (isActive) {
    answer.style.display = "block";
    icon.src = "./assets/icons/plus_icon.svg";
  } else {
    answer.style.display = "none";
    icon.src = "./assets/icons/plus_icon.svg";
  }
}

// //Pre Loader
// document.addEventListener("DOMContentLoaded", function () {
//   // Set a timeout of 5 seconds (5000 milliseconds)
//   setTimeout(function () {
//     var preloader = document.getElementById("preloader");
//     var body = document.body;
//     preloader.classList.add("loaded");
//     body.classList.add("loaded"); // Add the loaded class to the body to reveal content
//   }, 1000); // 5000 milliseconds = 5 seconds
// });



// Show or hide the back-to-top button based on scroll position
window.addEventListener('scroll', function () {
  var backToTopButton = document.getElementById('back-to-top');
  // Check if the viewport width is more than 768px for non-mobile devices
  if (window.innerWidth > 768) {
    if (window.pageYOffset > 100) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  } else {
    // Always display none on mobile devices
    backToTopButton.style.display = 'none';
  }
});

// Smooth scroll to top when back-to-top button is clicked
document.getElementById('back-to-top').addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});