import './ListCustomerService.css';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import style from './ListCustomerService.module.scss';
import classNames from 'classnames/bind';
import { Select, DatePicker } from 'antd';
import { routesConfig } from '../../../../routes/routeConfig';
import { HeaderContent } from '../../../componentChild/HeaderContent/HeaderContent';
import { LogoArrow } from '../../../../assets/svg/LogoArrow';
import { LogoSearch } from '../../../../assets/svg/LogoSearch';
import { LogoPlus } from '../../../../assets/svg/LogoPlus';
import { useSelector } from 'react-redux';
import useDebounce from '../../../../Hooks/useDebound';
import { LinkAction } from '../../../componentChild/LinkAction/LinkAction';
import { CustomizeTable } from '../../../componentChild/CustomizeTable/CustomizeTable';
import { CustomerServiceType } from '../../../propsType/CustomerServiceProps';
import { State } from '../../../../redux/store';
const cx = classNames.bind(style);

const columns: any = [
      {
            title: 'STT',
            dataIndex: 'key',
      },
      {
            title: 'Tên khách hàng',
            dataIndex: 'customerName',
      },
      {
            title: 'Tên dịch vụ',
            dataIndex: 'serviceName',
            render: (data: string[] | []) => {
                  return (
                        <>
                              <span className="text-devices">{data.join('')}</span>
                        </>
                  );
            },
      },
      {
            title: 'Thời gian cấp',
            dataIndex: 'timeStart',
      },
      {
            title: 'Hạn sử dụng',
            dataIndex: 'timeEnd',
      },
      {
            title: 'Trạng thái',
            dataIndex: 'statusLevel',
            render: (data: string[] | []) => {
                  const status: string = data.join('');
                  if (status === 'skip') {
                        return (
                              <>
                                    <span style={{ color: 'var(--color-red)', marginRight: '10px' }}>&#9679;</span>
                                    <span>Bỏ qua</span>
                              </>
                        );
                  } else if (status === 'used') {
                        return (
                              <>
                                    <span style={{ color: 'var(--color-gray-500)', marginRight: '10px' }}>&#9679;</span>
                                    <span>Đã sử dụng</span>
                              </>
                        );
                  } else if (status === 'waiting') {
                        return (
                              <>
                                    <span style={{ color: 'var(--color-blue)', marginRight: '10px' }}>&#9679;</span>
                                    <span>Đang chờ</span>
                              </>
                        );
                  }
            },
      },
      {
            title: 'Nguồn cấp',
            dataIndex: 'origin',
      },
      {
            title: '',
            dataIndex: 'detailsAction',
            render: (data: string) => {
                  return (
                        <>
                              <Link
                                    className="text-underline"
                                    to={`${routesConfig.detailsDevices.replace('/:id', '')}/${data.replace(
                                          'Chi tiết',
                                          '',
                                    )}`}
                              >
                                    Chi tiết
                              </Link>
                        </>
                  );
            },
      },
];

export const ListCustomerService = () => {
      const [dataSource, setDataSource] = useState<CustomerServiceType[] | []>([]);
      const [inputSearch, setInputSearch] = useState<string>('');
      const data = useSelector((state: State) => state.customerService);
      const dataRef = useRef<CustomerServiceType[] | []>([]);

      useEffect(() => {
            var arr = data.dataCustomerServices.map((service: CustomerServiceType) => {
                  return {
                        ...service,
                        detailsAction: `Chi tiết${service?.key}`,
                  };
            });
            dataRef.current = arr;
            setDataSource(arr);
      }, []);
      const handleChangeSelect = (value: string) => {
            if (value === 'all') {
                  setDataSource(dataRef.current);
                  return;
            }

            // select stateStatus
            if (value.startsWith('stateStatus/')) {
                  const state = value.replace('stateStatus/', '');
                  setDataSource(dataRef.current.filter((status) => status.statusLevel[0] === state));
                  return;
            }
      };

      // const debouncedValue = useDebounce(inputSearch, 500);
      // useEffect(() => {
      //    setDataSource(
      //       dataRef.current.filter((key) =>
      //          key.customerName
      //             .toString()
      //             .toLowerCase()
      //             .includes(debouncedValue.toLowerCase()),
      //       ),
      //    );
      // }, [debouncedValue]);

      const handleChangeInput = (e: any) => {
            const searchValue = e.target.value;
            if (!searchValue.startsWith(' ')) {
                  setInputSearch(e.target.value);
            }
      };
      const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
      const pageSize = 7;
      return (
            <div className={cx('wrapper')}>
                  <HeaderContent title="Quản lý cấp số" />
                  <div className={cx('listSelect')}>
                        <div className={cx('select', 'selectName')}>
                              <div>
                                    <h3 className={cx('title')}>Tên dịch vụ</h3>
                                    <Select defaultValue="all" onSelect={handleChangeSelect}>
                                          <Select.Option value="all">Chưa làm</Select.Option>
                                          <Select.Option value="stateName/0">Khám sản phụ khoa</Select.Option>
                                          <Select.Option value="stateName/1">Khám răng hàm mặt</Select.Option>
                                          <Select.Option value="stateName/2">Khám tai mũi họng</Select.Option>
                                    </Select>
                                    <LogoArrow className={cx('logo-arrow')} />
                              </div>
                        </div>
                        <div className={cx('select', 'selectStatus')}>
                              <div>
                                    <h3 className={cx('title')}>Tình trạng</h3>
                                    <Select defaultValue="all" onSelect={handleChangeSelect}>
                                          <Select.Option value="all">Tất cả</Select.Option>
                                          <Select.Option value="stateStatus/waiting">Đang chờ</Select.Option>
                                          <Select.Option value="stateStatus/used">Đã sử dụng</Select.Option>
                                          <Select.Option value="stateStatus/skip">Bỏ qua</Select.Option>
                                    </Select>
                                    <LogoArrow className={cx('logo-arrow')} />
                              </div>
                        </div>
                        <div className={cx('select', 'selectOrigin')}>
                              <div>
                                    <h3 className={cx('title')}>Nguồn cấp</h3>
                                    <Select defaultValue="all" onSelect={handleChangeSelect}>
                                          <Select.Option value="all">Chưa làm</Select.Option>
                                          <Select.Option value="stateConnect/connected">Kết nối</Select.Option>
                                          <Select.Option value="stateConnect/disconnected">Mất kết nối</Select.Option>
                                    </Select>
                                    <LogoArrow className={cx('logo-arrow')} />
                              </div>
                        </div>
                        <div className={cx('select', 'selectDate')}>
                              <div>
                                    <h3 className={cx('title')}>Chọn thời gian</h3>
                                    <div className="selectDateGroup">
                                          <DatePicker
                                                className="selectDate"
                                                // defaultValue={moment(moment().format('DD/MM/YYYY'), 'DD/MM/YYYY')}
                                                format={dateFormatList}
                                                popupClassName="popup-date"
                                                onChange={(date) => console.log(date)}
                                                placeholder="Từ ngày"
                                          />
                                          <LogoArrow className="selectDate-logoArrow" />
                                          <DatePicker
                                                className="selectDate"
                                                // defaultValue={moment(moment().format('DD/MM/YYYY'), 'DD/MM/YYYY')}
                                                format={dateFormatList}
                                                popupClassName="popup-date"
                                                placeholder="Đến ngày"
                                          />
                                    </div>
                              </div>
                        </div>
                        <div className={cx('select', 'search')}>
                              <div>
                                    <div className={cx('title')}>Từ khóa</div>
                                    <input
                                          onChange={handleChangeInput}
                                          value={inputSearch}
                                          type="text"
                                          placeholder="Nhập từ khóa..."
                                          className={cx('content')}
                                    />
                                    <LogoSearch className={cx('logo-arrow')} />
                              </div>
                        </div>
                  </div>
                  <div className={cx('tableCustomerService')}>
                        <CustomizeTable columns={columns} dataSource={dataSource} pageSize={pageSize} />

                        <LinkAction title="Cấp số mới" to={routesConfig.addCustomerService} logo={<LogoPlus />} />
                  </div>
            </div>
      );
};
