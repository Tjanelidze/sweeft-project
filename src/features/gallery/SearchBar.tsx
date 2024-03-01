import styled from 'styled-components';
import useGallery from './useGallery';
import { useEffect, useState } from 'react';

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
  const [searchQuery, setSearchQuery] = useState('');
  useGallery(searchQuery);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
  };

  return (
    <Input
      value={searchQuery}
      onChange={handleInputChange}
      placeholder="search for free photos"
    />
  );
}
