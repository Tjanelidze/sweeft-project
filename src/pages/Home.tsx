// import { useLoading } from '../context/GalleryContext';
// import useGallery from '../features/gallery/useGallery';
import { useImageContext } from '../context/ImageContext';
import ImageGallery from '../ui/ImageGallery';
import Spinner from '../ui/Spinner';

export default function Home() {
  const { isLoading } = useImageContext();

  if (isLoading) return <Spinner />;

  return <ImageGallery />;
}
