// import { useLoading } from '../context/GalleryContext';
// import useGallery from '../features/gallery/useGallery';
import { useImageContext } from '../context/ImageContext';
import { ImageGallery } from '../ui/ImageGallery';
import Spinner from '../ui/Spinner';

export default function Home() {
  const { isLoading, searchedImages } = useImageContext();

  if (isLoading) return <Spinner />;

  return (
    <ImageGallery>
      {searchedImages.map((image) => {
        return (
          <figure key={image.id} className="images">
            <img src={`${image.url}`} alt={`${image.alt}`} />
          </figure>
        );
      })}
    </ImageGallery>
  );
}
