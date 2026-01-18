// Show Menu
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

// Menu Show
    if(navToggle){
        navToggle.addEventListener('click',()=>{
            navMenu.classList.add('show-menu')
        })
    }

// Menu Hidden
    if(navClose){
        navClose.addEventListener('click',()=>{
            navMenu.classList.remove('show-menu')
        })
    }

// Remove Menu Mobile
const navLink = document.querySelectorAll('.nav__link');

const linkAction = ()=>{
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class.
    navMenu.classList.remove('show-menu');
}
navLink.forEach( n => n.addEventListener('click',linkAction));

// Change Background Header
const shadowHeader = ()=>{
    const header = document.getElementById('header')
    // Add class if the bottom offset is greater than 50 of the viewport
    this.scrollY >= 50 ? header.classList.add('shadow-header')
                       : header.classList.remove('shadow-header')
}
window.addEventListener('scroll',shadowHeader);

// Home Typed JS
const typedhome = new Typed('#home-typed',{
    strings: ['Software Developer','Freelancer','MERN Stack Developer','Open Source Contributor'],  // Profession
    typeSpeed: 80,
    backSpeed: 40,
    backDelay: 2000,
    loop: true,
    cursorChar: '_',
})

// Contact Email JS
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message');
    
const sentEmail = (e)=>{
    e.preventDefault();
    // serviceID - templateID - #form - publicKey
    emailjs.sendForm('service_mctnc6p','template_xgpdfv4','#contact-form','C6n6un0GwuqMVbO4y')
    // Show sent message
    .then(()=>{
        contactMessage.textContent = 'Message Sent Successfully ✅';
        
        // Remove message after five seconds
        setTimeout(()=>{
            contactMessage.textContent = ''
        },5000);

        // Clear input fields
        contactForm.reset();
    },()=>{
        // Show error message
        contactMessage.textContent = 'Message not sent (service error) ❌'; 
    })
}
contactForm.addEventListener('submit',sentEmail); 

//  Scroll Up
const scrollUp = ()=>{
    const scrollUp = document.getElementById('scroll-up')
    // when the scroll is higher
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
}
    window.addEventListener('scroll',scrollUp);

    // Scroll Sections active link
const sections = document.querySelectorAll('section[id]');
const scrollActive = ()=>{
    const scrollDown = window.scrollY

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*='+ sectionId +']')
              
              if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
                sectionsClass.classList.add('active-link');
              }else{
                sectionsClass.classList.remove('active-link');
              }
    })
}
window.addEventListener('scroll',scrollActive);

// Scroll REVEAL ANIMATION
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    reset : true, //Animations repeat
})

sr.reveal(`.home__content, .resume__content:nth-child(1), .footer__container`)
sr.reveal(`.home__data, .resume__content:nth-child(2)`,{delay:300, origin: 'bottom'})

sr.reveal(`.about__content, .contact__content`,{origin: 'bottom'})
sr.reveal(`.about__image, .contact__form`,{delay: 300})

sr.reveal(`.projects__card`,{interval: 100})

