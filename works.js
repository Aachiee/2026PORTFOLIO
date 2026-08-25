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


// ========================================
// 作品集 Overlay
// ========================================

let currentGallery = [];
let currentImageIndex = 0;


// ========================================
// 建立圖片放大 Lightbox
// ========================================

// 建立圖片放大 Lightbox
const lightbox = document.createElement("div");
lightbox.className = "image-lightbox";
lightbox.innerHTML = `
  <div class="lightbox-backdrop"></div>
  <button class="lightbox-close" type="button" aria-label="Close">
    X
  </button>
  <button class="lightbox-prev" type="button" aria-label="Previous">
    &#10094;
  </button>
  <div class="lightbox-image-wrap">
    <img class="lightbox-image" src="" alt="">
  </div>
  <button class="lightbox-next" type="button" aria-label="Next">
    &#10095;
  </button>
  <div class="lightbox-counter"></div>
  
  <!-- 💡 新增：右下角縮放按鈕 -->
  <div class="lightbox-zoom-controls">
    <button id="zoomInBtn" type="button" title="放大">+</button>
    <button id="zoomOutBtn" type="button" title="縮小">-</button>
    <button id="zoomResetBtn" type="button" title="重設">⟲</button>
  </div>
`;
document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector(".lightbox-image");
const lightboxClose = lightbox.querySelector(".lightbox-close");
const lightboxPrev = lightbox.querySelector(".lightbox-prev");
const lightboxNext = lightbox.querySelector(".lightbox-next");
const lightboxBackdrop = lightbox.querySelector(".lightbox-backdrop");
const lightboxCounter = lightbox.querySelector(".lightbox-counter");


// ========================================
// Lightbox CSS
// ========================================

const lightboxStyle = document.createElement("style");

lightboxStyle.textContent = `
  .image-lightbox {
    position: fixed;
    inset: 0;
    z-index: 99999;
    display: none;
    align-items: center;
    justify-content: center;
  }

  .image-lightbox.active {
    display: flex;
  }

  .lightbox-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.92);
  }

  .lightbox-image-wrap {
    position: relative;
    z-index: 2;
    width: min(90vw, 1400px);
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lightbox-image {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    display: block;
    user-select: none;
    -webkit-user-drag: none;
  }

  .lightbox-close,
  .lightbox-prev,
  .lightbox-next {
    position: absolute;
    z-index: 3;
    border: none;
    background: transparent;
    color: white;
    cursor: pointer;
    font-family: Arial, sans-serif;
  }

  .lightbox-close {
    top: 20px;
    right: 30px;
    font-size: 42px;
    line-height: 1;
  }

  .lightbox-prev,
  .lightbox-next {
    top: 50%;
    transform: translateY(-50%);
    font-size: 64px;
    line-height: 1;
    padding: 20px;
  }

  .lightbox-prev {
    left: 20px;
  }

  .lightbox-next {
    right: 20px;
  }

  .lightbox-close:hover,
  .lightbox-prev:hover,
  .lightbox-next:hover {
    opacity: 0.7;
  }

  .lightbox-counter {
    position: absolute;
    z-index: 3;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    font-size: 14px;
    letter-spacing: 1px;
  }

  /* 讓作品中的圖片看起來可以點 */
  .overlay-main-image img,
  .overlay-gallery-item img {
    cursor: pointer;
  }

  @media (max-width: 600px) {
    .lightbox-image-wrap {
      width: 94vw;
      height: 85vh;
    }

    .lightbox-prev,
    .lightbox-next {
      font-size: 42px;
      padding: 10px;
    }

    .lightbox-prev {
      left: 5px;
    }

    .lightbox-next {
      right: 5px;
    }

    .lightbox-close {
      top: 15px;
      right: 18px;
      font-size: 36px;
    }
  }
`;

document.head.appendChild(lightboxStyle);


// ========================================
// 開啟 Lightbox
// ========================================

function openLightbox(images, index = 0, title = "") {

  if (!images || images.length === 0) return;

  currentGallery = images;
  currentImageIndex = index;

  updateLightboxImage(title);

  lightbox.classList.add("active");

  document.body.style.overflow = "hidden";
}


// ========================================
// 更新 Lightbox 圖片
// ========================================

function updateLightboxImage(title = "") {

  if (!currentGallery.length) return;

  const src = currentGallery[currentImageIndex];

  lightboxImage.src = src;
  lightboxImage.alt = title;

  lightboxCounter.textContent =
    `${currentImageIndex + 1} / ${currentGallery.length}`;

  // 只有一張圖時，不顯示左右按鈕
  if (currentGallery.length <= 1) {
    lightboxPrev.style.display = "none";
    lightboxNext.style.display = "none";
    lightboxCounter.style.display = "none";
  } else {
    lightboxPrev.style.display = "block";
    lightboxNext.style.display = "block";
    lightboxCounter.style.display = "block";
  }
}


// ========================================
// 下一張
// ========================================

function nextLightboxImage() {

  if (currentGallery.length <= 1) return;

  currentImageIndex++;

  if (currentImageIndex >= currentGallery.length) {
    currentImageIndex = 0;
  }

  updateLightboxImage();
}


// ========================================
// 上一張
// ========================================

function prevLightboxImage() {

  if (currentGallery.length <= 1) return;

  currentImageIndex--;

  if (currentImageIndex < 0) {
    currentImageIndex = currentGallery.length - 1;
  }

  updateLightboxImage();
}


// ========================================
// 關閉 Lightbox
// ========================================

function closeLightbox() {

  lightbox.classList.remove("active");

  lightboxImage.src = "";

  currentGallery = [];
  currentImageIndex = 0;

  // 如果作品 Overlay 沒有開啟，才恢復頁面滾動
  if (!overlay.classList.contains("active")) {
    document.body.style.overflow = "";
  }
}


// ========================================
// Lightbox 按鈕
// ========================================

lightboxNext.addEventListener("click", (e) => {
  e.stopPropagation();
  nextLightboxImage();
});

lightboxPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  prevLightboxImage();
});

lightboxClose.addEventListener("click", (e) => {
  e.stopPropagation();
  closeLightbox();
});

lightboxBackdrop.addEventListener("click", closeLightbox);


// ========================================
// 鍵盤操作
// ========================================

document.addEventListener("keydown", (e) => {

  // Lightbox 開啟時
  if (lightbox.classList.contains("active")) {

    if (e.key === "Escape") {
      closeLightbox();
    }

    if (e.key === "ArrowRight") {
      nextLightboxImage();
    }

    if (e.key === "ArrowLeft") {
      prevLightboxImage();
    }

    return;
  }

  // 一般作品 Overlay
  if (e.key === "Escape") {
    closeOverlay();
  }
});


// ========================================
// 開啟作品 Overlay
// ========================================

function openOverlay(card) {

  const title = card.dataset.title || "";
  const category = card.dataset.category || "";
  const desc = card.dataset.desc || "";

  const desktopCover = card.dataset.cover || "";
  const mobileCover = card.dataset.coverMobile || "";

  const cover =
    window.innerWidth <= 600 && mobileCover
      ? mobileCover
      : desktopCover;

  let gallery = [];

  try {
    gallery = JSON.parse(card.dataset.gallery || "[]");
  } catch (error) {
    console.error("Gallery JSON 格式錯誤：", error);
    gallery = [];
  }

  const trailer = card.dataset.trailer || "";


  // ----------------------------------------
  // 文字
  // ----------------------------------------

  overlayCategory.textContent = category;
  overlayTitle.textContent = title;

  overlayDesc.innerHTML = desc
    .replace(/\|\|\|/g, "<br><br>")
    .replace(/\|\|/g, "<br>");


  // ----------------------------------------
  // 封面
  // ----------------------------------------

  if (cover) {

    overlayMainImage.src = cover;
    overlayMainImage.alt = title;

    overlayMainImageWrap.style.display = "block";

  } else {

    overlayMainImage.src = "";
    overlayMainImage.alt = "";

    overlayMainImageWrap.style.display = "none";
  }


  // ----------------------------------------
  // 建立完整圖片陣列
  //
  // 第一張 = Cover
  // 後面 = Gallery
  // ----------------------------------------

  const allImages = [];

  if (cover) {
    allImages.push(cover);
  }

  gallery.forEach((src) => {
    if (src) {
      allImages.push(src);
    }
  });


  // ----------------------------------------
  // 點擊主圖 → 放大
  // ----------------------------------------

  overlayMainImage.onclick = () => {

    const index = 0;

    openLightbox(
      allImages,
      index,
      title
    );
  };


  // ----------------------------------------
  // Gallery
  // ----------------------------------------

  overlayGallery.innerHTML = "";

  gallery.forEach((src, index) => {

    const item = document.createElement("div");

    item.className = "overlay-gallery-item";

    const img = document.createElement("img");

    img.src = src;
    img.alt = `${title} detail ${index + 1}`;

    item.appendChild(img);

    overlayGallery.appendChild(item);


    // Gallery 圖片點擊放大
    item.addEventListener("click", () => {

      // 因為 allImages 第一張是 cover
      const imageIndex = cover
        ? index + 1
        : index;

      openLightbox(
        allImages,
        imageIndex,
        title
      );
    });

  });


  // ----------------------------------------
  // Gallery 顯示 / 隱藏
  // ----------------------------------------

  if (gallery.length === 0) {

    overlayGallery.style.display = "none";

  } else {

    overlayGallery.style.display = "grid";
  }


  // ----------------------------------------
  // Trailer
  // ----------------------------------------

  if (overlayTrailer && overlayVideoWrap) {

    if (trailer) {

      overlayTrailer.src = trailer;
      overlayVideoWrap.style.display = "block";

    } else {

      overlayTrailer.src = "";
      overlayVideoWrap.style.display = "none";
    }
  }


  // ----------------------------------------
  // CIS
  // ----------------------------------------

  if (card.classList.contains("cis-card")) {

    overlayPanel.classList.add("is-cis");

  } else {

    overlayPanel.classList.remove("is-cis");
  }


  // ----------------------------------------
  // 開啟 Overlay
  // ----------------------------------------

  overlay.classList.add("active");

  overlay.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  overlay.scrollTop = 0;

  overlayPanel.scrollTop = 0;
}


// ========================================
// 關閉作品 Overlay
// ========================================

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


// ========================================
// 點擊作品
// ========================================

workCards.forEach((card) => {

  card.addEventListener("click", () => {

    openOverlay(card);

  });

});


// ========================================
// 關閉按鈕
// ========================================

if (overlayClose) {

  overlayClose.addEventListener(
    "click",
    closeOverlay
  );
}


// ========================================
// 點擊背景關閉
// ========================================

if (overlayBackdrop) {

  overlayBackdrop.addEventListener(
    "click",
    closeOverlay
  );
}


// ========================================
// 防止右鍵
// ========================================

document.addEventListener("contextmenu", (e) => {

  e.preventDefault();

});

// === 確保縮放與拖曳精準綁定到 lightboxImage ===
let currentZoom = 1;
let panX = 0;
let panY = 0;
let isDragging = false;
let startX = 0;
let startY = 0;

const zoomInBtn = document.getElementById("zoomInBtn");
const zoomOutBtn = document.getElementById("zoomOutBtn");
const zoomResetBtn = document.getElementById("zoomResetBtn");

function updateImageTransform() {
  if (typeof lightboxImage !== 'undefined' && lightboxImage) {
    lightboxImage.style.transform = `translate(${panX}px, ${panY}px) scale(${currentZoom})`;
  }
}

function resetZoom() {
  currentZoom = 1;
  panX = 0;
  panY = 0;
  updateImageTransform();
}

// 每次換圖時自動重設
const originalUpdateLightboxImage = window.updateLightboxImage || updateLightboxImage;
window.updateLightboxImage = function (title = "") {
  if (typeof originalUpdateLightboxImage === 'function') {
    originalUpdateLightboxImage(title);
  }
  resetZoom();
};

if (zoomInBtn) {
  zoomInBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentZoom = Math.min(currentZoom + 0.25, 4);
    updateImageTransform();
  });
}

if (zoomOutBtn) {
  zoomOutBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    currentZoom = Math.max(currentZoom - 0.25, 0.5);
    if (currentZoom === 1) { panX = 0; panY = 0; }
    updateImageTransform();
  });
}

if (zoomResetBtn) {
  zoomResetBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    resetZoom();
  });
}

// 確保滾輪與拖曳對 lightboxImage 生效
if (typeof lightboxImage !== 'undefined' && lightboxImage) {
  lightboxImage.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      currentZoom = Math.min(currentZoom + 0.15, 4);
    } else {
      currentZoom = Math.max(currentZoom - 0.15, 0.5);
      if (currentZoom === 1) { panX = 0; panY = 0; }
    }
    updateImageTransform();
  }, { passive: false });

  lightboxImage.addEventListener("mousedown", (e) => {
    if (currentZoom > 1) {
      isDragging = true;
      startX = e.clientX - panX;
      startY = e.clientY - panY;
      e.preventDefault();
    }
  });
}

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  panX = e.clientX - startX;
  panY = e.clientY - startY;
  updateImageTransform();
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});