import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../useContext/userProvider';
import { Link, useLocation } from 'react-router-dom';
import { MapGenres } from '../../components/MapGenres';
import { RelatedMovies } from '../../components/RelatedMovies';
import { Unavailable } from '../../components/Unavailable';
import { IoIosArrowBack } from 'react-icons/io';
import { AiFillStar } from 'react-icons/ai';
import './styles.css';
import { PopularMovies } from '../../components/PopularsMovies';

const SingleMovie = () => {


  const { loading, getSingleMovie, singleMovie, getRelatedMovies, related, popularsMovies } = useContext(UserContext);

  let { state } = useLocation();

  useEffect(() => {

    getSingleMovie(state.id);
    getRelatedMovies(state.id);

  }, [getSingleMovie, getRelatedMovies, state.id]);

  if (loading) {
    return <div>Cargando...</div>;
  };

  return (
    <div className='movie d-flex flex-column'>
      <div className='header--movie d-flex align-items-center'>
        <Link to={'/'} className='arrow_at_home d-flex justify-content-center align-items-center'>
          <IoIosArrowBack className='icon_arrow fs-1' />
        </Link>
      </div>
      <div className='content--movie d-flex'>
        <div className='column--movie d-flex justify-content-center align-items-center'>
          {
            singleMovie.poster_path ? <div className='container_image--movie'>

              <img className='img--movie rounded-3 mx-2' src={`https://image.tmdb.org/t/p/w300/${singleMovie.poster_path}`} alt={`poster of "${singleMovie.title}"`} />
            </div> : <Unavailable unavailable='poster' />
          }
        </div>
        <div className='column--movie d-flex justify-content-center align-items-center'>
          <div className='content__info--movie'>
            <div className='first_info--movie d-flex justify-content-between px-2'>
              {singleMovie.title && <p className='title--movie fs-4'> {singleMovie.title} </p>}
              {singleMovie.vote_average && <p className='d-flex align-items-center'> <AiFillStar className='icon_vote--movie mx-2' /> {singleMovie.vote_average} </p>}
            </div>
            {
              singleMovie.overview ?
                <div className='overview--movie px-2'>
                  {singleMovie.overview}
                </div> :
                <Unavailable unavailable='description' />
            }
            {
              singleMovie.genres && <div className='genres--movie  d-flex flex-wrap my-4 px-2'>
                <MapGenres
                  dataToMap={singleMovie.genres}
                />
              </div>
            }
          </div>
        </div>
      </div>

      {
        related.length ?
          <RelatedMovies
            related={related}
          />
        : <div>
          <PopularMovies
            popularsMovies={popularsMovies}
          />
        </div>
      }
    </div>
  );
};

export { SingleMovie };
