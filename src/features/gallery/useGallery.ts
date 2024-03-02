import apiGallery from '../../services/apiGallery';

import { useInfiniteQuery } from '@tanstack/react-query';

export default function useGallery(searchQuery: string) {
  const {
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    data: images,
    status,
    refetch,
    error,
  } = useInfiniteQuery({
    queryKey: ['images', searchQuery],
    queryFn: ({ pageParam }) => apiGallery({ searchQuery, pageParam }),
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
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
}
