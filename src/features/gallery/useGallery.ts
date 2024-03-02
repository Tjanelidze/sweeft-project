import { useQuery } from '@tanstack/react-query';

import apiGallery from '../../services/apiGallery';
import { useImageContext } from '../../context/ImageContext';
import { useInfiniteQuery } from '@tanstack/react-query';

export default function useGallery(searchQuery: string) {
  const {
    isLoading,
    data: images,
    status,
    refetch,
    error,
  } = useInfiniteQuery({
    queryKey: ['images', searchQuery],
    queryFn: ({ pageParam }) => apiGallery({ searchQuery, pageParam }),
    initialPageParam: 2,
    getNextPageParam: (lastPage) => {
      return lastPage;
    },
  });

  return { isLoading, images, status, refetch, error };
}
