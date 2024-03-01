import { useQuery } from '@tanstack/react-query';

import apiGallery from '../../services/apiGallery';

export default function useGallery(searchQuery: string) {
  const {
    isLoading,
    data: images,
    error,
  } = useQuery({
    queryKey: ['images', searchQuery],
    queryFn: () => apiGallery(searchQuery),
  });

  return { isLoading, images, error };
}
