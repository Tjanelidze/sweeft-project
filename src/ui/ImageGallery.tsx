import React from 'react';
import styled from 'styled-components';

type ImageGalleryProps = {
  children: React.ReactNode;
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

export function ImageGallery({ children }: ImageGalleryProps) {
  return <Gallery>{children}</Gallery>;
}
