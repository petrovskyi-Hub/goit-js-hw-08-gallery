import galleryItems from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  lightBox: document.querySelector(".js-lightbox"),
  lightBoxImage: document.querySelector(".js-lightbox img"),
  closeLightBoxBtn: document.querySelector(
    'button[data-action="close-lightbox"]'
  ),
};

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

function onGalleryContainerClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== "IMG") {
    return;
  }

  refs.lightBoxImage.src = evt.target.dataset.source;
  refs.lightBoxImage.alt = evt.target.alt;
  openLightBox();
}

function openLightBox() {
  refs.lightBox.classList.add("is-open");
  refs.closeLightBoxBtn.addEventListener("click", onCloseBtnClick);
}

function onCloseBtnClick(evt) {
  refs.lightBox.classList.remove("is-open");
  refs.closeLightBoxBtn.removeEventListener("click", onCloseBtnClick);

  refs.lightBoxImage.src = "";
  refs.lightBoxImage.alt = "";
}
