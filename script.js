/* ============================================================
   ELITE CLUB — EMSI CASABLANCA | script.js
   Handles: Navbar scroll, mobile menu, smooth scroll,
            FAQ accordion, form submit, particles, scroll reveal,
            Language Toggle (i18n)
============================================================ */

// ============================================================
// NAVBAR — Scroll & Mobile
// ============================================================
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animate hamburger
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// Active nav link highlight
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (navLink) {
      if (scrollPos >= top && scrollPos < bottom) {
        document.querySelectorAll('.nav-links a').forEach(l => l.style.color = '');
        navLink.style.color = 'var(--gold)';
      }
    }
  });
}

// ============================================================
// SMOOTH SCROLL
// ============================================================
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

// All internal anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});

// ============================================================
// FAQ ACCORDION
// ============================================================
function toggleFaq(item) {
  const isActive = item.classList.contains('active');

  // Close all
  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.remove('active');
  });

  // Open clicked if it wasn't already open
  if (!isActive) {
    item.classList.add('active');
  }
}

// ============================================================
// FORM SUBMIT
// ============================================================
function handleFormSubmit(e) {
  e.preventDefault();

  const form    = document.getElementById('joinForm');
  const btn     = form.querySelector('.btn-primary');
  const success = document.getElementById('formSuccess');

  // Simulate sending
  btn.disabled = true;
  const isEn = document.body.classList.contains('lang-en');
  btn.innerHTML = isEn 
    ? '<i class="fas fa-spinner fa-spin"></i> Sending...'
    : '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

  setTimeout(() => {
    btn.style.display = 'none';
    success.classList.add('show');
    form.reset();
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1800);
}

// ============================================================
// FLOATING PARTICLES (Hero Section)
// ============================================================
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 40;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random size between 1px and 4px
    const size = Math.random() * 3 + 1;
    particle.style.width  = `${size}px`;
    particle.style.height = `${size}px`;

    // Random horizontal position
    particle.style.left = `${Math.random() * 100}%`;

    // Random animation duration and delay
    const duration = Math.random() * 12 + 8;
    const delay    = Math.random() * 10;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay   = `${delay}s`;

    // Slightly vary the color
    const isGold = Math.random() > 0.3;
    particle.style.background = isGold
      ? `rgba(212, 175, 55, ${Math.random() * 0.7 + 0.3})`
      : `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;

    container.appendChild(particle);
  }
}

createParticles();

// ============================================================
// SCROLL REVEAL ANIMATION
// ============================================================
function initScrollReveal() {
  // Add reveal class to animatable elements
  const targets = document.querySelectorAll(
    '.pole-card, .event-card, .board-card, .value-card, .partner-logo-card, ' +
    '.contact-card, .faq-item, .timeline-card, .ach-num-card, ' +
    '.about-card-main, .about-card-accent, .partner-main-card, .join-perks, .join-form'
  );

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger siblings if they have data-delay
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(el => observer.observe(el));
}

initScrollReveal();

// ============================================================
// SECTION HEADER ANIMATIONS
// ============================================================
function initSectionHeaders() {
  const headers = document.querySelectorAll('.section-header');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  headers.forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(25px)';
    header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(header);
  });
}

initSectionHeaders();

// ============================================================
// CLOSE MOBILE MENU ON OUTSIDE CLICK
// ============================================================
document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('open') &&
    !navLinks.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// ============================================================
// KEYBOARD ACCESSIBILITY — FAQ
// ============================================================
document.querySelectorAll('.faq-item').forEach(item => {
  item.setAttribute('tabindex', '0');
  item.setAttribute('role', 'button');
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFaq(item);
    }
  });
});

// ============================================================
// FOOTER YEAR (auto-update)
// ============================================================
const footerYearEl = document.getElementById('footerYear');
if (footerYearEl) {
  footerYearEl.textContent = new Date().getFullYear();
}

// ============================================================
// BILINGUAL SUPPORT (i18n)
// ============================================================
const translations = {
  fr: {
    nav_home: "Accueil",
    nav_about: "À Propos",
    nav_poles: "Nos Pôles",
    nav_events: "Événements",
    nav_ach: "Réalisations",
    nav_board: "Bureau",
    nav_partners: "Partenaires",
    nav_join: "Rejoindre",
    nav_faq: "FAQ",
    nav_contact: "Contact",
    nav_cta: "Rejoindre le Club",
    hero_subtitle: "Un espace d'excellence, de croissance et d'appartenance pour les étudiants de l'EMSI Casablanca. Rejoignez une communauté qui transforme des ambitions en réalisations.",
    hero_cta: "Rejoindre le Club",
    hero_discover: "Découvrir",
    hero_scroll: "Défiler",
    about_tag: "Qui sommes-nous",
    about_title: "À",
    about_title_gold: "Propos",
    about_title2: "de Nous",
    about_intro: "est le club officiel de l'<strong>EMSI Casablanca</strong>, un espace conçu pour les étudiants ambitieux qui souhaitent dépasser les limites de leur parcours académique.",
    about_p1: "Fondé sur des valeurs d'excellence, de solidarité et d'innovation, le club offre un environnement stimulant où chaque membre développe ses compétences professionnelles, son leadership et son réseau.",
    about_p2: "Nous croyons que la réussite se construit au-delà des cours magistraux — à travers des projets concrets, des rencontres inspirantes et des défis qui forgent le caractère.",
    val1_title: "Excellence",
    val1_desc: "Viser le meilleur dans chaque initiative.",
    val2_title: "Solidarité",
    val2_desc: "Grandir ensemble, réussir ensemble.",
    val3_title: "Innovation",
    val3_desc: "Repousser les frontières du possible.",
    val4_title: "Appartenance",
    val4_desc: "Une famille, une identité, un club.",
    mission_title: "Notre Mission",
    mission_text: "L'Elite Club est un espace dédié au développement personnel, au leadership et au débat. Notre objectif est d'aider les étudiants à acquérir les compétences indispensables pour leur parcours et leur future vie professionnelle à travers des formations, soft skills, séminaires \"Success stories\" et actions citoyennes.",
    poles_tag: "Nos Départements",
    poles_title: "Nos",
    poles_title_gold: "Pôles",
    poles_title2: "& Activités",
    poles_sub: "Six pôles d'expertise pour couvrir toutes les dimensions de votre développement personnel et professionnel.",
    pole1_title: "Pôle Design & Médias",
    pole1_desc: "Création graphique, identité visuelle, production vidéo et gestion des réseaux sociaux du club.",
    pole2_title: "Pôle Logistique & Événements",
    pole2_desc: "Organisation et coordination de tous les événements, forums et activités du club.",
    pole3_title: "Pôle Soft Skills",
    pole3_desc: "Ateliers de prise de parole, leadership, intelligence émotionnelle et développement personnel.",
    pole4_title: "Pôle Relations Externes",
    pole4_desc: "Gestion des partenariats avec des entreprises, institutions et autres clubs universitaires.",
    pole5_title: "Pôle Actions Humanitaires",
    pole5_desc: "Initiatives citoyennes, actions solidaires et engagement social au sein et au-delà du campus.",
    pole6_title: "Pôle RH & Vie Associative",
    pole6_desc: "Gestion des membres, recrutement, animation de la communauté et vie interne du club.",
    events_tag: "Agenda",
    events_title: "Événements &",
    events_title_gold: "Agenda",
    events_sub: "Restez connectés aux prochaines activités et forums de l'Elite Club.",
    event_badge: "À venir",
    event_cat: "Forum",
    event1_title: "Le Forum",
    event1_desc: "Le grand rendez-vous de l'Elite Club — un forum de networking, de partage et d'inspiration où étudiants, professionnels et partenaires se réunissent pour construire ensemble.",
    event1_time: "À confirmer",
    ach_tag: "Notre Parcours",
    ach_title: "Nos",
    ach_title_gold: "Réalisations",
    ach_sub: "Les premiers pas d'une grande aventure.",
    ach1_title: "Fondation de l'Elite Club",
    ach1_desc: "Création officielle de l'Elite Club à l'EMSI Casablanca. Le lancement d'une communauté dédiée au développement personnel, au leadership et au débat étudiant.",
    board_tag: "Notre Équipe",
    board_title: "Le Bureau",
    board_title_gold: "Exécutif",
    board_sub: "Les visionnaires qui fondent et pilotent l'Elite Club.",
    board_pres_dept: "Direction Générale & Vision Stratégique",
    board_vp_dept: "Coordination Interne & Opérations",
    board_sg_dept: "Administration & Documentation",
    board_treso_dept: "Gestion Financière & Budget",
    board_part_dept: "Relations Extérieures & Partenariats",
    board_event_dept: "Organisation & Coordination Événementielle",
    board_design_dept: "Identité Visuelle & Médias",
    board_hum_dept: "Initiatives Citoyennes & Solidarité",
    board_cm_dept: "Réseaux Sociaux & Engagement Digital",
    board_rh_dept: "Gestion des Membres & Animation Interne",
    board_photo_dept: "Photographie & Post-Production",
    board_cons_dept: "Conseil Stratégique & Orientation",
    partners_tag: "Nos Partenaires",
    partners_title: "Ils nous font",
    partners_title_gold: "Confiance",
    partners_sub: "Des institutions et organisations qui soutiennent notre vision d'excellence.",
    partner_main_label: "Établissement d'accueil",
    partner_emsi_desc: "Notre école partenaire et maison-mère, qui soutient et encadre les activités de l'Elite Club au sein de son campus.",
    partner_inst_label: "Partenaires",
    join_tag: "Candidature",
    join_title: "Rejoindre l'",
    join_sub: "Remplissez ce formulaire pour soumettre votre candidature. Bienvenue dans l'élite.",
    perks_title: "Pourquoi nous rejoindre ?",
    perk1: "Accès à des événements et ateliers exclusifs",
    perk2: "Réseau de professionnels et d'alumni",
    perk3: "Développement de vos soft skills & leadership",
    perk4: "Expériences et projets valorisables sur votre CV",
    perk5: "Communauté soudée et bienveillante",
    perk6: "Formations, séminaires et actions citoyennes",
    form_first: "Prénom *",
    form_first_ph: "Votre prénom",
    form_last: "Nom *",
    form_last_ph: "Votre nom",
    form_email: "Email EMSI *",
    form_phone: "Numéro WhatsApp *",
    form_level: "Niveau d'études *",
    form_level_ph: "Sélectionner...",
    form_filiere: "Filière *",
    form_filiere_ph: "Ex: Génie Informatique",
    form_pole: "Pôle d'intérêt *",
    form_pole_ph: "Choisir un pôle...",
    form_motiv: "Lettre de motivation *",
    form_motiv_ph: "Pourquoi souhaitez-vous rejoindre l'Elite Club ? Quelles sont vos motivations ?",
    form_terms: "J'accepte le règlement intérieur de l'Elite Club et m'engage à contribuer activement.",
    form_submit: "Soumettre ma candidature",
    form_success: "Candidature envoyée avec succès ! Nous vous contacterons très bientôt. Welcome to the Elite. ⚜",
    faq_tag: "Questions Fréquentes",
    faq_sub: "Tout ce que vous devez savoir avant de nous rejoindre.",
    faq1_q: "Qui peut rejoindre l'Elite Club ?",
    faq1_a: "Tout étudiant régulièrement inscrit à l'EMSI Casablanca, quelle que soit sa filière ou son niveau d'études, peut candidater à l'Elite Club. Nous valorisons la motivation et la volonté de contribuer.",
    faq2_q: "Y a-t-il des frais d'adhésion ?",
    faq2_a: "Des frais d'adhésion minimes peuvent s'appliquer pour couvrir les dépenses opérationnelles. Ces informations vous seront communiquées lors du processus d'intégration.",
    faq3_q: "Comment se déroule le processus de sélection ?",
    faq3_a: "Après soumission du formulaire, les candidats sélectionnés seront conviés à un entretien de motivation avec le bureau exécutif. Le processus dure environ 1 à 2 semaines.",
    faq4_q: "Quelle est la charge de travail requise ?",
    faq4_a: "L'implication est flexible et adaptée à votre emploi du temps académique. En moyenne, 3 à 5 heures par semaine selon les activités en cours.",
    faq5_q: "Peut-on rejoindre le club en cours d'année ?",
    faq5_a: "Les recrutements se font principalement en début d'année académique. Des recrutements ponctuels peuvent avoir lieu selon les besoins des pôles. Suivez nos réseaux pour rester informé.",
    faq6_q: "Quels bénéfices concrets vais-je tirer du club ?",
    faq6_a: "Réseau professionnel étendu, formations certifiantes, expériences valorisables sur votre CV, rencontres avec des professionnels, et une communauté qui vous soutient tout au long de vos études.",
    contact_tag: "Nous Contacter",
    contact_title: "Contactez-",
    contact_title_gold: "nous",
    contact_sub: "Suivez-nous et rejoignez la conversation sur toutes nos plateformes.",
    soon: "Bientôt",
    contact_wa: "Contactez-nous directement via WhatsApp.",
    coming_soon: "Disponible bientôt",
    contact_ig: "Suivez notre quotidien, nos événements et nos coulisses.",
    contact_fb: "Notre page officielle avec toutes nos actualités.",
    contact_tt: "Nos moments forts, vlogs d'événements et contenus créatifs.",
    contact_mail: "Pour les demandes formelles, partenariats et collaborations.",
    contact_loc_title: "Notre Adresse",
    contact_loc_desc: "Campus EMSI Casablanca — Casablanca, Maroc",
    contact_loc_link: "Voir sur Maps",
    footer_school: "Club Officiel — EMSI Casablanca",
    footer_nav: "Navigation",
    footer_club: "Club",
    footer_follow: "Suivez-nous",
    footer_cta_text: "Rejoignez la communauté !",
    footer_cta_btn: "Candidater maintenant",
    footer_rights: "Tous droits réservés."
  },
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_poles: "Our Poles",
    nav_events: "Events",
    nav_ach: "Achievements",
    nav_board: "Board",
    nav_partners: "Partners",
    nav_join: "Join Us",
    nav_faq: "FAQ",
    nav_contact: "Contact",
    nav_cta: "Join the Club",
    hero_subtitle: "A space of excellence, growth, and belonging for EMSI Casablanca students. Join a community that turns ambitions into achievements.",
    hero_cta: "Join the Club",
    hero_discover: "Discover",
    hero_scroll: "Scroll",
    about_tag: "Who we are",
    about_title: "About",
    about_title_gold: "Us",
    about_title2: "",
    about_intro: "is the official club of <strong>EMSI Casablanca</strong>, a space designed for ambitious students who want to push the boundaries of their academic journey.",
    about_p1: "Built on the values of excellence, solidarity, and innovation, the club offers a stimulating environment where every member develops their professional skills, leadership, and network.",
    about_p2: "We believe that success is built beyond lectures — through concrete projects, inspiring encounters, and character-building challenges.",
    val1_title: "Excellence",
    val1_desc: "Striving for the best in every initiative.",
    val2_title: "Solidarity",
    val2_desc: "Growing together, succeeding together.",
    val3_title: "Innovation",
    val3_desc: "Pushing the boundaries of what's possible.",
    val4_title: "Belonging",
    val4_desc: "One family, one identity, one club.",
    mission_title: "Our Mission",
    mission_text: "Elite Club is a space dedicated to personal development, leadership, and debate. Our goal is to help students acquire the essential skills for their journey and future professional life through training, soft skills, 'Success stories' seminars, and civic actions.",
    poles_tag: "Our Departments",
    poles_title: "Our",
    poles_title_gold: "Poles",
    poles_title2: "& Activities",
    poles_sub: "Six centers of expertise covering all dimensions of your personal and professional development.",
    pole1_title: "Design & Media Pole",
    pole1_desc: "Graphic design, visual identity, video production, and club social media management.",
    pole2_title: "Logistics & Events Pole",
    pole2_desc: "Organization and coordination of all club events, forums, and activities.",
    pole3_title: "Soft Skills Pole",
    pole3_desc: "Public speaking workshops, leadership, emotional intelligence, and personal development.",
    pole4_title: "External Relations Pole",
    pole4_desc: "Managing partnerships with companies, institutions, and other university clubs.",
    pole5_title: "Humanitarian Actions Pole",
    pole5_desc: "Civic initiatives, solidarity actions, and social engagement on and off campus.",
    pole6_title: "HR & Community Life Pole",
    pole6_desc: "Member management, recruitment, community building, and internal club life.",
    events_tag: "Agenda",
    events_title: "Events &",
    events_title_gold: "Agenda",
    events_sub: "Stay connected to the upcoming activities and forums of the Elite Club.",
    event_badge: "Upcoming",
    event_cat: "Forum",
    event1_title: "The Forum",
    event1_desc: "The major gathering of the Elite Club — a forum for networking, sharing, and inspiration where students, professionals, and partners come together to build.",
    event1_time: "To be confirmed",
    ach_tag: "Our Journey",
    ach_title: "Our",
    ach_title_gold: "Achievements",
    ach_sub: "The first steps of a great adventure.",
    ach1_title: "Foundation of Elite Club",
    ach1_desc: "Official creation of Elite Club at EMSI Casablanca. The launch of a community dedicated to personal development, leadership, and student debate.",
    board_tag: "Our Team",
    board_title: "The Executive",
    board_title_gold: "Board",
    board_sub: "The visionaries who founded and lead the Elite Club.",
    board_pres_dept: "General Management & Strategic Vision",
    board_vp_dept: "Internal Coordination & Operations",
    board_sg_dept: "Administration & Documentation",
    board_treso_dept: "Financial Management & Budget",
    board_part_dept: "External Relations & Partnerships",
    board_event_dept: "Event Organization & Coordination",
    board_design_dept: "Visual Identity & Media",
    board_hum_dept: "Civic Initiatives & Solidarity",
    board_cm_dept: "Social Networks & Digital Engagement",
    board_rh_dept: "Member Management & Internal Animation",
    board_photo_dept: "Photography & Post-Production",
    board_cons_dept: "Strategic Consulting & Orientation",
    partners_tag: "Our Partners",
    partners_title: "They Trust",
    partners_title_gold: "Us",
    partners_sub: "Institutions and organizations that support our vision of excellence.",
    partner_main_label: "Host Institution",
    partner_emsi_desc: "Our partner school and home institution, which supports and oversees Elite Club activities within its campus.",
    partner_inst_label: "Partners",
    join_tag: "Application",
    join_title: "Join the",
    join_sub: "Fill out this form to submit your application. Welcome to the elite.",
    perks_title: "Why join us?",
    perk1: "Access to exclusive events and workshops",
    perk2: "Network of professionals and alumni",
    perk3: "Development of your soft skills & leadership",
    perk4: "Experiences and projects to boost your CV",
    perk5: "Tight-knit and supportive community",
    perk6: "Training, seminars, and civic actions",
    form_first: "First Name *",
    form_first_ph: "Your first name",
    form_last: "Last Name *",
    form_last_ph: "Your last name",
    form_email: "EMSI Email *",
    form_phone: "WhatsApp Number *",
    form_level: "Year of Study *",
    form_level_ph: "Select...",
    form_filiere: "Major/Field *",
    form_filiere_ph: "Ex: Computer Engineering",
    form_pole: "Pole of Interest *",
    form_pole_ph: "Choose a pole...",
    form_motiv: "Motivation Letter *",
    form_motiv_ph: "Why do you want to join Elite Club? What are your motivations?",
    form_terms: "I accept the Elite Club internal regulations and commit to actively contributing.",
    form_submit: "Submit my application",
    form_success: "Application sent successfully! We will contact you very soon. Welcome to the Elite. ⚜",
    faq_tag: "Frequently Asked Questions",
    faq_sub: "Everything you need to know before joining us.",
    faq1_q: "Who can join the Elite Club?",
    faq1_a: "Any student regularly enrolled at EMSI Casablanca, regardless of their major or year of study, can apply to Elite Club. We value motivation and willingness to contribute.",
    faq2_q: "Are there any membership fees?",
    faq2_a: "Minimal membership fees may apply to cover operational expenses. This information will be communicated during the integration process.",
    faq3_q: "How does the selection process work?",
    faq3_a: "After submitting the form, selected candidates will be invited to a motivation interview with the executive board. The process takes about 1 to 2 weeks.",
    faq4_q: "What is the expected workload?",
    faq4_a: "Involvement is flexible and adapted to your academic schedule. On average, 3 to 5 hours per week depending on ongoing activities.",
    faq5_q: "Can I join the club during the year?",
    faq5_a: "Recruitment mainly takes place at the beginning of the academic year. Occasional recruitments may happen depending on pole needs. Follow our socials to stay informed.",
    faq6_q: "What concrete benefits will I get from the club?",
    faq6_a: "Extensive professional network, certified training, experiences to enhance your CV, meetings with professionals, and a community that supports you throughout your studies.",
    contact_tag: "Contact Us",
    contact_title: "Contact",
    contact_title_gold: "Us",
    contact_sub: "Follow us and join the conversation on all our platforms.",
    soon: "Soon",
    contact_wa: "Contact us directly via WhatsApp.",
    coming_soon: "Available soon",
    contact_ig: "Follow our daily life, events, and behind the scenes.",
    contact_fb: "Our official page with all our news.",
    contact_tt: "Our highlights, event vlogs, and creative content.",
    contact_mail: "For formal requests, partnerships, and collaborations.",
    contact_loc_title: "Our Address",
    contact_loc_desc: "EMSI Casablanca Campus — Casablanca, Morocco",
    contact_loc_link: "View on Maps",
    footer_school: "Official Club — EMSI Casablanca",
    footer_nav: "Navigation",
    footer_club: "Club",
    footer_follow: "Follow Us",
    footer_cta_text: "Join the community!",
    footer_cta_btn: "Apply now",
    footer_rights: "All rights reserved."
  }
};

let currentLang = 'fr';
const langToggleBtn = document.getElementById('langToggle');
const langLabel = document.getElementById('langLabel');

if (langToggleBtn) {
  langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    langLabel.textContent = currentLang === 'fr' ? 'EN' : 'FR';
    document.body.className = `lang-${currentLang}`;
    updateLanguage();
  });
}

function updateLanguage() {
  const dict = translations[currentLang];
  
  // Update text elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (el.tagName.toLowerCase() === 'strong') {
        el.innerHTML = dict[key];
      } else {
        el.innerHTML = dict[key]; // use innerHTML to support nested tags inside translations
      }
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });
}
