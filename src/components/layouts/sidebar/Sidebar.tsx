import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { Logo } from '../../../assets/svg/Logo';
import { LogoDashboard } from '../../../assets/svg/LogoDashboard';
import { LogoDevices } from '../../../assets/svg/LogoDevices';
import { LogoLevel } from '../../../assets/svg/LogoLevel';
import { LogoLogout } from '../../../assets/svg/LogoLogout';
import { LogoReport } from '../../../assets/svg/LogoReport';
import { LogoServices } from '../../../assets/svg/LogoServices';
import { LogoSettings } from '../../../assets/svg/LogoSettings';
import { LogoThreeDotVertical } from '../../../assets/svg/LogoThreeDotVertical';
import { userLogout } from '../../../redux/features/UserSlice';
import { routesConfig } from '../../../routes/routeConfig';
import style from './Sidebar.module.scss';

const cx = classNames.bind(style);

const navbarList = [
      {
            title: 'Dashboard',
            logoLeft: <LogoDashboard />,
            to: routesConfig.dashboard,
      },
      {
            title: 'Thiết bị',
            logoLeft: <LogoDevices />,
            to: routesConfig.devices,
      },
      {
            title: 'Dịch vụ',
            logoLeft: <LogoServices />,
            to: routesConfig.services,
      },
      {
            title: 'Cấp số',
            logoLeft: <LogoLevel />,
            to: routesConfig.customerService,
      },
      {
            title: 'Báo cáo',
            logoLeft: <LogoReport />,
            to: routesConfig.report,
      },
      {
            title: 'Cài đặt hệ thống',
            logoLeft: <LogoSettings />,
            to: routesConfig.setting,
            logoRight: <LogoThreeDotVertical />,
            subMenu: [
                  {
                        title: 'Quản lý vai trò',
                        to: routesConfig.setting,
                        navigateTo: routesConfig.listRole,
                  },
                  {
                        title: 'Quản lý tài khoản',
                        to: routesConfig.setting,
                        navigateTo: routesConfig.listAccount,
                  },
                  {
                        title: 'Nhật ký người dùng',
                        to: routesConfig.setting,
                        navigateTo: routesConfig.listActionHistory,
                  },
            ],
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
      const handleClickNavLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
            if (
                  event.currentTarget.parentElement?.className.includes('disable') ||
                  event.currentTarget.className.includes(cx('subItemActive'))
            ) {
                  event.preventDefault();
                  event.stopPropagation();
            }
      };
      return (
            <div className={cx('wrapper')}>
                  <div className={cx('logo')} onClick={() => navigate(routesConfig.dashboard)}>
                        <Logo width="80" height="64" />
                  </div>
                  <div className={cx('navbar')}>
                        {navbarList.map((item, index) => {
                              return (
                                    <div
                                          key={index}
                                          className={cx(
                                                'navbar-item',
                                                path.startsWith(item.to) && 'active',
                                                item.subMenu && 'disable',
                                          )}
                                    >
                                          <NavLink to={item.to} onClick={handleClickNavLink} end className={cx('item')}>
                                                <div className={cx('item-logo')}>{item.logoLeft}</div>
                                                <p className={cx('item-title')}>{item.title}</p>
                                                {item.logoRight && (
                                                      <div className={cx('item-logo', 'logoRight')}>
                                                            {item.logoRight}
                                                      </div>
                                                )}
                                          </NavLink>
                                          {item.subMenu && (
                                                <div className={cx('sub-menu')}>
                                                      {item.subMenu.map((subItem, index) => {
                                                            return (
                                                                  <NavLink
                                                                        onClick={handleClickNavLink}
                                                                        key={index}
                                                                        state={{ navigateTo: subItem.navigateTo }}
                                                                        to={{ pathname: subItem.to }}
                                                                        className={cx(
                                                                              'sub-menu-item',
                                                                              path.endsWith(subItem.navigateTo) &&
                                                                                    'subItemActive',
                                                                        )}
                                                                        end
                                                                  >
                                                                        <p className={cx('sub-menu-title')}>
                                                                              {subItem.title}
                                                                        </p>
                                                                  </NavLink>
                                                            );
                                                      })}
                                                </div>
                                          )}
                                    </div>
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
