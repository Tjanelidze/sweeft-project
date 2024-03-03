// import { useLoading } from '../context/GalleryContext';
import useGallery from '../features/gallery/useGallery';
import { useImageContext } from '../context/ImageContext';
import { ImageGallery } from '../ui/ImageGallery';
import Spinner from '../ui/Spinner';
import { useCallback, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Home() {
  const { isLoading, searchedImages, searchQuery } = useImageContext();
  const { fetchNextPage, isFetchingNextPage, refetch, isRefetching } =
    useGallery(searchQuery);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSortBy = searchParams.get('sortBy') || 'latest';

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
          images.map((image: any, index: any) => {
            if (images.length === index + 1) {
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
          })
        )}
      </div>

      {isFetchingNextPage ? <Spinner /> : null}
    </ImageGallery>
  );
}
