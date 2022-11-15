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
import { useSelector } from 'react-redux';
import { State } from '../../../redux/store';

const cx = classNames.bind(style);

export const DashboardPage = () => {
      const [data, setData] = useState([]);
      const dataDevices = useSelector((state: State) => state.device);
      const dataService = useSelector((state: State) => state.service);
      const dataCustomerService = useSelector((state: State) => state.customerService);
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
                  colorPrimary: 'var(--color-orange-500)',
                  options: [
                        {
                              color: 'var(--color-orange-500)',
                              title: 'Đang hoạt động',
                              number: dataDevices.dataDevices.filter((device) => device.isActive).length,
                              type: 'active',
                        },
                        {
                              color: 'var(--color-gray-300)',
                              title: 'Ngưng hoạt động',
                              number: dataDevices.dataDevices.filter((device) => !device.isActive).length,
                              type: 'unActive',
                        },
                  ],
                  title: 'Thiết bị',
                  logo: <LogoDevices />,
            } as CardNoNameType,
            {
                  colorPrimary: 'var(--color-blue)',
                  options: [
                        {
                              color: 'var(--color-blue)',
                              title: 'Đang hoạt động',
                              number: dataService.dataServices.filter((service) => service.isActive).length,
                              type: 'active',
                        },
                        {
                              color: 'var(--color-gray-300)',
                              title: 'Ngưng hoạt động',
                              number: dataService.dataServices.filter((service) => !service.isActive).length,
                              type: 'unActive',
                        },
                  ],
                  title: 'Dịch vụ',
                  logo: <LogoServices />,
            } as CardNoNameType,
            {
                  colorPrimary: 'var(--color-green)',
                  options: [
                        {
                              color: 'var(--color-green)',
                              title: 'Đang chờ',
                              number: dataCustomerService.dataCustomerServices.filter((cs) => cs.status === 'waiting')
                                    .length,
                              type: 'active',
                        },
                        {
                              color: 'var(--color-gray-300)',
                              title: 'Đã sử dụng',
                              number: dataCustomerService.dataCustomerServices.filter((cs) => cs.status === 'complete')
                                    .length,
                              type: 'unActive',
                        },
                        {
                              color: 'var(--color-pink)',
                              title: 'Bỏ qua',
                              number: dataCustomerService.dataCustomerServices.filter((cs) => cs.status === 'skip')
                                    .length,
                              type: 'skip',
                        },
                  ],
                  title: 'Cấp số',
                  logo: <LogoLevel />,
            } as CardNoNameType,
      ];

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
