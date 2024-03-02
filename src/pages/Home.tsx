// import { useLoading } from '../context/GalleryContext';
import useGallery from '../features/gallery/useGallery';
import { useImageContext } from '../context/ImageContext';
import { ImageGallery } from '../ui/ImageGallery';
import Spinner from '../ui/Spinner';
import { ReactNode, useCallback, useRef, useState } from 'react';

export default function Home() {
  const { isLoading, searchedImages, searchQuery } = useImageContext();
  const { refetch } = useGallery(searchQuery);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastImageElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading || !node) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].target === node &&
          entries[0].isIntersecting &&
          entries[0].intersectionRatio < 1 &&
          hasMore
        ) {
          console.log('visible');
          setPageNumber((prevPageNum) => prevPageNum + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  if (isLoading) return <Spinner />;

  return (
    <ImageGallery>
      {searchedImages.map((image, index) => {
        if (searchedImages.length === index + 1) {
          return (
            <figure ref={lastImageElementRef} key={image.id} className="images">
              <img src={`${image.urls}`} alt={`${image.alt_description}`} />
            </figure>
          );
        } else {
          return (
            <figure key={image.id} className="images">
              <img src={`${image.urls}`} alt={`${image.alt_description}`} />
            </figure>
          );
        }
      })}
    </ImageGallery>
  );
}
