const BASE = 'https://dummyjson.com/products';

export const PAGE_SIZE = 9;
export const SORT_FIELDS = ['title', 'price', 'rating'];

async function request(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Response(res.status === 404 ? 'Товар не найден' : 'Ошибка загрузки', {
      status: res.status,
      statusText: res.statusText,
    });
  }
  return res.json();
}

export function fetchProducts({ q = '', sortBy = '', order = 'asc', page = 1, signal }) {
  const params = new URLSearchParams({
    limit: String(PAGE_SIZE),
    skip: String((page - 1) * PAGE_SIZE),
  });
  if (SORT_FIELDS.includes(sortBy)) {
    params.set('sortBy', sortBy);
    params.set('order', order === 'desc' ? 'desc' : 'asc');
  }
  let url;
  if (q) {
    params.set('q', q);
    url = `${BASE}/search?${params}`;
  } else {
    url = `${BASE}?${params}`;
  }
  return request(url, signal);
}

export function fetchProduct(id, signal) {
  return request(`${BASE}/${id}`, signal);
}
