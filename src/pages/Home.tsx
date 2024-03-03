// import { useLoading } from '../context/GalleryContext';
import useGallery from '../features/gallery/useGallery';
import { useImageContext } from '../context/ImageContext';
import { ImageGallery } from '../ui/ImageGallery';
import Spinner from '../ui/Spinner';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Modal from '../features/modal/Modal';
import { UnsplashImage } from '../context/interfaces';

export default function Home() {
  const {
    isLoading,
    searchedImages,
    searchQuery,
    targetImage,
    setTargetImage,
  } = useImageContext();
  const { fetchNextPage, isFetchingNextPage, isRefetching } =
    useGallery(searchQuery);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSortBy = searchParams.get('sortBy') || 'latest';
  const [isOpen, setIsOpen] = useState(false);

  const [sortBy, setSortBy] = useState(initialSortBy);

  const THRESHOLD = 0.9;
  const ROOT_MARGIN = '10%';

  const observer = useRef<IntersectionObserver | null>(null);
  const lastImageElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading || !node) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          const target = entries[0].target;
          const isIntersecting = entries[0].isIntersecting;

          // Calculate the distance of the bottom of the target element from the bottom of the viewport
          const targetRect = target.getBoundingClientRect();
          const distanceToBottom = window.innerHeight - targetRect.bottom;

          // Calculate the height of the target element
          const targetHeight = targetRect.height;

          // Calculate the visible portion of the target element (as a ratio)
          const visibleRatio = Math.max(
            0,
            Math.min(1, (targetHeight - distanceToBottom) / targetHeight)
          );

          // Check if the visible portion exceeds the threshold
          const isAtBottom = visibleRatio >= THRESHOLD;

          if (target === node && isIntersecting && isAtBottom && !isLoading) {
            fetchNextPage();
          }
        },
        { threshold: THRESHOLD, rootMargin: ROOT_MARGIN }
      );

      if (node || observer.current) observer.current.observe(node);
    },
    [isLoading]
  );

  const handleOptions = function (e: React.ChangeEvent<HTMLSelectElement>) {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    searchParams.set('sortBy', newSortBy);
    setSearchParams(searchParams);
  };

  const handleImageClick = function (image: UnsplashImage) {
    setIsOpen(true);
    setTargetImage(image);
    searchParams.set('imageId', image.id);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    searchParams.delete('imageId');
    searchParams.delete('sortBy');
    setSearchParams(searchParams);
  }, []);

  if (isLoading || isRefetching) return <Spinner />;

  return (
    <ImageGallery>
      <div className="galleryHeader">
        <h2>Free Stock Photos</h2>
        <select
          disabled={isLoading || isRefetching}
          name="images"
          id="images"
          onChange={handleOptions}
          value={sortBy}
        >
          <option value="latest">latest</option>
          <option value="relevant">Popular</option>
        </select>
      </div>

      <div className="gallery">
        {searchedImages?.map((images: any) =>
          images.map((image: UnsplashImage, index: number) => {
            if (images.length === index + 1) {
              return (
                <figure
                  ref={lastImageElementRef}
                  key={image.id}
                  className="images lastImage"
                  onClick={() => handleImageClick(image)}
                >
                  <img src={`${image.urls}`} alt={`${image.alt_description}`} />
                </figure>
              );
            } else {
              return (
                <figure
                  key={image.id}
                  className="images"
                  onClick={() => handleImageClick(image)}
                >
                  <img src={`${image.urls}`} alt={`${image.alt_description}`} />
                </figure>
              );
            }
          })
        )}
      </div>
      {isOpen && (
        <Modal open={isOpen} setIsOpen={setIsOpen}>
          {targetImage && (
            <>
              <img
                src={`${targetImage.urls}`}
                alt={`${targetImage.alt_description}`}
              />
            </>
          )}
        </Modal>
      )}

      {isFetchingNextPage ? <Spinner /> : null}
    </ImageGallery>
  );
}
