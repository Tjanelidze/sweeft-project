import { useLoading } from '../context/LoadingContext';
import useGallery from '../features/gallery/useGallery';
import ImageGallery from '../ui/ImageGallery';
import Spinner from '../ui/Spinner';

export default function Home() {
  const { isLoading } = useGallery();

  if (isLoading) return <Spinner />;

  return <ImageGallery />;
}
