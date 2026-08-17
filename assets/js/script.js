// =========================================================
// SIF ACADEMY — script.js
// Menu mobile, animations au scroll, formulaire WhatsApp
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Navbar sticky shadow ---------- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 12);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  /* ---------- Menu mobile (hamburger) ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
      document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Animations au scroll (reveal) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- Formulaire de contact -> WhatsApp ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    const status = document.getElementById('form-status');
    const WHATSAPP_NUMBER = '2290162781863'; // Format international, sans + ni espaces

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nom = form.querySelector('#nom').value.trim();
      const telephone = form.querySelector('#telephone').value.trim();
      const email = form.querySelector('#email').value.trim();
      const formation = form.querySelector('#formation').value;
      const typeDemande = form.querySelector('#type-demande').value;
      const message = form.querySelector('#message').value.trim();
      const consent = form.querySelector('#consent').checked;

      // Validation des champs obligatoires
      if (!nom || !telephone || !email || !formation || !typeDemande || !consent) {
        showStatus('Merci de remplir tous les champs obligatoires et d\'accepter l\'utilisation de vos informations.', 'error');
        return;
      }

      // Construction du message WhatsApp
      let texte = 'Bonjour SIF Academy,\n\n';
      texte += 'Je souhaite obtenir des informations concernant vos formations.\n\n';
      texte += `Nom et prénom : ${nom}\n`;
      texte += `Téléphone : ${telephone}\n`;
      texte += `E-mail : ${email}\n`;
      texte += `Formation souhaitée : ${formation}\n`;
      texte += `Type de demande : ${typeDemande}\n\n`;
      texte += 'Message :\n';
      texte += `${message || 'Aucun message complémentaire.'}\n\n`;
      texte += 'Merci.';

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texte)}`;

      showStatus('Votre demande est prête : ouverture de WhatsApp…', 'success');
      window.open(url, '_blank');
    });

    function showStatus(msg, type) {
      status.textContent = msg;
      status.className = `form-status show ${type}`;
    }
  }

  /* ---------- Pré-remplissage "formation" depuis la page Formations ---------- */
  const params = new URLSearchParams(window.location.search);
  const preFill = params.get('formation');
  const formationSelect = document.getElementById('formation');
  if (preFill && formationSelect) {
    [...formationSelect.options].forEach(opt => {
      if (opt.value === preFill) opt.selected = true;
    });
  }
});
