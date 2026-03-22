const workCards = document.querySelectorAll(".work-card");
const overlay = document.getElementById("workOverlay");
const overlayBackdrop = document.getElementById("overlayBackdrop");
const overlayClose = document.getElementById("overlayClose");

const overlayCategory = document.getElementById("overlayCategory");
const overlayTitle = document.getElementById("overlayTitle");
const overlayDesc = document.getElementById("overlayDesc");
const overlayMainImage = document.getElementById("overlayMainImage");
const overlayMainImageWrap = document.querySelector(".overlay-main-image");
const overlayGallery = document.getElementById("overlayGallery");
const overlayTrailer = document.getElementById("overlayTrailer");
const overlayVideoWrap = document.querySelector(".overlay-video");
const overlayPanel = document.querySelector(".overlay-panel");

function openOverlay(card) {
  const title = card.dataset.title || "";
  const category = card.dataset.category || "";
  const desc = card.dataset.desc || "";
  const desktopCover = card.dataset.cover || "";
  const mobileCover = card.dataset.coverMobile || "";
  const cover =
    window.innerWidth <= 600 && mobileCover ? mobileCover : desktopCover;
  const gallery = JSON.parse(card.dataset.gallery || "[]");
  const trailer = card.dataset.trailer || "";

  overlayCategory.textContent = category;
  overlayTitle.textContent = title;
  overlayDesc.innerHTML = desc
    .replace(/\|\|\|/g, "<br><br>")
    .replace(/\|\|/g, "<br>");

  if (cover) {
    overlayMainImage.src = cover;
    overlayMainImage.alt = title;
    overlayMainImageWrap.style.display = "block";
  } else {
    overlayMainImage.src = "";
    overlayMainImage.alt = "";
    overlayMainImageWrap.style.display = "none";
  }

  overlayGallery.innerHTML = "";

  gallery.forEach((src, index) => {
    const item = document.createElement("div");
    item.className = "overlay-gallery-item";

    const img = document.createElement("img");
    img.src = src;
    img.alt = `${title} detail ${index + 1}`;

    item.appendChild(img);
    overlayGallery.appendChild(item);
  });

  if (gallery.length === 0) {
    overlayGallery.style.display = "none";
  } else {
    overlayGallery.style.display = "grid";
  }

  if (overlayTrailer && overlayVideoWrap) {
    if (trailer) {
      overlayTrailer.src = trailer;
      overlayVideoWrap.style.display = "block";
    } else {
      overlayTrailer.src = "";
      overlayVideoWrap.style.display = "none";
    }
  }

  if (card.classList.contains("cis-card")) {
    overlayPanel.classList.add("is-cis");
  } else {
    overlayPanel.classList.remove("is-cis");
  }

  overlay.classList.add("active");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  overlay.scrollTop = 0;
  overlayPanel.scrollTop = 0;
}

function closeOverlay() {
  overlay.classList.remove("active");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (overlayTrailer) {
    overlayTrailer.src = "";
  }

  if (overlayMainImage) {
    overlayMainImage.src = "";
    overlayMainImage.alt = "";
  }
}

workCards.forEach((card) => {
  card.addEventListener("click", () => openOverlay(card));
});

if (overlayClose) {
  overlayClose.addEventListener("click", closeOverlay);
}

if (overlayBackdrop) {
  overlayBackdrop.addEventListener("click", closeOverlay);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeOverlay();
  }
});

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
