const apiKey = import.meta.env.VITE_ACCESS_KEY;

export default async function apiGallery(searchQuery: string) {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${searchQuery}`,
    {
      headers: {
        Authorization: `Client-ID ${apiKey}`,
      },
    }
  );
  const data = await res.json();

  if (!data) {
    console.error(data);
    throw new Error('Images could not be loaded');
  }

  return data;
}
