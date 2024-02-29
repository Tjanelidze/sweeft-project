export default async function apiGallery() {
  const res = await fetch('https://api.unsplash.com/photos?page=1', {
    headers: {
      Authorization: 'Client-ID NrlOnvgA97lWUqc5avohXe8wZ6IO2_B8SDfRp8Jb5eg',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const data = await res.json();

  if (!data) {
    console.error(data);
    throw new Error('Images could not be loaded');
  }

  return data;
}
