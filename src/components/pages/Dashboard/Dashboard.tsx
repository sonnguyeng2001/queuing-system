import 'react-calendar/dist/Calendar.css';
import './Dashboard.css';
import classNames from 'classnames/bind';
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
import moment from 'moment';

const cx = classNames.bind(style);

export const DashboardPage = () => {
      const dataDevices = useSelector((state: State) => state.device);
      const dataService = useSelector((state: State) => state.service);
      const dataCustomerService = useSelector((state: State) => state.customerService);

      const templateDataCardList: CardItemType[] = [
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

      const templateDataChart: { title: string; value: number }[] = [
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

      // data = dataChart
      const [selectedDate, setSelectedDate] = useState(new Date());
      const [data, setDataChart] = useState<{ title: string; value: number }[]>(templateDataChart);
      const [cardList, setCardList] = useState<CardItemType[] | []>(templateDataCardList);

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

      const handleClickMonthCalendar = (e: Date) => {
            let endOfMonth = moment(e).endOf('month');
            let startOfMonth = moment(e).startOf('month');
            // ts === timeStamp
            const tsStartDayOfMonth = new Date(
                  startOfMonth.year(),
                  startOfMonth.month(),
                  startOfMonth.date(),
                  startOfMonth.hours(),
                  startOfMonth.minutes(),
            ).getTime();
            const tsEndDayOfMonth = new Date(
                  endOfMonth.year(),
                  endOfMonth.month(),
                  endOfMonth.date(),
                  startOfMonth.hours(),
                  startOfMonth.minutes(),
            ).getTime();

            const totalComplete = dataCustomerService.dataCustomerServices.filter(
                  (value) =>
                        value.timeStart > tsStartDayOfMonth &&
                        value.timeStart < tsEndDayOfMonth &&
                        value.status === 'complete',
            ).length;
            const totalWaiting = dataCustomerService.dataCustomerServices.filter(
                  (value) =>
                        value.timeStart > tsStartDayOfMonth &&
                        value.timeStart < tsEndDayOfMonth &&
                        value.status === 'waiting',
            ).length;
            const totalSkip = dataCustomerService.dataCustomerServices.filter(
                  (value) =>
                        value.timeStart > tsStartDayOfMonth &&
                        value.timeStart < tsEndDayOfMonth &&
                        value.status === 'skip',
            ).length;

            setCardList([
                  {
                        title: 'Số thứ tự đã cấp',
                        LogoCard: <LogoCalendar />,
                        LogoUp: <LogoUp />,
                        quantity: totalComplete + totalSkip + totalWaiting,
                        percent: '32.41',
                        to: routesConfig.customerService,
                  },
                  {
                        title: 'Số thứ tự đã sử dụng',
                        LogoCard: <LogoCalendarCheck />,
                        LogoUp: <LogoDown />,
                        quantity: totalComplete,
                        percent: '32.41',
                        to: routesConfig.customerService,
                  },
                  {
                        title: 'Số thứ tự đang chờ',
                        LogoCard: <LogoPeopleCall />,
                        LogoUp: <LogoUp />,
                        quantity: totalWaiting,
                        percent: '56.41',
                        to: routesConfig.customerService,
                  },
                  {
                        title: 'Số thứ tự đã bỏ qua',
                        LogoCard: <LogoBookmark />,
                        LogoUp: <LogoDown />,
                        quantity: totalSkip,
                        percent: '22.41',
                        to: routesConfig.customerService,
                  },
            ]);
            setDataChart([
                  {
                        title: 'Số thứ tự đã cấp',
                        value: totalSkip + totalWaiting + totalComplete,
                  },
                  {
                        title: 'Đã sử dụng',
                        value: totalComplete,
                  },
                  {
                        title: 'Đang chờ',
                        value: totalWaiting,
                  },
                  {
                        title: 'Bỏ qua',
                        value: totalSkip,
                  },
            ]);
      };

      useEffect(() => {
            const year: number = parseInt(selectedDate.getFullYear().toString());
            const month: number = parseInt(selectedDate.getMonth().toString());
            const date: number = parseInt(selectedDate.getDate().toString());
            const timeStampStart = new Date(year, month, date, 0, 0).getTime();
            const timeStampEnd = new Date(year, month, date, 23, 59).getTime();

            const totalComplete = dataCustomerService.dataCustomerServices.filter(
                  (value) =>
                        value.timeStart > timeStampStart &&
                        value.timeStart < timeStampEnd &&
                        value.status === 'complete',
            ).length;
            const totalWaiting = dataCustomerService.dataCustomerServices.filter(
                  (value) =>
                        value.timeStart > timeStampStart &&
                        value.timeStart < timeStampEnd &&
                        value.status === 'waiting',
            ).length;
            const totalSkip = dataCustomerService.dataCustomerServices.filter(
                  (value) =>
                        value.timeStart > timeStampStart && value.timeStart < timeStampEnd && value.status === 'skip',
            ).length;

            setCardList([
                  {
                        title: 'Số thứ tự đã cấp',
                        LogoCard: <LogoCalendar />,
                        LogoUp: <LogoUp />,
                        quantity: totalComplete + totalSkip + totalWaiting,
                        percent: '32.41',
                        to: routesConfig.customerService,
                  },
                  {
                        title: 'Số thứ tự đã sử dụng',
                        LogoCard: <LogoCalendarCheck />,
                        LogoUp: <LogoDown />,
                        quantity: totalComplete,
                        percent: '32.41',
                        to: routesConfig.customerService,
                  },
                  {
                        title: 'Số thứ tự đang chờ',
                        LogoCard: <LogoPeopleCall />,
                        LogoUp: <LogoUp />,
                        quantity: totalWaiting,
                        percent: '56.41',
                        to: routesConfig.customerService,
                  },
                  {
                        title: 'Số thứ tự đã bỏ qua',
                        LogoCard: <LogoBookmark />,
                        LogoUp: <LogoDown />,
                        quantity: totalSkip,
                        percent: '22.41',
                        to: routesConfig.customerService,
                  },
            ]);
            setDataChart([
                  {
                        title: 'Số thứ tự đã cấp',
                        value: totalSkip + totalWaiting + totalComplete,
                  },
                  {
                        title: 'Đã sử dụng',
                        value: totalComplete,
                  },
                  {
                        title: 'Đang chờ',
                        value: totalWaiting,
                  },
                  {
                        title: 'Bỏ qua',
                        value: totalSkip,
                  },
            ]);
      }, [selectedDate, dataCustomerService.dataCustomerServices]);

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
                              <Calendar
                                    onClickMonth={handleClickMonthCalendar}
                                    value={selectedDate}
                                    onChange={setSelectedDate}
                              />
                        </div>
                  </div>
            </div>
      );
};
