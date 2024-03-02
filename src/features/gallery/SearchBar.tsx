import styled from 'styled-components';
import useGallery from './useGallery';
import { useEffect, useState } from 'react';
import { useImageContext } from '../../context/ImageContext';
import { UnsplashImage } from '../../context/interfaces';

const Input = styled.input`
  border: 1px solid #777;
  border-radius: 6px;
  padding: 0.8rem 1.2rem;
  width: 28%;

  &:focus {
    outline-color: #929292;
  }
`;

export default function SearchBar() {
  const { updateImages, setIsLoading, searchQuery, setSearchQuery } =
    useImageContext();
  const { isLoading, images } = useGallery(searchQuery);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
  };

  useEffect(() => {
    if (!isLoading && images) {
      console.log(images);
      const formattedImages = images?.pages[0].results.map(
        (image: UnsplashImage) => ({
          id: image.id,
          urls: image.urls.regular,
          alt_description: image.alt_description,
        })
      );
      formattedImages.total = images.pages[0].total;
      updateImages(formattedImages);
    }
    setIsLoading(isLoading);
  }, [isLoading, images]);

  return (
    <Input
      value={searchQuery}
      onChange={handleInputChange}
      placeholder="search for free photos"
    />
  );
}
