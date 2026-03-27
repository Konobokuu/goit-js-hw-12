import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a');

export function createGallery(images) {
  const markup = images
    .map(
      image => `
      <li class="gallery-item">
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" />
        </a>
        <div class="info">
          <p><b>Likes</b> ${image.likes}</p>
          <p><b>Views</b> ${image.views}</p>
          <p><b>Comments</b> ${image.comments}</p>
          <p><b>Downloads</b> ${image.downloads}</p>
        </div>
      </li>
    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}
export function showLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more');
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  const loadMoreBtn = document.querySelector('.load-more');
  loadMoreBtn.classList.add('hidden');
}