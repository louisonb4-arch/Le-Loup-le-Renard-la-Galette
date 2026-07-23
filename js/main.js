/* Le Loup, le Renard & la Galette — interactions */

// ----- Ouverture : rideau de la fable (une fois par session) -----
// La classe `avec-intro` est posée sur <html> dans le <head> (sessionStorage).
// Timeline : ~1,7 s de lecture, puis le rideau se lève en 0,95 s (transition).
const racine = document.documentElement;
const ouverture = document.getElementById('ouverture');

if (racine.classList.contains('avec-intro')) {
  const finIntro = () => {
    racine.classList.remove('avec-intro', 'intro-sortie');
    if (ouverture) ouverture.style.display = 'none';
    document.body.style.overflow = '';
  };
  const mouvementReduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!ouverture || mouvementReduit) {
    finIntro();
  } else {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      racine.classList.add('intro-sortie');
      ouverture.addEventListener('transitionend', finIntro, { once: true });
      setTimeout(finIntro, 1400); // filet de sécurité si transitionend ne vient pas
    }, 1700);
  }
}

// ----- Nav : fond solide après le hero -----
const nav = document.getElementById('nav');
const majNav = () => {
  nav.classList.toggle('est-solide', window.scrollY > window.innerHeight * 0.7);
};
majNav();
window.addEventListener('scroll', majNav, { passive: true });

// ----- Menu mobile -----
const burger = document.getElementById('burger');
const mmenu = document.getElementById('mobileMenu');

const fermerMenu = () => {
  nav.classList.remove('menu-ouvert');
  mmenu.classList.remove('est-ouvert');
  mmenu.setAttribute('aria-hidden', 'true');
  burger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
};

burger.addEventListener('click', () => {
  const ouvert = mmenu.classList.toggle('est-ouvert');
  nav.classList.toggle('menu-ouvert', ouvert);
  mmenu.setAttribute('aria-hidden', String(!ouvert));
  burger.setAttribute('aria-expanded', String(ouvert));
  document.body.style.overflow = ouvert ? 'hidden' : '';
});

mmenu.querySelectorAll('a').forEach((lien) => lien.addEventListener('click', fermerMenu));

// ----- Révélations au scroll -----
const observateur = new IntersectionObserver(
  (entrees) => {
    entrees.forEach((entree) => {
      if (entree.isIntersecting) {
        entree.target.classList.add('est-visible');
        observateur.unobserve(entree.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => observateur.observe(el));

// ----- Bestiaire : accordéon -----
document.querySelectorAll('.bete__tete').forEach((tete) => {
  tete.addEventListener('click', () => {
    const bete = tete.closest('.bete');
    const ouvert = bete.classList.toggle('est-ouverte');
    tete.setAttribute('aria-expanded', String(ouvert));
  });
});
