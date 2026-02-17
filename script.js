document.addEventListener("DOMContentLoaded", function () {

  /* Smooth scroll (only for anchor links) */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ===== GALLERY LIGHTBOX ===== */

  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.querySelector('.arrow.left');
  const nextBtn = document.querySelector('.arrow.right');

  if (!galleryItems.length) return;

  let currentIndex = 0;
  const images = Array.from(galleryItems);

  function showImage() {
    lightboxImg.src = images[currentIndex].src;
    lightboxCaption.textContent = images[currentIndex].alt;
  }

  galleryItems.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index;
      showImage();
      lightbox.style.display = 'flex';
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % images.length;
        showImage();
      }
      if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage();
      }
      if (e.key === 'Escape') {
        lightbox.style.display = 'none';
      }
    }
  });

});
