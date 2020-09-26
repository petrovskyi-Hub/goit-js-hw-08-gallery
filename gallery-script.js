import galleryItems from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightBox: document.querySelector(".js-lightbox"),
  lightBoxOverlay: document.querySelector(".js-lightbox .lightbox__overlay"),
  lightBoxImage: document.querySelector(".js-lightbox img"),
  closeLightBoxBtn: document.querySelector(
    'button[data-action="close-lightbox"]'
  ),
};
let carrentCard = {};
let currentImage = {};
let nextImage = {};
let previousImage = {};
let nextCard = {};
let previousCard = {};

createGallery(galleryItems);

refs.gallery.addEventListener("click", onGalleryContainerClick);

function createGallery(items) {
  items.forEach((item) =>
    refs.gallery.insertAdjacentHTML(
      "beforeend",
      `<li class="gallery__item">
    <a
        class="gallery__link"
        href=${item.original}
    >
        <img
            class="gallery__image"
            src='${item.preview}'
            data-source='${item.original}'
            alt='${item.description}'
        />
    </a>
</*li`
    )
  );
}

function onGalleryContainerClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  refs.lightBoxImage.src = event.target.dataset.source;
  refs.lightBoxImage.alt = event.target.alt;
  openLightBox(event);
}

function openLightBox(event) {
  refs.lightBox.classList.add("is-open");
  refs.closeLightBoxBtn.addEventListener("click", CloseLightBox);
  refs.lightBoxOverlay.addEventListener("click", onBackdropClick);
  window.addEventListener("keydown", onEscKeyPress);
  window.addEventListener("keydown", onKeyLeftPress);
  window.addEventListener("keydown", onKeyRightPress);
  currentImage = event.target;
}

function CloseLightBox(event) {
  refs.lightBox.classList.remove("is-open");
  refs.closeLightBoxBtn.removeEventListener("click", CloseLightBox);
  refs.lightBoxOverlay.removeEventListener("click", onBackdropClick);
  window.removeEventListener("keydown", onEscKeyPress);
  window.removeEventListener("keydown", onKeyLeftPress);
  window.removeEventListener("keydown", onKeyRightPress);

  refs.lightBoxImage.src = "";
  refs.lightBoxImage.alt = "";
}

function onBackdropClick(event) {
  if (event.target === refs.lightBoxOverlay) {
    CloseLightBox();
  }
}

function onEscKeyPress(event) {
  if (event.code === "Escape") {
    CloseLightBox();
  }
}

function onKeyLeftPress(event) {
  if (event.code !== "ArrowLeft") {
    return;
  }

  carrentCard = currentImage.closest(".gallery__item");
  previousCard = card.previousElementSibling;

  if (previousCard === null) {
    return;
  }

  previousImage = previousCard.querySelector("img");
  refs.lightBoxImage.src = previousImage.dataset.source;
  refs.lightBoxImage.alt = previousImage.alt;
  currentImage = previousImage;
}

function onKeyRightPress(event) {
  if (event.code !== "ArrowRight") {
    return;
  }

  carrentCard = currentImage.closest(".gallery__item");
  nextCard = carrentCard.nextElementSibling;

  if (nextCard === null) {
    return;
  }

  nextImage = nextCard.querySelector("img");
  refs.lightBoxImage.src = nextImage.dataset.source;
  refs.lightBoxImage.alt = nextImage.alt;
  currentImage = nextImage;
}
