/**
 * Cabinet Dr. Ilias Bouitcha - Core JavaScript Engine
 * Language Switcher (FR/AR), Responsive Interactions, Simulator & WhatsApp Integration
 */

document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentLang = localStorage.getItem('site_lang') || 'fr';

  // DOM Elements
  const htmlEl = document.documentElement;
  const langToggleBtns = document.querySelectorAll('.lang-toggle-btn');
  const siteHeader = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const drawerCloseBtn = document.querySelector('.drawer-close-btn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  // Contact & WhatsApp details
  const phoneRaw = '+212707971842';
  const phoneClean = '212707971842';

  // 1. Language Switcher Function
  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('site_lang', lang);

    htmlEl.lang = lang;
    htmlEl.dir = (lang === 'ar') ? 'rtl' : 'ltr';

    // Update text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (translations[lang][key]) {
        el.placeholder = translations[lang][key];
      }
    });

    // Update toggle button text
    langToggleBtns.forEach(btn => {
      btn.innerHTML = (lang === 'fr') 
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> العربية`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> Français`;
    });

    // Update simulator recommendation in current language
    updateSimulatorResult();
  }

  // Toggle Language Handler
  langToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const newLang = (currentLang === 'fr') ? 'ar' : 'fr';
      setLanguage(newLang);
    });
  });

  // Initialize Language
  setLanguage(currentLang);

  // 2. Sticky Header on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Drawer
  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', openDrawer);
  }
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
  }
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 4. Interactive Case Diagnostic Simulator
  const simOptionButtons = document.querySelectorAll('.sim-option-btn');
  const simResultBtn = document.getElementById('sim-whatsapp-dispatch');

  let simulatorState = {
    profile: 'Entreprise / Société',
    situation: 'Avis de vérification ou notification de redressement fiscal reçu',
    urgency: 'Urgent (Délai légal de 30 jours en cours d\'expiration)'
  };

  simOptionButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const step = this.closest('.sim-step-group').getAttribute('data-step');
      this.closest('.sim-options-grid').querySelectorAll('.sim-option-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const val = this.innerText.trim();
      if (step === 'profile') simulatorState.profile = val;
      if (step === 'situation') simulatorState.situation = val;
      if (step === 'urgency') simulatorState.urgency = val;

      updateSimulatorResult();
    });
  });

  function updateSimulatorResult() {
    if (!simResultBtn) return;
    
    let textMsg = '';
    if (currentLang === 'fr') {
      textMsg = `Bonjour Dr. Ilias Bouitcha,\n\nJ'ai complété le diagnostic sur votre site web :\n- Statut : ${simulatorState.profile}\n- Situation : ${simulatorState.situation}\n- Urgence : ${simulatorState.urgency}\n\nJe souhaite solliciter une consultation pour examiner mon dossier.`;
    } else {
      textMsg = `السلام عليكم دكتور إلياس بويتشة،\n\nقمت بإجراء تشخيص لملفي عبر موقعكم الإلكتروني :\n- الصفة : ${simulatorState.profile}\n- طبيعة الملف : ${simulatorState.situation}\n- درجة الاستعجال : ${simulatorState.urgency}\n\nأود حجز استشارة لبحث تفاصيل الملف وحماية حقوقي.`;
    }

    const waUrl = `https://wa.me/${phoneClean}?text=${encodeURIComponent(textMsg)}`;
    simResultBtn.setAttribute('href', waUrl);
  }

  // 5. Video Play & Theatre Lightbox Interaction
  const videoLightbox = document.getElementById('video-lightbox-modal');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxPlayerSlot = document.getElementById('lightbox-player-slot');
  const lightboxSpinner = document.getElementById('lightbox-spinner');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxBadge = document.getElementById('lightbox-badge');
  const lightboxIgBtn = document.getElementById('lightbox-ig-btn');
  const lightboxCopyBtn = document.getElementById('lightbox-copy-btn');
  const lightboxCopyText = document.getElementById('lightbox-copy-text');

  function openVideoModal(reelId, title, badge) {
    if (!videoLightbox || !lightboxPlayerSlot) return;

    if (lightboxTitle) lightboxTitle.textContent = title || 'Capsule Vidéo';
    if (lightboxBadge) lightboxBadge.textContent = badge || 'Reel Instagram • @ilias_bouitcha';
    
    const reelUrl = `https://www.instagram.com/reel/${reelId}/`;
    if (lightboxIgBtn) lightboxIgBtn.setAttribute('href', reelUrl);

    // Show loading spinner
    if (lightboxSpinner) lightboxSpinner.style.display = 'flex';
    lightboxPlayerSlot.innerHTML = '';

    // Create responsive Instagram embed iframe
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.instagram.com/reel/${reelId}/embed/`;
    iframe.setAttribute('allowtransparency', 'true');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.minHeight = '540px';
    iframe.style.border = 'none';

    iframe.onload = () => {
      if (lightboxSpinner) lightboxSpinner.style.display = 'none';
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
      }
    };

    lightboxPlayerSlot.appendChild(iframe);
    videoLightbox.classList.add('active');
    videoLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    if (!videoLightbox) return;
    videoLightbox.classList.remove('active');
    videoLightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Stop playback by clearing iframe
    if (lightboxPlayerSlot) lightboxPlayerSlot.innerHTML = '';
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeVideoModal);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeVideoModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoLightbox && videoLightbox.classList.contains('active')) {
      closeVideoModal();
    }
  });

  if (lightboxCopyBtn && lightboxCopyText) {
    lightboxCopyBtn.addEventListener('click', () => {
      const url = lightboxIgBtn ? lightboxIgBtn.getAttribute('href') : window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          const originalText = lightboxCopyText.textContent;
          const copiedMsg = (currentLang === 'ar') ? 'تم نسخ الرابط !' : 'Lien copié !';
          lightboxCopyText.textContent = copiedMsg;
          lightboxCopyBtn.style.borderColor = 'var(--gold-primary)';
          setTimeout(() => {
            lightboxCopyText.textContent = originalText;
            lightboxCopyBtn.style.borderColor = '';
          }, 2200);
        });
      }
    });
  }

  // Bind video cards (thumbnails, play buttons, and primary watch buttons)
  const videoCards = document.querySelectorAll('.video-card');
  videoCards.forEach(card => {
    const reelId = card.getAttribute('data-reel-id');
    const overlay = card.querySelector('.video-overlay-preview');
    const watchBtn = card.querySelector('.btn-watch-modal');
    const titleEl = card.querySelector('.video-details h3');
    const badgeEl = card.querySelector('.video-badge');

    const getTitle = () => titleEl ? titleEl.textContent : '';
    const getBadge = () => badgeEl ? badgeEl.textContent : '';

    // Clicking overlay preview opens theatre player
    if (overlay && reelId) {
      overlay.addEventListener('click', (e) => {
        e.preventDefault();
        openVideoModal(reelId, getTitle(), getBadge());
      });
      overlay.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openVideoModal(reelId, getTitle(), getBadge());
        }
      });
    }

    // Clicking "Visionner la Vidéo" button opens modal
    if (watchBtn && reelId) {
      watchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openVideoModal(reelId, getTitle(), getBadge());
      });
    }
  });

  // 6. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 7. Contact Form Submission Handling
  const contactForm = document.getElementById('consultation-form');
  const formAlert = document.getElementById('form-alert-msg');
  const directWaBtn = document.getElementById('form-direct-wa-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const phone = document.getElementById('form-phone').value.trim();
      const subject = document.getElementById('form-subject').value;
      const message = document.getElementById('form-message').value.trim();

      if (!name || !phone) {
        alert(currentLang === 'fr' ? 'Veuillez renseigner votre nom et votre numéro de téléphone.' : 'يرجى إدخال الاسم ورقم الهاتف.');
        return;
      }

      // Format WhatsApp Message
      let waText = '';
      if (currentLang === 'fr') {
        waText = `*Nouvelle Demande de Consultation - Cabinet Dr. Bouitcha*\n\n` +
                 `👤 *Nom / Entité* : ${name}\n` +
                 `📞 *Téléphone* : ${phone}\n` +
                 `📂 *Objet* : ${subject}\n` +
                 `📝 *Message* :\n${message}`;
      } else {
        waText = `*طلب استشارة جديد - مكتب الدكتور إلياس بويتشة*\n\n` +
                 `👤 *الاسم / الشركة* : ${name}\n` +
                 `📞 *الهاتف* : ${phone}\n` +
                 `📂 *موضوع الاستشارة* : ${subject}\n` +
                 `📝 *ملخص القضية* :\n${message}`;
      }

      // Show success alert
      if (formAlert) {
        formAlert.className = 'form-alert success';
        formAlert.style.display = 'block';
      }

      // Open WhatsApp automatically
      const waLink = `https://wa.me/${phoneClean}?text=${encodeURIComponent(waText)}`;
      setTimeout(() => {
        window.open(waLink, '_blank');
      }, 600);

      contactForm.reset();
    });
  }

  if (directWaBtn) {
    directWaBtn.addEventListener('click', () => {
      const defaultText = (currentLang === 'fr')
        ? "Bonjour Dr. Ilias Bouitcha, je vous contacte depuis votre site web pour solliciter un conseil juridique et fiscal."
        : "السلام عليكم دكتور إلياس بويتشة، أتواصل معكم عبر موقعكم الإلكتروني لطلب استشارة قانونية وضريبية.";
      window.open(`https://wa.me/${phoneClean}?text=${encodeURIComponent(defaultText)}`, '_blank');
    });
  }

  // 8. Smooth scrolling for hash links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
