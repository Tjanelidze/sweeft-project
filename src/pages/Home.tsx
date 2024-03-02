// import { useLoading } from '../context/GalleryContext';
import useGallery from '../features/gallery/useGallery';
import { useImageContext } from '../context/ImageContext';
import { ImageGallery } from '../ui/ImageGallery';
import Spinner from '../ui/Spinner';
import { useCallback, useRef, useState } from 'react';

export default function Home() {
  const { isLoading, searchedImages, searchQuery, setPage } = useImageContext();
  const { refetch } = useGallery(searchQuery);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const THRESHOLD = 0.9; // Adjust this threshold as needed
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

          // Check if the bottom of the target element is within a threshold distance from the bottom of the viewport
          // const isAtBottom = distanceToBottom < 100; // Adjust this threshold as needed

          if (target === node && isIntersecting && isAtBottom && !isLoading) {
            console.log('last el');
          }
        },
        { threshold: THRESHOLD, rootMargin: ROOT_MARGIN }
      );

      if (node || observer.current) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  if (isLoading) return <Spinner />;

  return (
    <ImageGallery>
      {searchedImages.map((image, index) => {
        if (searchedImages.length === index + 1) {
          return (
            <figure
              ref={lastImageElementRef}
              key={image.id}
              className="images lastImage"
            >
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
