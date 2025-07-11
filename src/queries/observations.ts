import { api } from '../services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TObservation } from '../types/observation';

export const useObservationList = () => {
  return useQuery<TObservation[]>({
    queryKey: ['observations'],
    queryFn: async () => {
      const res = await api.get<TObservation[]>('/observations');
      return res.data;
    },
  });
};

export const useObservationById = (id: TObservation['id'], options = {}) => {
  return useQuery<TObservation>({
    queryKey: ['observations', id],
    queryFn: async () => {
      const res = await api.get<TObservation>(`/observations/${id}`);
      return res.data;
    },
    ...options,
  });
};

export const useUpdateObservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updatedObservation }: TObservation) => {
      const res = await api.put(`/observations/${id}`, updatedObservation);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['observations'] });
    },
  });
};

export const useCreateObservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newObservation: TObservation) => {
      const res = await api.post('/observations', newObservation);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['observations'] });
    },
  });
};
