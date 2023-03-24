import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../useContext/userProvider';
import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { MapMovies } from '../../components/MapMovies';
import './styles.css';
import { Unavailable } from '../../components/Unavailable';

const Genres = () => {

  const { loading, getCategory, genreMovies } = useContext(UserContext);
  let { state } = useLocation();
  
  useEffect(() => {
    getCategory(state.id);
  }, [getCategory, state.id]);

  if (loading) {
    return <div>Cargando...</div>;
  };

  return (
    <div className='genre d-flex flex-column'>
      <div className='header--genre d-flex justify-content-between align-items-center'>
        <Link to={'/'} className='arrow_at_home d-flex justify-content-center align-items-center'>
          <IoIosArrowBack className='icon_arrow fs-1' />
        </Link>
        <div className='title--genre fs-4'>
          {state.name}
        </div>
        <div className='disable_icon'></div>
      </div>
      <div className='movies--genre d-flex justify-content-center flex-wrap'>
        {
          genreMovies ? <MapMovies
            dataToMap={genreMovies}
          /> :
            <Unavailable unavailable='genres' />
        }
      </div>
    </div>
  );
};

export { Genres };
