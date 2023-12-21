import { heroes } from "../data/heroes-with-desc";


export const getHeroById = (id) => heroes.find((hero) => hero.id === id);
