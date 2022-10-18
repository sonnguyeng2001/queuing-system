import classNames from 'classnames/bind';
import 'react-calendar/dist/Calendar.css';
import './Dashboard.css';
import { LogoBookmark } from '../../../assets/svg/LogoBookmark';
import { LogoCalendar } from '../../../assets/svg/LogoCalendar';
import { LogoCalendarCheck } from '../../../assets/svg/LogoCalendarCheck';
import { LogoDown } from '../../../assets/svg/LogoDown';
import { LogoPeopleCall } from '../../../assets/svg/LogoPeopleCall';
import { LogoUp } from '../../../assets/svg/LogoUp';
import { CardItem } from '../../componentChild/CardItem/CardItem';
import { CardItemType } from '../../propsType/CardItemProps';
import style from './Dashboard.module.scss';
import { useState, useEffect } from 'react';
import { Area } from '@ant-design/plots';
import { CardNoName } from '../../componentChild/CardNoName/CardNoName';
import { CardNoNameType } from '../../propsType/CardNoNameProps';
import { LogoDevices } from '../../../assets/svg/LogoDevices';
import { LogoServices } from '../../../assets/svg/LogoServices';
import { LogoLevel } from '../../../assets/svg/LogoLevel';
import Calendar from 'react-calendar';
import { HeaderContent } from '../../componentChild/HeaderContent/HeaderContent';

const cx = classNames.bind(style);

const cardList = [
   {
      title: 'Số thứ tự đã cấp',
      LogoCard: <LogoCalendar />,
      LogoUp: <LogoUp />,
      quantity: 4221,
      percent: '32.41',
   } as CardItemType,
   {
      title: 'Số thứ tự đã sử dụng',
      LogoCard: <LogoCalendarCheck />,
      LogoUp: <LogoDown />,
      quantity: 3721,
      percent: '32.41',
   } as CardItemType,
   {
      title: 'Số thứ tự đang chờ',
      LogoCard: <LogoPeopleCall />,
      LogoUp: <LogoUp />,
      quantity: 468,
      percent: '56.41',
   } as CardItemType,
   {
      title: 'Số thứ tự đã bỏ qua',
      LogoCard: <LogoBookmark />,
      LogoUp: <LogoDown />,
      quantity: 32,
      percent: '22.41',
   } as CardItemType,
];

const cardNoNameList = [
   {
      total: 4221,
      color: 'var(--color-orange-500)',
      activeNumber: 3779,
      stopNumber: 422,
      title: 'Thiết bị',
      logo: <LogoDevices />,
   } as CardNoNameType,
   {
      total: 276,
      color: 'var(--color-blue)',
      activeNumber: 210,
      title: 'Dịch vụ',
      stopNumber: 66,
      logo: <LogoServices />,
   } as CardNoNameType,
   {
      total: 4221,
      color: 'var(--color-green)',
      activeNumber: 3721,
      stopNumber: 500,
      title: 'Cấp số',
      logo: <LogoLevel />,
   } as CardNoNameType,
];
export const DashboardPage = () => {
   const [data, setData] = useState([]);

   useEffect(() => {
      asyncFetch();
   }, []);

   const asyncFetch = () => {
      fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
         .then((response) => response.json())
         .then((json) => setData(json))
         .catch((error) => {
            console.log('fetch data failed', error);
         });
   };
   const config = {
      data,
      xField: 'timePeriod',
      yField: 'value',
      xAxis: {
         range: [0, 1],
      },
   };
   return (
      <div className={cx('wrapper')}>
         <div className={cx('leftContent')}>
            <HeaderContent title="Biểu đồ cấp số" />
            <div className={cx('cartList')}>
               {cardList.map((card, index) => {
                  return <CardItem key={index} children={card} />;
               })}
            </div>
            <div className={cx('chart')}>
               <div className={cx('heading')}>
                  <h3>Bảng thống kê theo ngày</h3>
                  <div className={cx('dropdown')}>
                     <span>Xem theo</span>
                     <select name="noName">
                        <option value="1">Ngày</option>
                        <option value="2">Tuần</option>
                        <option value="2">Tháng</option>
                     </select>
                  </div>
               </div>
               <Area className={cx('chart-area')} {...config} />
            </div>
         </div>
         <div className={cx('rightContent')}>
            <h2 className={cx('heading')}>Tổng quan</h2>
            {cardNoNameList.map((card, index) => {
               return <CardNoName key={index} children={card} />;
            })}
            <div className={cx('calendar')}>
               <Calendar />
            </div>
         </div>
      </div>
   );
};
