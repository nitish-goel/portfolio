/* =========================================================
   NITISH GOEL — PORTFOLIO  |  main.js
   ========================================================= */

/* ---------- Mobile nav ---------- */
const navMenu   = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose  = document.getElementById('nav-close');

navToggle && navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
navClose  && navClose.addEventListener('click',  () => navMenu.classList.remove('show-menu'));

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('show-menu'));
});

/* ---------- Header active link on scroll ---------- */
const sections = document.querySelectorAll('section[id]');

function sectionActive(){
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const link = document.querySelector(`.nav__link[href*=${sectionId}]`);
    if (!link) return;
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link.classList.add('active-link');
    } else {
      link.classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', sectionActive);

/* ---------- Scroll up button ---------- */
const scrollUp = document.getElementById('scroll-up');
window.addEventListener('scroll', () => {
  if (window.scrollY >= 400) scrollUp.classList.add('show-scroll');
  else scrollUp.classList.remove('show-scroll');
});

/* ---------- Typed.js roles ---------- */
if (window.Typed) {
  new Typed('#home-typed', {
    strings: [
      'a Backend Developer.',
      'a Laravel Developer.',
      'a Node.js Developer.',
      'a Problem Solver.'
    ],
    typeSpeed: 55,
    backSpeed: 30,
    backDelay: 1400,
    startDelay: 400,
    loop: true,
    smartBackspace: true
  });
}

/* ---------- Terminal / JSON hero card typing ---------- */
const cardBody = document.getElementById('home-card-body');

const profileLines = [
  { k: 'name',       v: '"Nitish Goel"' },
  { k: 'role',       v: '"Backend Developer"' },
  { k: 'location',   v: '"Punjab, IN"' },
  { k: 'experience', v: '"1.5 years"' },
  { k: 'stack',      v: '["PHP","Laravel","Node.js","MongoDB"]' },
  { k: 'status',     v: '"available_for_freelance"' }
];

function buildJsonHTML(linesToShow, partialKey, partialVal, showCursorOnKey){
  const hasMoreAfter = (partialKey !== undefined) || (partialVal !== undefined);
  let out = `<span class="punc">{</span>\n`;
  linesToShow.forEach((line, i) => {
    const isLast = i === linesToShow.length - 1;
    const comma = (!isLast || hasMoreAfter) ? '<span class="punc">,</span>' : '';
    out += `  <span class="key">"${line.k}"</span><span class="punc">: </span><span class="str">${line.v}</span>${comma}\n`;
  });
  if (partialKey !== undefined) {
    out += `  <span class="key">"${partialKey}</span>${showCursorOnKey ? '<span class="home__cursor"></span>' : ''}`;
  } else if (partialVal !== undefined) {
    const line = profileLines[linesToShow.length];
    out += `  <span class="key">"${line.k}"</span><span class="punc">: </span><span class="str">${partialVal}<span class="home__cursor"></span></span>\n`;
  }
  out += `<span class="punc">}</span>`;
  return out;
}

async function typeProfileCard(){
  if (!cardBody) return;
  const done = [];

  for (const line of profileLines){
    // type the key
    let keyBuf = '';
    for (let i = 0; i < line.k.length; i++){
      keyBuf += line.k[i];
      cardBody.innerHTML = buildJsonHTML(done, keyBuf, undefined, true);
      await sleep(18);
    }
    cardBody.innerHTML = buildJsonHTML(done, undefined, '', false);
    await sleep(80);

    // type the value
    let valBuf = '';
    const charsToType = line.v;
    for (let i = 0; i < charsToType.length; i++){
      valBuf += charsToType[i];
      cardBody.innerHTML = buildJsonHTML(done, undefined, valBuf, false);
      await sleep(14);
    }
    done.push(line);
    cardBody.innerHTML = buildJsonHTML(done, undefined, undefined, false);
    await sleep(220);
  }

  // append a fake response footer
  await sleep(300);
  cardBody.innerHTML = buildJsonHTML(done) +
    `\n\n<span class="status">→ 200 OK</span> <span class="punc">·</span> response_time: 12ms`;
}

function sleep(ms){ return new Promise(res => setTimeout(res, ms)); }

window.addEventListener('DOMContentLoaded', () => {
  typeProfileCard();
});

/* ---------- Scroll reveal ---------- */
if (window.ScrollReveal) {
  const sr = ScrollReveal({
    origin: 'bottom',
    distance: '24px',
    duration: 700,
    delay: 80,
    reset: false
  });

  sr.reveal('.home__data', { origin: 'left', delay: 100 });
  sr.reveal('.home__card', { origin: 'right', delay: 200 });
  sr.reveal('.about__data', { origin: 'left' });
  sr.reveal('.about__image', { origin: 'right' });
  sr.reveal('.section__title', {});
  sr.reveal('.projects__card', { interval: 100 });
  sr.reveal('.resume__content', { interval: 120 });
  sr.reveal('.contact__form', { origin: 'left' });
  sr.reveal('.contact__content', { origin: 'right' });
}

/* ---------- Contact form (EmailJS) ----------
   NOTE: plug in your own EmailJS serviceID / templateID / publicKey
   at https://www.emailjs.com before this will actually send mail.
---------------------------------------------- */
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

contactForm && contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const SERVICE_ID  = 'YOUR_SERVICE_ID';
  const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
  const PUBLIC_KEY   = 'YOUR_PUBLIC_KEY';

  if (!window.emailjs || SERVICE_ID === 'YOUR_SERVICE_ID') {
    contactMessage.style.color = 'var(--warn)';
    contactMessage.textContent = 'Form wiring needed — add your EmailJS keys in main.js.';
    return;
  }

  contactMessage.style.color = 'var(--slate)';
  contactMessage.textContent = 'Sending…';

  emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm, PUBLIC_KEY)
    .then(() => {
      contactMessage.style.color = 'var(--ok)';
      contactMessage.textContent = 'Message sent — thank you! I\'ll reply soon.';
      contactForm.reset();
    })
    .catch(() => {
      contactMessage.style.color = '#FF5F57';
      contactMessage.textContent = 'Something went wrong — please email me directly.';
    });
});