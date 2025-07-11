import { api } from '../services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Observation } from '../types/observation';

export const useObservations = () => {
  return useQuery<Observation[]>({
    queryKey: ['observations'],
    queryFn: async () => {
      const res = await api.get<Observation[]>('/observations');
      return res.data;
    },
  });
};

export const useCreateObservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newObservation: Observation) => {
      const res = await api.post('/observations', newObservation);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['observations'] });
    },
  });
};
