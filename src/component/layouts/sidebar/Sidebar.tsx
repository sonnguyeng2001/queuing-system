import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Logo } from '../../../assets/svg/Logo';
import { LogoDashboard } from '../../../assets/svg/LogoDashboard';
import { LogoDevices } from '../../../assets/svg/LogoDevices';
import { LogoLevel } from '../../../assets/svg/LogoLevel';
import { LogoLogout } from '../../../assets/svg/LogoLogout';
import { LogoReport } from '../../../assets/svg/LogoReport';
import { LogoServices } from '../../../assets/svg/LogoServices';
import { LogoSettings } from '../../../assets/svg/LogoSettings';
import { userLogout } from '../../../redux/features/UserSlice';
import { routesConfig } from '../../../routes/routeConfig';
import style from './Sidebar.module.scss';

const cx = classNames.bind(style);

const navbarList = [
   {
      title: 'Dashboard',
      logo: <LogoDashboard />,
      to: routesConfig.dashboard,
   },
   {
      title: 'Thiết bị',
      logo: <LogoDevices />,
      to: routesConfig.devices,
   },
   {
      title: 'Dịch vụ',
      logo: <LogoServices />,
      to: routesConfig.services,
   },
   {
      title: 'Cấp số',
      logo: <LogoLevel />,
      to: routesConfig.customerService,
   },
   {
      title: 'Báo cáo',
      logo: <LogoReport />,
      to: '/report',
   },
   {
      title: 'Cài đặt hệ thống',
      logo: <LogoSettings />,
      to: '/settings',
   },
];

export const Sidebar = () => {
   const dispatch = useDispatch<any>();
   const navigate = useNavigate();
   const location = useLocation();
   const path: string = location.pathname.toString();
   const handleLogout = () => {
      dispatch(userLogout(true));
      navigate(routesConfig.login);
   };

   return (
      <div className={cx('wrapper')}>
         <div className={cx('logo')}>
            <Logo width="80" height="64" />
         </div>
         <div className={cx('navbar')}>
            {navbarList.map((item, index) => {
               return (
                  <NavLink
                     key={index}
                     className={cx('navbar-item', path.startsWith(item.to) && 'active')}
                     to={item.to}
                     end
                  >
                     <div className={cx('navbar-item-logo')}>{item.logo}</div>
                     <p className={cx('navbar-item-title')}>{item.title}</p>
                  </NavLink>
               );
            })}
         </div>
         <div className={cx('logout')}>
            <button onClick={handleLogout} className={cx('btnLogout')}>
               <LogoLogout />
               <span>Đăng xuất</span>
            </button>
         </div>
      </div>
   );
};
