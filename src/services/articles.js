const baseUrl = 'https://hacker-news.firebaseio.com/v0/';

export async function getStories(type) {
  const cacheKey = `hacker-news-app-cache-${type}-stories`;
  const cacheDuration = 60000;
  const endpoint = `${baseUrl}/${type}stories.json`;

  return fetchWithCache({ endpoint, cacheKey, cacheDuration });
}

export async function getStory(id) {
  const cacheKey = `hacker-news-app-cache-story-${id}`;
  const cacheDuration = 300000;
  const endpoint = `${baseUrl}/item/${id}.json`;

  return fetchWithCache({ endpoint, cacheKey, cacheDuration });
}

export function cleanUpExpiredCache() {
  for (const record in localStorage) {
    if (record.includes('hacker-news-app')) {
      const cacheddData = localStorage.getItem(record);

      if (cacheddData) {

        const { validUntil } = JSON.parse(cacheddData);

        if (Date.now() > validUntil) {
          localStorage.removeItem(record);
        }
      }
    }
  }
}

async function fetchWithCache({ endpoint, cacheKey, cacheDuration }) {

  const cachedData = getCache(cacheKey);

  if (cachedData) {
    return cachedData.data;
  }

  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(response.status);
  }

  const data = await response.json();

  const validUntil = Date.now() + cacheDuration;
  localStorage.setItem(cacheKey, JSON.stringify({ data, validUntil }));

  return data;
}

function getCache(cacheKey) {

  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    const { data, validUntil } = JSON.parse(cachedData);

    if (Date.now() < validUntil) {
      return { data };
    }
  }

  return null;
}

export function refreshCache() {
  for (const record in localStorage) {
    if (record.includes('hacker-news-app-cache')) {
      localStorage.removeItem(record);
    }
  }
}
