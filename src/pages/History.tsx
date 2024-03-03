import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import useGallery from '../features/gallery/useGallery';
import { useImageContext } from '../context/ImageContext';
import { ImageGallery } from '../ui/ImageGallery';
import Spinner from '../ui/Spinner';
import { UnsplashImage } from '../context/interfaces';

const StyledList = styled.ul`
  display: flex;
  gap: 5rem;

  & li {
    border: 1px solid #777;
    padding: 1rem 2rem;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5rem;

  & h2 {
    font-weight: 600;
    color: #222;
  }

  & button {
    background-color: #222;
    color: #fff;
    padding: 1rem;
    border: none;
    border-radius: 1.5rem;
  }
`;

function History() {
  const [searchParams, setSearchParams] = useSearchParams();
  const param = searchParams.get('searchQuery') || '';
  const [searchHistory, setSearchHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const { setSearchQuery, updateImages, setIsLoading, setTargetImage } =
    useImageContext();
  const { images, isLoading, isFetchingNextPage, fetchNextPage } =
    useGallery(param);

  useEffect(() => {
    const storedSearchHistory = localStorage.getItem('searchHistory');
    if (storedSearchHistory) {
      setSearchHistory(JSON.parse(storedSearchHistory));
    }

    return () => {
      searchParams.delete('history');
    };
  }, [searchParams]);

  useEffect(() => {
    if (!isLoading && images) {
      const formattedImages =
        images &&
        images?.pages.map((items) =>
          items.results.map((image: UnsplashImage) => ({
            id: image.id,
            urls: image.urls.regular,
            alt_description: image.alt_description,
          }))
        );

      updateImages(formattedImages);
    }

    setIsLoading(isLoading);
  }, [isLoading, images]);

  const handleClearHistory = () => {
    localStorage.removeItem('searchHistory');
    setSearchHistory([]);
  };

  const handleHistoryToggle = (item: string) => {
    searchParams.set('history', 'on');
    searchParams.set('searchQuery', item);
    setSearchParams(searchParams);
    setSearchQuery(item);
  };

  const handleImageClick = function (image: UnsplashImage) {
    setIsOpen(true);
    setTargetImage(image);
    searchParams.set('imageId', image.id);
    setSearchParams(searchParams);
  };

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

  {
    return searchParams.get('history') === 'on' ? (
      <ImageGallery
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isFetchingNextPage={isFetchingNextPage}
        lastImageElementRef={lastImageElementRef}
        handleImageClick={handleImageClick}
      >
        <div className="galleryHeader">
          <h2>History:</h2>
          <p>{param}</p>
        </div>

        {isFetchingNextPage ? <Spinner /> : null}
      </ImageGallery>
    ) : (
      <div>
        <StyledHeader>
          <h2>Search History</h2>
          <button onClick={handleClearHistory}>Clear History</button>
        </StyledHeader>
        <StyledList>
          {searchHistory.map((item, index) => (
            <li onClick={() => handleHistoryToggle(item)} key={index}>
              {item}
            </li>
          ))}
        </StyledList>
      </div>
    );
  }
}

export default History;
