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
import { routesConfig } from '../../../routes/routeConfig';
import { Select } from 'antd';
import { LogoArrow } from '../../../assets/svg/LogoArrow';

const cx = classNames.bind(style);

export const DashboardPage = () => {
      const [data, setData] = useState<{ title: string; value: number }[]>([]);
      const dataDevices = useSelector((state: State) => state.device);
      const dataService = useSelector((state: State) => state.service);
      const dataCustomerService = useSelector((state: State) => state.customerService);
      const cardList: CardItemType[] = [
            {
                  title: 'Số thứ tự đã cấp',
                  LogoCard: <LogoCalendar />,
                  LogoUp: <LogoUp />,
                  quantity: dataCustomerService.dataCustomerServices.length,
                  percent: '32.41',
                  to: routesConfig.customerService,
            },
            {
                  title: 'Số thứ tự đã sử dụng',
                  LogoCard: <LogoCalendarCheck />,
                  LogoUp: <LogoDown />,
                  quantity: dataCustomerService.dataCustomerServices.filter((cs) => cs.status === 'complete').length,
                  percent: '32.41',
                  to: routesConfig.customerService,
            },
            {
                  title: 'Số thứ tự đang chờ',
                  LogoCard: <LogoPeopleCall />,
                  LogoUp: <LogoUp />,
                  quantity: dataCustomerService.dataCustomerServices.filter((cs) => cs.status === 'waiting').length,
                  percent: '56.41',
                  to: routesConfig.customerService,
            },
            {
                  title: 'Số thứ tự đã bỏ qua',
                  LogoCard: <LogoBookmark />,
                  LogoUp: <LogoDown />,
                  quantity: dataCustomerService.dataCustomerServices.filter((cs) => cs.status === 'skip').length,
                  percent: '22.41',
                  to: routesConfig.customerService,
            },
      ];
      const cardNoNameList: CardNoNameType[] = [
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
                  to: routesConfig.devices,
            },
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
                  to: routesConfig.services,
            },
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
                  to: routesConfig.customerService,
            },
      ];

      useEffect(() => {
            const dataConfig: { title: string; value: number }[] = [
                  {
                        title: 'Số thứ tự đã cấp',
                        value: dataCustomerService.dataCustomerServices.length,
                  },
                  {
                        title: 'Đang chờ',
                        value: dataCustomerService.dataCustomerServices.filter((cs) => cs.status === 'waiting').length,
                  },
                  {
                        title: 'Bỏ qua',
                        value: dataCustomerService.dataCustomerServices.filter((cs) => cs.status === 'skip').length,
                  },
                  {
                        title: 'Đã sử dụng',
                        value: dataCustomerService.dataCustomerServices.filter((cs) => cs.status === 'complete').length,
                  },
            ];
            setData(dataConfig);
      }, [dataCustomerService.dataCustomerServices]);

      const config = {
            data,
            xField: 'title',
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
                                          <Select
                                                placeholder="Xem theo..."
                                                options={[
                                                      {
                                                            value: 'day',
                                                            label: 'Ngày',
                                                      },
                                                      {
                                                            value: 'month',
                                                            label: 'Tuần',
                                                      },
                                                      {
                                                            value: 'year',
                                                            label: 'Tháng',
                                                      },
                                                ]}
                                          />
                                          <LogoArrow
                                                style={{
                                                      position: 'absolute',
                                                      top: ' 50%',
                                                      right: '10px',
                                                      transform: 'translate(0, -50%)',
                                                }}
                                          />
                                    </div>
                              </div>
                              <Area autoFit={true} renderer="canvas" className={cx('chart-area')} {...config} />
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
