import classNames from 'classnames/bind';
import { LogoNotification } from '../../../assets/svg/LogoNotification';
import style from './Header.module.scss';
import imgUser from '../../../assets/images/imgUser.png';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { privateRoutes } from '../../../routes';
import { useRef, useState, useEffect, ReactEventHandler } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { CardNotification } from '../../componentChild/CardNotification/CardNotification';
import { useSelector } from 'react-redux';
import { State } from '../../../redux/store';
import { routesConfig } from '../../../routes/routeConfig';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const cx = classNames.bind(style);

const notificationList = [
      {
            username: 'Nguyễn Thị Thùy Dung',
            time: '12h20',
            date: '30/11/2021',
      },
      {
            username: 'Nguyễn Thiên Trinh',
            time: '12h20',
            date: '30/11/2021',
      },
      {
            username: 'Võ Thị Kim Liên',
            time: '12h20',
            date: '30/11/2021',
      },

      {
            username: 'Hoàng Nguyễn Quốc Huy',
            time: '12h20',
            date: '30/11/2021',
      },
      {
            username: 'Võ Ngọc Lan Anh',
            time: '12h20',
            date: '30/11/2021',
      },
      {
            username: 'Nguyễn Thị Trúc Anh',
            time: '12h20',
            date: '30/11/2021',
      },
      {
            username: 'Nguyễn Trung Toàn',
            time: '12h20',
            date: '30/11/2021',
      },
      {
            username: 'Phạm Hồng Ngọc',
            time: '12h20',
            date: '30/11/2021',
      },
      {
            username: 'Hồ Trung Hiếu',
            time: '12h20',
            date: '30/11/2021',
      },
      {
            username: 'Hoàng Duy Phước',
            time: '12h20',
            date: '30/11/2021',
      },
      {
            username: 'Trương Ngọc Quyên',
            time: '12h20',
            date: '30/11/2021',
      },
];
export const Header = () => {
      const { id } = useParams();
      const [stateLogo, setStateLogo] = useState<boolean>(false);
      const dataUser = useSelector((state: State) => state.user);
      const navigate = useNavigate();
      const location = useLocation();
      const logoRef = useRef<HTMLDivElement | null>(null);
      const pathName: string = location.pathname.toString();
      const [currentPage, setCurrentPage] = useState<string[] | []>(() => {
            if (window.localStorage.getItem('currentPage')) {
                  return JSON.parse(window.localStorage.getItem('currentPage')!);
            }
            return ['/dashboard'];
      });
      let num: number = currentPage.indexOf(pathName as never);

      useEffect(() => {
            // Xử lý page Header
            const childrenPage = pathName.startsWith(currentPage[0]);
            if (childrenPage) {
                  // Kiểm tra pathName đã tồn tại trong mảng chưa
                  const Exists = currentPage.find((page) => page === pathName);
                  if (!Exists) {
                        setCurrentPage((prev) => [...prev, pathName]);
                        window.localStorage.setItem('currentPage', JSON.stringify([...currentPage, pathName]));
                  } else if (currentPage[num++].length > 0) {
                        // Kiểm tra phần tử kế tiếp có tồn tại hay không
                        setCurrentPage((prev) => [...prev.filter((ele: string) => ele !== currentPage[num])]);
                        window.localStorage.setItem(
                              'currentPage',
                              JSON.stringify([...currentPage.filter((ele: string) => ele !== currentPage[num])]),
                        );
                  }
            } else {
                  setCurrentPage([pathName]);
                  window.localStorage.setItem('currentPage', JSON.stringify([pathName]));
            }

            return () => {
                  window.localStorage.removeItem('currentPage');
            };

            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [pathName]);

      const handleClickLogo = () => {
            setStateLogo(!stateLogo);
      };

      const handleDisable = (event: any, index: number) => {
            if (index === 0 || index === currentPage.length - 1) {
                  // Đang đứng ở trang nào thì disable thẻ link pageHeader trang đó để tránh click và re-render
                  event.preventDefault();
                  event.stopPropagation();
            }
      };

      return (
            <div className={cx('wrapper')}>
                  <div className={cx('leftContent')}>
                        <h3 className={cx('heading')}>
                              {currentPage.map((page, index) => {
                                    return (
                                          <Link
                                                onClick={(event) => handleDisable(event, index)}
                                                className={cx('link', pathName === page && 'active')}
                                                key={index}
                                                to={page}
                                          >
                                                {privateRoutes.map((route) => {
                                                      if (route.pageHeader === page?.replace(`/${id}`, ''))
                                                            return (
                                                                  <span key={`${route}${Math.random()}`}>
                                                                        <span className={cx('link-arrow')}>{'>'}</span>
                                                                        <span className={cx('link-title')}>
                                                                              {route.translate}
                                                                        </span>
                                                                  </span>
                                                            );

                                                      return true;
                                                })}
                                          </Link>
                                    );
                              })}
                        </h3>
                  </div>

                  <HeadlessTippy
                        interactive
                        placement="bottom"
                        visible={stateLogo}
                        render={(attrs) => (
                              <div className={cx('notification')} tabIndex={-1} {...attrs}>
                                    <div className={cx('header')}>Thông báo</div>
                                    <div className={cx('list-notification')}>
                                          {notificationList.map((item, index) => {
                                                return <CardNotification key={index} children={item} />;
                                          })}
                                    </div>
                              </div>
                        )}
                  >
                        <div
                              className={
                                    pathName === '/dashboard' ? cx('rightContent', 'dashboard') : cx('rightContent')
                              }
                        >
                              <div
                                    ref={logoRef}
                                    onClick={handleClickLogo}
                                    className={cx('logo', stateLogo && 'active')}
                              >
                                    <LogoNotification />
                              </div>

                              <Tippy animation="scale" content="Thông tin cá nhân" placement="bottom">
                                    <div onClick={() => navigate(routesConfig.infoUser)} className={cx('info-user')}>
                                          <img
                                                src={dataUser.currentUser.img || imgUser}
                                                alt="Error"
                                                onError={(e: any) => {
                                                      e.target.setAttribute('src', imgUser);
                                                }}
                                          />
                                          <div className={cx('info-user-name')}>
                                                <p>Xin chào</p>
                                                <p>{dataUser.currentUser.fullName || 'No current user'}</p>
                                          </div>
                                    </div>
                              </Tippy>
                        </div>
                  </HeadlessTippy>
            </div>
      );
};
