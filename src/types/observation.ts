export interface TObservation {
  id: string;
  student: {
    name: string;
    id: string;
    class: {
      name: string;
      id: string;
    };
  };
  description: string;
  isFavorite: boolean;
}
