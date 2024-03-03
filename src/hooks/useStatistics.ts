import { useSearchParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import apiStatistics from '../services/apiStatistics';

export default function useStatistics() {
  const [searchParams] = useSearchParams();
  const imageId = searchParams.get('imageId') || '';

  const { isLoading, data, error } = useQuery({
    queryKey: ['images', imageId],
    queryFn: () => apiStatistics({ imageId }),
  });

  return { isLoading, data, error };
}
