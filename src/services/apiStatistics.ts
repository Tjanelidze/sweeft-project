const apiKey = import.meta.env.VITE_ACCESS_KEY;

export default async function apiStatistics({ imageId }: { imageId: string }) {
  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/${imageId}/statistics`,
      {
        headers: {
          Authorization: `Client-ID ${apiKey}`,
        },
      }
    );
    const data = await res.json();

    if (!data) {
      console.error(data);
      throw new Error('Statistics could not be loaded');
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Statistics could not be loaded');
  }
}
