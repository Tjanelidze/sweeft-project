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
  const { updateImages, setIsLoading } = useImageContext();
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoading, images, error } = useGallery(searchQuery);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
  };

  useEffect(() => {
    if (!isLoading && images) {
      const formattedImages =
        images.results &&
        images.results.map((image: UnsplashImage) => ({
          id: image.id,
          url: image.urls.regular,
          alt: image.alt_description,
        }));
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
