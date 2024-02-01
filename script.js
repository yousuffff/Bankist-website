'use strict';

///////////////////////////////////////
// Modal window
const header = document.querySelector('header')
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// creating elememt
const message = document.createElement('div');
message.classList.add('cookie');
message.innerHTML = 'We use cookies for improved functionality and performance. <button class="btn btn--close-cookies">GOT It</button>';
header.append(message)

//removing element
document.querySelector('.btn--close-cookies').addEventListener('click', ()=>{
message.remove()
})

btnScroll.addEventListener('click', ()=>{
  section1.scrollIntoView({behavior : 'smooth'})
})

// Event delegation
//we apply event on link container 
document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();
  console.log(e.target);
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href')
    console.log(id)
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }
})


// //styling
// message.style.backgroundColor = '#37383d'
// message.style.width = '120%';
// message.style.height = Number.parseFloat(getComputedStyle(message).height) + 10 + 'px'

























let count = 0;
const hello = new Promise(function (resolve, reject) {
  if (count === 0) { }

})
console.log(navigator.language)