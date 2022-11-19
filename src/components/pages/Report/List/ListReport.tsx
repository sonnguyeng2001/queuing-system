import './ListReport.css';
import style from './ListReport.module.scss';
import classNames from 'classnames/bind';
import { DatePicker } from 'antd';
import { LogoArrow } from '../../../../assets/svg/LogoArrow';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { CustomerServiceType } from '../../../propsType/CustomerServiceProps';
import { CustomizeTable } from '../../../componentChild/CustomizeTable/CustomizeTable';
import { CustomizeButton } from '../../../componentChild/LinkAction/LinkAction';
import { LogoDownload } from '../../../../assets/svg/LogoDownload';
import { State } from '../../../../redux/store';
import moment from 'moment';
const cx = classNames.bind(style);

export const ListReport = () => {
      const dataRef = useRef<CustomerServiceType[] | []>([]);
      const [dataSource, setDataSource] = useState<CustomerServiceType[] | []>([]);
      const data = useSelector((state: State) => state.customerService);
      const dataService = useSelector((state: State) => state.service);
      const selectedDate = useRef<number[]>([]);

      const columns: any = [
            {
                  title: 'Số thứ tự',
                  dataIndex: 'ordinalNumber',
                  sorter: (a: CustomerServiceType, b: CustomerServiceType) =>
                        parseInt(a.ordinalNumber) - parseInt(b.ordinalNumber),
            },
            {
                  title: 'Tên dịch vụ',
                  dataIndex: 'serviceValue',
                  sorter: (a: CustomerServiceType, b: CustomerServiceType) =>
                        parseInt(a.serviceValue) - parseInt(b.serviceValue),
                  render: (data: string) => {
                        return (
                              <span className="text-devices">
                                    {dataService.dataServices.map((service) => {
                                          return service.id === data && service.name;
                                    })}
                              </span>
                        );
                  },
            },
            {
                  title: 'Thời gian cấp',
                  dataIndex: 'timeStart',
                  sorter: (a: CustomerServiceType, b: CustomerServiceType) => a.timeStart - b.timeStart,
                  render: (data: number) => {
                        return (
                              <span>{`${moment(data).locale('vi').format('LT')} - ${moment(data)
                                    .locale('vi')
                                    .format('L')}`}</span>
                        );
                  },
            },
            {
                  title: 'Tình trạng',
                  dataIndex: 'status',
                  sorter: (a: CustomerServiceType, b: CustomerServiceType) => a.status.length - b.status.length,
                  render: (data: string) => {
                        if (data === 'skip') {
                              return (
                                    <>
                                          <span style={{ color: 'var(--color-red)', marginRight: '10px' }}>
                                                &#9679;
                                          </span>
                                          <span>Bỏ qua</span>
                                    </>
                              );
                        } else if (data === 'complete') {
                              return (
                                    <>
                                          <span style={{ color: 'var(--color-gray-500)', marginRight: '10px' }}>
                                                &#9679;
                                          </span>
                                          <span>Đã sử dụng</span>
                                    </>
                              );
                        } else if (data === 'waiting') {
                              return (
                                    <>
                                          <span style={{ color: 'var(--color-blue)', marginRight: '10px' }}>
                                                &#9679;
                                          </span>
                                          <span>Đang chờ</span>
                                    </>
                              );
                        }
                  },
            },
            {
                  title: 'Nguồn cấp',
                  dataIndex: 'origin',
                  sorter: (a: CustomerServiceType, b: CustomerServiceType) => a.origin.length - b.origin.length,
            },
      ];
      useEffect(() => {
            dataRef.current = data.dataCustomerServices;
            setDataSource(data.dataCustomerServices);
      }, [data.dataCustomerServices]);

      const handleChangeDate = (e: moment.Moment | null, type: 'from' | 'to') => {
            const utcTime = e?.utc().valueOf();
            const date = new Date(utcTime!).getDate();
            const month = new Date(utcTime!).getMonth();
            const year = new Date(utcTime!).getFullYear();
            var value = 0;

            if (type === 'from') {
                  value = new Date(year, month, date, parseInt('00'), parseInt('00')).getTime();
                  selectedDate.current[0] = value;
            } else if (type === 'to') {
                  value = new Date(year, month, date, 23, 59).getTime();
                  selectedDate.current[1] = value;
            }

            if (selectedDate.current[0] && selectedDate.current[1]) {
                  const dataFilter = dataRef.current.filter(
                        (row) => row.timeStart > selectedDate.current[0] && row.timeStart < selectedDate.current[1],
                  );
                  setDataSource(dataFilter);
                  return;
            }

            if (selectedDate.current[0]) {
                  const dataFilter = dataRef.current.filter((row) => row.timeStart > selectedDate.current[0]);
                  setDataSource(dataFilter);
                  return;
            }

            if (selectedDate.current[1]) {
                  const dataFilter = dataRef.current.filter((row) => row.timeStart < selectedDate.current[1]);
                  setDataSource(dataFilter);
                  return;
            }

            if (!selectedDate.current[1] || !selectedDate.current[0]) {
                  console.log('4');
                  setDataSource(dataRef.current);
                  return;
            }
      };

      const pageSize = 9;
      const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
      return (
            <div className={cx('report-wrapper')}>
                  <div className={cx('select')}>
                        <h3 className={cx('title')}>Chọn thời gian</h3>
                        <div className="selectDateGroup">
                              <DatePicker
                                    className="selectDate"
                                    format={dateFormatList}
                                    popupClassName="popup-date"
                                    placeholder="Từ ngày"
                                    onChange={(e) => handleChangeDate(e, 'from')}
                              />
                              <LogoArrow className="selectDate-logoArrow" />
                              <DatePicker
                                    className="selectDate"
                                    format={dateFormatList}
                                    popupClassName="popup-date"
                                    placeholder="Đến ngày"
                                    onChange={(e) => handleChangeDate(e, 'to')}
                              />
                        </div>
                  </div>
                  <div className="tableReport">
                        <CustomizeTable columns={columns} dataSource={dataSource} pageSize={pageSize} />
                        <CustomizeButton
                              title="Tải về"
                              type="button"
                              logo={<LogoDownload />}
                        />
                  </div>
            </div>
      );
};
