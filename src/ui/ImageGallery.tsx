import React from 'react';
import styled from 'styled-components';
import { useImageContext } from '../context/ImageContext';
import { UnsplashImage } from '../context/interfaces';
import Modal from '../features/modal/Modal';

type ImageGalleryProps = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isFetchingNextPage: boolean;
  lastImageElementRef: (node: HTMLElement | null) => void;
  handleImageClick: (image: UnsplashImage) => void;
};

const Gallery = styled.div`
  .gallery {
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-count: 3;
    -webkit-column-width: 33%;
    -moz-column-width: 33%;
    column-width: 33%;
  }

  .galleryHeader {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5rem;

    & h2 {
      font-weight: 600;
      color: #222;
    }

    & select {
      padding: 1rem 1.5rem;

      border-color: #cccccc;
      background-color: #fff;
      border-radius: 4px;
    }
  }

  .images {
    padding: 0.5rem;
    cursor: zoom-in;
    overflow: hidden;
  }

  .images img {
    transition: all 0.4s;
  }

  .images img:hover {
    transform: scale(1.1);
  }
`;

export function ImageGallery({
  children,
  isOpen,
  setIsOpen,
  lastImageElementRef,
  handleImageClick,
}: ImageGalleryProps) {
  const { searchedImages, targetImage } = useImageContext();

  return (
    <Gallery>
      {children}
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
    </Gallery>
  );
}
