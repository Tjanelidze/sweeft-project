const apiKey = import.meta.env.VITE_ACCESS_KEY;
interface Props {
  searchQuery: string;
  pageParam?: number;
}

export default async function apiGallery({ searchQuery, pageParam }: Props) {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?page=${pageParam}&query=${searchQuery}&per_page=20`,
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
  } catch (error) {
    console.error(error);
    throw new Error('Images could not be loaded');
  }
}
