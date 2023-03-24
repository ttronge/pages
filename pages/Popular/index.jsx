import { useContext } from 'react';
import { UserContext } from '../../useContext/userProvider';
import { Link } from 'react-router-dom';
import { MapMovies } from '../../components/MapMovies';
import { IoIosArrowBack } from 'react-icons/io';
import './styles.css';

const Popular = () => {

  const { popularsMovies, loading } = useContext(UserContext);

  if (loading) {
    return <div>Cargando...</div>;
  };

  return (
    <div className='popular d-flex justify-content-center flex-column'>
      <div className='header--popular d-flex align-items-center justify-content-between'>
        <Link to={'/'} className='arrow_at_home d-flex justify-content-center align-items-center'>
          <IoIosArrowBack className='icon_arrow fs-1' />
        </Link>
        <div className='title--popular fs-2 d-flex align-items-center'>
          Populars
        </div>
        <div className='disable_icon'></div>
      </div>
      <div className='movies--popular d-flex justify-content-center flex-wrap'>
        {
          popularsMovies && <MapMovies
            dataToMap={popularsMovies}
          />
        }
      </div>
    </div>
  );
};

export { Popular };
