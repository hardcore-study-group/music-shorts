import {useCallback, useState} from 'react';

const useRefreshing = (refetch: () => Promise<any>) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    if (refreshing) {
      return;
    }
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch, refreshing]);

  return {
    refreshing,
    onRefresh,
  };
};

export default useRefreshing;
