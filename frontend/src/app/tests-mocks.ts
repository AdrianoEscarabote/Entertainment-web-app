import { of } from 'rxjs';

export const storeStub = {
  select: () => of({ movies: [], genre: '', currentPage: 1, totalPages: 1 }),
  dispatch: () => {},
};

export const activatedRouteStub = {
  snapshot: {
    paramMap: {
      get: (key: string) => {
        if (key === 'genre-name') return 'Action';
        if (key === 'genre-id') return '28';
        if (key === 'page') return '1';
        return null;
      },
    },
  },
};
