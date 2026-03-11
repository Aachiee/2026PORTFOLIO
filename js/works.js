const workCards = document.querySelectorAll('.work-card');
const overlay = document.getElementById('workOverlay');
const overlayBackdrop = document.getElementById('overlayBackdrop');
const overlayClose = document.getElementById('overlayClose');

const overlayCategory = document.getElementById('overlayCategory');
const overlayTitle = document.getElementById('overlayTitle');
const overlayDesc = document.getElementById('overlayDesc');
const overlayMainImage = document.getElementById('overlayMainImage');
const overlayMainImageWrap = document.querySelector('.overlay-main-image');
const overlayGallery = document.getElementById('overlayGallery');
const overlayTrailer = document.getElementById('overlayTrailer');

function openOverlay(card) {
  const title = card.dataset.title || '';
  const category = card.dataset.category || '';
  const desc = card.dataset.desc || '';
  const cover = card.dataset.cover || '';
  const gallery = JSON.parse(card.dataset.gallery || '[]');
  const trailer = card.dataset.trailer || '';

  overlayCategory.textContent = category;
  overlayTitle.textContent = title;
  overlayDesc.textContent = desc;

  if (cover) {
    overlayMainImage.src = cover;
    overlayMainImage.alt = title;
    overlayMainImageWrap.style.display = 'block';
  } else {
    overlayMainImage.src = '';
    overlayMainImage.alt = '';
    overlayMainImageWrap.style.display = 'none';
  }

  overlayGallery.innerHTML = '';

  gallery.forEach((src, index) => {
    const item = document.createElement('div');
    item.className = 'overlay-gallery-item';

    const img = document.createElement('img');
    img.src = src;
    img.alt = `${title} detail ${index + 1}`;

    item.appendChild(img);
    overlayGallery.appendChild(item);
  });

  if (overlayTrailer) {
    if (trailer) {
      overlayTrailer.src = trailer;
      overlayTrailer.parentElement.style.display = 'block';
    } else {
      overlayTrailer.src = '';
      overlayTrailer.parentElement.style.display = 'none';
    }
  }

  overlay.classList.add('active');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeOverlay() {
  overlay.classList.remove('active');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (overlayTrailer) {
    overlayTrailer.src = '';
  }

  if (overlayMainImage) {
    overlayMainImage.src = '';
    overlayMainImage.alt = '';
  }
}

workCards.forEach((card) => {
  card.addEventListener('click', () => openOverlay(card));
});

overlayClose.addEventListener('click', closeOverlay);
overlayBackdrop.addEventListener('click', closeOverlay);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeOverlay();
  }
});
window.addEventListener("scroll", () => {
  document.querySelector(".site-header")
    .classList.toggle("scrolled", window.scrollY > 10);
});