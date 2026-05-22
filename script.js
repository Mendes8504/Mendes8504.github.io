// =======================================================
// EFEITO DE DIGITAÇÃO
// =======================================================
const frases = [
    "Estudante de ADS",
    "Desenvolvedor Back-End (C / Java)",
    "Entusiasta de React Native",
    "Futuro Full Stack"
];

let i = 0, j = 0;
let currentPhrase = [];
let isDeleting = false;

function loopDigitacao() {
    const text = frases[i];

    if (isDeleting) {
        currentPhrase.pop();
        j--;
    } else {
        currentPhrase.push(text[j]);
        j++;
    }

    const el = document.querySelector(".digitando");
    if (el) el.innerHTML = currentPhrase.join("");

    let time = isDeleting ? 80 : 160;

    if (!isDeleting && j === text.length) {
        time = 2200;
        isDeleting = true;
    }

    if (isDeleting && j === 0) {
        currentPhrase = [];
        isDeleting = false;
        i = (i + 1) % frases.length;
    }

    setTimeout(loopDigitacao, time);
}

// =======================================================
// SCROLL REVEAL
// =======================================================
function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// =======================================================
// BARRAS DE HABILIDADE (animam ao entrar na tela)
// =======================================================
function initSkillBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill-fill').forEach(bar => {
                    bar.classList.add('animado');
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.habilidade-grupo').forEach(el => observer.observe(el));
}

// =======================================================
// MENU MOBILE
// =======================================================
function initMenuMobile() {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('mobileNav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    // Fecha ao clicar em um link
    nav.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
        });
    });
}

// =======================================================
// MENU ATIVO AO ROLAR
// =======================================================
function initActiveMenu() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('#menu nav a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.style.color = 'var(--azul)';
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
}

// =======================================================
// INIT
// =======================================================
document.addEventListener('DOMContentLoaded', () => {
    loopDigitacao();
    initReveal();
    initSkillBars();
    initMenuMobile();
    initActiveMenu();
});