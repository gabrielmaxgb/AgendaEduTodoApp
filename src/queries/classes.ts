import { api } from '../services/api';
import { useQuery } from '@tanstack/react-query';
import { TClass } from '../types/observation';

export const useClassesList = () => {
  return useQuery<TClass[]>({
    queryKey: ['classes'],
    queryFn: async () => {
      const res = await api.get<TClass[]>('/classes');
      return res.data;
    },
  });
};
