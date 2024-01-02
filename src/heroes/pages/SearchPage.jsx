import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useForm } from "../../ui/hooks";
import { HeroCard } from "../components";
import { getHeroeBySeach } from "../helpers";

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);
  const { onInputChange, searchQuery } = useForm({ searchQuery: q });
  const heroes = getHeroeBySeach(q);

  const showBanner = q.length === 0;
  const showError = q.length > 0 && heroes.length === 0;

  const onSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim().length <= 1) return;

    navigate(`?q=${searchQuery.toLowerCase()}`);
  };

  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className='row'>
        <div className='col-5'>
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input
              type='text'
              className='form-control'
              placeholder='Search a hero'
              name='searchQuery'
              autoComplete='off'
              value={searchQuery}
              onChange={onInputChange}
            />
            <button className='btn btn-outline-primary mt-2'>Search</button>
          </form>
        </div>
        <div className='col-7'>
          <h4>Results</h4>
          <hr />

          <div
            className='alert alert-primary animate__animated animate__fadeIn'
            style={{ display: showBanner ? "" : "none" }}>
            Buscar un Heroe
          </div>

          <div
            aria-label='alert-danger'
            className='alert alert-danger animate__animated animate__fadeIn'
            style={{ display: showError ? "" : "none" }}>
            No Results for <b>{q}</b>
          </div>

          {heroes.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};
