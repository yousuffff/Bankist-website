'use strict';

///////////////////////////////////////
// Modal window
const header = document.querySelector('header');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const dotContainer = document.querySelector('.dots');

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
// const message = document.createElement('div');
// message.classList.add('cookie');
// message.innerHTML = 'We use cookies for improved functionality and performance. <button class="btn btn--close-cookies">GOT It</button>';
// header.append(message)

// //removing element
// document.querySelector('.btn--close-cookies').addEventListener('click', () => {
//   message.remove()
// })

btnScroll.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Event delegation
//we apply event on link container
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id)
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//tabbed section
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  // console.log(clicked.dataset.tab);
  //activating content area
  tabContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
// nav section
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibling.forEach(el => {
      if (el !== link) el.style.opacity = this; // opacity
    });
    // logo.style.opacity =this; // opacity
  }
};
// passing argument in to event handlers
// nav.addEventListener('mouseover', function(e){
// handleHover(0.5)// old way
// })
nav.addEventListener('mouseover', handleHover.bind(0.5)); // modern way
nav.addEventListener('mouseout', handleHover.bind(1));

// OLD WAY
// const initial = section1.getBoundingClientRect();
// window.addEventListener('scroll' , function(){
//   if (window.scrollY > initial.top) nav.classList.add('sticky')
//   else nav.classList.remove('sticky');
// })

// NEW WAY
const navHeight = nav.getBoundingClientRect().height;
const sticky = function (enteries) {
  const [entry] = enteries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(sticky, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

const allSection = document.querySelectorAll('section');
const revealSection = function (enteries, observe) {
  const [entry] = enteries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observe.unobserve(entry.target); // tp stop observer
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//////////// lazy loading
const images = document.querySelectorAll('img[data-src]');

const lazyloading = function (enteries, observe) {
  const [entry] = enteries;

  if (!entry.isIntersecting) return;
  // replacing src
  entry.target.src = entry.target.dataset.src;
  //removing blur class from image
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};

const imgObserver = new IntersectionObserver(lazyloading, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});
images.forEach(image => imgObserver.observe(image));

///////////// slider function
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  // console.log(slides);
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');

  let curSlide = 0;
  const maxSlide = slides.length - 1;
  // console.log(maxSlide);

  //slide move function
  const activeDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });
    document
      .querySelector(`.dots__dot[data-slide="${slide}"`)
      .classList.add('dots__dot--active');
  };
  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  const creatDots = function () {
    slides.forEach((slide, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide="${i}"></button>`
      );
    });
  };
  const init = () => {
    goToSlide(curSlide);
    creatDots();
    activeDot(0);
  };
  init();

  const nextSlide = () => {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
  };
  const prevSlide = () => {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
  };
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    // console.log(e);
    if (e.code === 'ArrowRight') nextSlide();
    if (e.code === 'ArrowLeft') prevSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      console.log(slide);
      goToSlide(slide);
      activeDot(slide);
    }
  });
};
slider();

// //styling
// message.style.backgroundColor = '#37383d'
// message.style.width = '120%';
// message.style.height = Number.parseFloat(getComputedStyle(message).height) + 10 + 'px'



