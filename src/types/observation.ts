export interface TObservation {
  id: string;
  student: TStudent;
  description: string;
  isFavorite: boolean;
}

export interface TStudent {
  id: string;
  name: string;
  class: TClass;
}

export interface TClass {
  id: string;
  name: string;
}
