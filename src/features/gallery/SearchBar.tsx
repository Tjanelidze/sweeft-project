import styled from 'styled-components';
import useGallery from './useGallery';
import { useEffect, useRef } from 'react';
import { useImageContext } from '../../context/ImageContext';

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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
  };

  const saveToLocalStorage = () => {
    if (searchQuery.trim() !== '') {
      let searchHistory: string[] = [];
      const storedSearchHistory = localStorage.getItem('searchHistory');
      if (storedSearchHistory !== null) {
        searchHistory = JSON.parse(storedSearchHistory);
      }

      searchHistory.push(searchQuery.trim());

      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Trigger search when Enter key is pressed
      const value = (event.target as HTMLInputElement).value;
      setSearchQuery(value);
      saveToLocalStorage();
    }
  };

  useEffect(() => {
    if (!isLoading && images) {
      const formattedImages =
        images &&
        images?.pages.map((items: any) =>
          items.results.map((image: any) => ({
            id: image.id,
            urls: image.urls.regular,
            alt_description: image.alt_description,
          }))
        );

      updateImages(formattedImages);
    }

    setIsLoading(isLoading);
  }, [isLoading, images]);

  useEffect(() => {
    inputRef.current?.addEventListener('blur', saveToLocalStorage);

    return () => {
      inputRef.current?.removeEventListener('blur', saveToLocalStorage);
    };
  }, [searchQuery]);

  return (
    <Input
      ref={inputRef}
      value={searchQuery}
      onChange={handleInputChange}
      onKeyDown={handleKeyPress}
      placeholder="search for free photos"
    />
  );
}
