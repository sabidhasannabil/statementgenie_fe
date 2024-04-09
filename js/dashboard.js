//Shrink Menu js

let mainContainer = document.querySelector('.main-container')
let menuBtn = document.querySelector('#menuButton')

menuBtn.onclick = function() {
    mainContainer.classList.toggle('shrink')
    menuBtn.classList.toggle('active')
}
