import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getHeroById } from "../helpers";
import React, { useMemo } from "react";

export const HeroPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const hero = useMemo(() => getHeroById(id), [id]);
  //const hero = getHeroById(id);

  const navigateBack = () => navigate(-1);

  if (!hero) return <Navigate to={"/"} />;

  return (
    <div className='row mt-5'>
      <div className='col-4'>
        <img
          src={`/assets/heroes/${id}.jpg`}
          alt={hero.superhero}
          className='img-thumbnail animate__animated animate__fadeInLeft'
        />
      </div>
      <div className='col-8'>
        <h3>{hero.superhero}</h3>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>
            <b>Alter Ego: {hero.alter_ego}</b>
          </li>
          <li className='list-group-item'>
            <b>Publisher: {hero.publisher}</b>
          </li>
          <li className='list-group-item'>
            <b>First Appearence: {hero.first_appearance}</b>
          </li>
        </ul>
        <h5 className='mt-3'>Characters</h5>
        <p>{hero.characters}</p>

        <button className='btn btn-outline-primary' onClick={navigateBack}>
          Regresar
        </button>
      </div>
    </div>
  );
};
