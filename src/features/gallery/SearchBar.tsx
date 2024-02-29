import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import apiGallery from '../../services/apiGallery';
import Spinner from '../../ui/Spinner';
import { useLoading } from '../../context/LoadingContext';
import { useEffect } from 'react';

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
  const { setIsLoading } = useLoading();

  const {
    isLoading,
    data: images,
    error,
  } = useQuery({
    queryKey: ['images'],
    queryFn: apiGallery,
  });

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(false);
    }
  }, [isLoading, setIsLoading]);

  return <Input placeholder="search for free photos" />;
}
