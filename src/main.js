import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;
const perPage = 15;

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = event.target.elements['search-text'].value.trim();
  if (!query) return;

  page = 1;
  clearGallery();
  hideLoadMoreButton(); // Ховаємо кнопку при новому пошуку
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    totalHits = data.totalHits;
    createGallery(data.hits);

    // ПЕРЕВІРКА: Показуємо кнопку лише якщо є ще результати
    if (totalHits > perPage) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch {
    iziToast.error({ message: 'Something went wrong!' });
  } finally {
    hideLoader();
    form.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton(); // ПУНКТ 2 ФІДБЕКУ: Ховаємо кнопку під час завантаження
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    // Перевірка, чи це остання сторінка
    const totalPages = Math.ceil(totalHits / perPage);
    
    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton(); // Знову показуємо, якщо дані ще є
    }

    // Плавна прокрутка
    const card = document.querySelector('.gallery-item');
    if (card) {
      const { height } = card.getBoundingClientRect();
      window.scrollBy({ top: height * 2, behavior: 'smooth' });
    }
  } catch {
    iziToast.error({ message: 'Something went wrong!' });
  } finally {
    hideLoader();
  }
});