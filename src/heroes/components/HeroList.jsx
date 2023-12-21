import { getHeroesByPublisher } from "../helpers";

export const HeroList = ({ publisher }) => {
  const heroList = getHeroesByPublisher(publisher);

  return (
    <ul>
      {heroList.map((hero) => (
        <li key={hero}>{hero.superhero}</li>
      ))}
    </ul>
  );
};
