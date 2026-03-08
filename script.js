document.addEventListener("DOMContentLoaded", function () {

  // =============================================
  // SMOOTH SCROLL — for all anchor links
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // =============================================
  // VIEW WORKS BUTTON — scrolls to #work section
  // =============================================
  const viewWorksBtn = document.getElementById('viewWorksBtn');
  if (viewWorksBtn) {
    viewWorksBtn.addEventListener('click', () => {
      const workSection = document.querySelector('#work');
      if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // =============================================
  // SCROLL-TRIGGERED FADE-INS
  // Respects prefers-reduced-motion for accessibility
  // =============================================
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduceMotion) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('section, .card, .key').forEach(el => {
      el.classList.add('fade-in');
      fadeObserver.observe(el);
    });
  }

  // =============================================
  // ACTIVE NAV LINK — highlights current section
  // =============================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  if (sections.length && navLinks.length) {
    const highlightNav = () => {
      let current = '';
      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 140) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
      });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();
  }

  // =============================================
  // LIGHTBOX — triggers on ALL content images
  // Excludes: logo, nav icons, cursor, card-image
  // thumbnails (those link to project pages instead)
  // =============================================
  const lightboxImages = document.querySelectorAll(
    'img:not(.footer-logo):not(.card-image):not(.keyring img):not(.key img)'
  );

  if (lightboxImages.length) {
    initLightbox(lightboxImages);
  }

});


// =============================================
// CUSTOM CURSOR — 90s retro arrow
// =============================================
const cursor = document.querySelector('.cursor');

if (cursor) {
  window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });

  document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
  document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
}


// =============================================
// LIGHTBOX FUNCTION
// =============================================
function initLightbox(imageNodeList) {
  const lightbox        = document.getElementById('lightbox');
  const lightboxImg     = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn        = document.querySelector('.close');
  const prevBtn         = document.querySelector('.arrow.left');
  const nextBtn         = document.querySelector('.arrow.right');

  // Guard: exit if any required lightbox elements are missing
  if (!lightbox || !lightboxImg || !lightboxCaption || !closeBtn || !prevBtn || !nextBtn) {
    console.warn('Lightbox elements missing from DOM.');
    return;
  }

  const images = Array.from(imageNodeList);
  let currentIndex = 0;

  function showImage() {
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.alt = images[currentIndex].alt;
    lightboxCaption.textContent = images[currentIndex].dataset.caption || images[currentIndex].alt || '';
  }

  function openLightbox(index) {
    currentIndex = index;
    showImage();
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
  }

  // Open on image click
  images.forEach((img, index) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(index));
  });

  // Close on X button
  closeBtn.addEventListener('click', closeLightbox);

  // Close on backdrop click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Arrow buttons
  nextBtn.addEventListener('click', nextImage);
  prevBtn.addEventListener('click', prevImage);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display !== 'flex') return;
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft')  prevImage();
    if (e.key === 'Escape')     closeLightbox();
  });
}