import { api } from '../../services/api';
import { useQuery } from '@tanstack/react-query';
import { TStudent } from '../../types/observation';

export const useStudentsList = () => {
  return useQuery<TStudent[]>({
    queryKey: ['students'],
    queryFn: async () => {
      const res = await api.get<TStudent[]>('/students');
      return res.data;
    },
  });
};

export const useStudentByClassId = (
  classId: TStudent['class']['id'],
  options = {},
) => {
  return useQuery<TStudent>({
    queryKey: ['students', classId],
    queryFn: async () => {
      const res = await api.get<TStudent>(`/students/class/${classId}`);
      return res.data;
    },
    ...options,
  });
};
