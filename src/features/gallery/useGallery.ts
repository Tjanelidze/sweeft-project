import { useSearchParams } from 'react-router-dom';
import apiGallery from '../../services/apiGallery';

import { useInfiniteQuery } from '@tanstack/react-query';

export default function useGallery(searchQuery: string) {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || 'latest';

  const {
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isRefetching,
    refetch,
    data: images,
    status,
  } = useInfiniteQuery({
    queryKey: ['images', searchQuery, sortBy],
    queryFn: ({ pageParam }) => apiGallery({ searchQuery, pageParam, sortBy }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.results.length
        ? allPages.length + 1
        : undefined;
      return nextPage;
    },
  });

  return {
    isLoading,
    images,
    status,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isRefetching,
  };
}
