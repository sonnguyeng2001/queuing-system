import classNames from 'classnames/bind';
import { LogoNotification } from '../../../assets/svg/LogoNotification';
import style from './Header.module.scss';
import imgUser from '../../../assets/images/imgUser.png';
import { Link, useLocation } from 'react-router-dom';
import { privateRoutes } from '../../../routes';
import { useRef, useState, useEffect } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { CardNotification } from '../../componentChild/CardNotification/CardNotification';

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
   const [stateLogo, setStateLogo] = useState<boolean>(false);
   const location = useLocation();
   const logoRef = useRef<HTMLDivElement | null>(null);
   const pathName: string = location.pathname.toString();
   const [currentPage, setCurrentPage] = useState<string[] | []>([]);
   let num: number = currentPage.indexOf(pathName as never);

   useEffect(() => {
      const childrenPage = pathName.startsWith(currentPage[0]);
      if (childrenPage) {
         // Kiểm tra pathName đã tồn tại trong mảng chưa
         const Exists = currentPage.find((page) => page === pathName);
         if (!Exists) {
            setCurrentPage((prev) => [...prev, pathName]);
         } else if (currentPage[num++].length > 0) {
            // Kiểm tra phần tử kế tiếp có tồn tại hay không
            setCurrentPage((prev) => [...prev.filter((ele: string) => ele !== currentPage[num])]);
         }
      } else {
         setCurrentPage([pathName]);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [pathName]);

   const handleClickLogo = () => {
      setStateLogo(!stateLogo);
   };

   const handleDisable = (event: any, index: number) => {
      index === 0 && event.preventDefault();
   };

   return (
      <div className={cx('wrapper')}>
         <div className={cx('leftContent')}>
            <h3 className={cx('heading')}>
               {currentPage.map((page, index) => {
                  return (
                     <Link
                        onClick={(event) => handleDisable(event, index)}
                        className={cx('link')}
                        key={index}
                        to={page}
                     >
                        <span>{'>'}</span>
                        <span className={cx(pathName === page && 'active')}>
                           {privateRoutes.map((route) => {
                              return route.path === page && route.translate;
                           })}
                        </span>
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

               <div className={cx('info-user')}>
                  <img src={imgUser} alt="Error" />
                  <div className={cx('info-user-name')}>
                     <p>Xin chào</p>
                     <p>Lê Quỳnh Ái Vân</p>
                  </div>
               </div>
            </div>
         </HeadlessTippy>
      </div>
   );
};
