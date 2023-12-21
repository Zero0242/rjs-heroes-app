import { heroes } from "../data/heroes-with-desc";

export const getHeroeBySeach = (query = "") => {
  query = query.toLocaleLowerCase().trim();
  if (query.length === 0) return [];

  return heroes.filter(({ superhero }) =>
    superhero.toLowerCase().includes(query)
  );
};
