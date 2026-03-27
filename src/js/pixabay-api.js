import axios from 'axios';

const API_KEY = '55202338-7fca1a1810bad0a3b47ced76b'; // Переконайтеся, що ключ вірний

export async function getImagesByQuery(query, page = 1) {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    },
  });

  return response.data;
}