export interface Observation {
  id: number;
  student: {
    name: string;
    id: number;
    class: {
      name: string;
      id: number;
    };
  };
  description: string;
  isFavorite: boolean;
}
