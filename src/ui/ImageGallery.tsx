import React from 'react';
import styled from 'styled-components';

type ImageGalleryProps = {
  children: React.ReactNode;
};

const Gallery = styled.div`
  -webkit-column-count: 3;
  -moz-column-count: 3;
  column-count: 3;
  -webkit-column-width: 33%;
  -moz-column-width: 33%;
  column-width: 33%;
  column-gap: 1rem; /* Column Gap */

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
