import { useLoading } from '../context/LoadingContext';
import ImageGallery from '../ui/ImageGallery';
import Spinner from '../ui/Spinner';

export default function Home() {
  const { isLoading } = useLoading();

  if (isLoading) return <Spinner />;

  return <ImageGallery />;
}
