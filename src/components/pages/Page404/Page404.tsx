import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { State } from '../../../redux/store';
import { routesConfig } from '../../../routes/routeConfig';
import style from './Page404.module.scss';

const cx = classNames.bind(style);
export const Page404 = () => {
      const dataUser = useSelector((state: State) => state.user);
      const navigate = useNavigate();
      const handleClick = () => {
            if (dataUser.isLoggedIn) {
                  console.log(dataUser.currentUser);
                  navigate(routesConfig.dashboard);
            } else {
                  console.log('login');
                  navigate('/');
            }
      };
      return (
            <div className={cx('wrapper')}>
                  <h1 className={cx('title')}>Page 404...</h1>
                  <button onClick={handleClick} className={cx('btn-Navigate')}>
                        Home
                  </button>
            </div>
      );
};
