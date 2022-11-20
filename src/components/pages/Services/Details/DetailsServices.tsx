import './DetailsServices.css';
import { useParams } from 'react-router-dom';
import { routesConfig } from '../../../../routes/routeConfig';
import style from './DetailsServices.module.scss';
import classNames from 'classnames/bind';
import { HeaderContent } from '../../../componentChild/HeaderContent/HeaderContent';
import { useSelector } from 'react-redux';
import { State } from '../../../../redux/store';
import { useEffect, useState, useRef } from 'react';
import { CustomizeButton } from '../../../componentChild/LinkAction/LinkAction';
import { LogoEdit } from '../../../../assets/svg/LogoEdit';
import { LogoSearch } from '../../../../assets/svg/LogoSearch';
import { DatePicker, Select } from 'antd';
import { LogoArrow } from '../../../../assets/svg/LogoArrow';
import { CustomizeTable } from '../../../componentChild/CustomizeTable/CustomizeTable';
import { ServiceType } from '../../../propsType/ServiceProps';
import { CheckboxOptionType } from 'antd/lib/checkbox';
import { CustomerServiceType } from '../../../propsType/CustomerServiceProps';
const cx = classNames.bind(style);

const columns: any = [
      {
            title: 'Số thứ tự',
            dataIndex: 'ordinalNumber',
      },

      {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (data: string) => {
                  if (data === 'skip') {
                        return (
                              <>
                                    <span style={{ color: 'var(--color-red)', marginRight: '10px' }}>&#9679;</span>
                                    <span>Bỏ qua</span>
                              </>
                        );
                  } else if (data === 'complete') {
                        return (
                              <>
                                    <span style={{ color: 'var(--color-gray-500)', marginRight: '10px' }}>&#9679;</span>
                                    <span>Đã sử dụng</span>
                              </>
                        );
                  } else if (data === 'waiting') {
                        return (
                              <>
                                    <span style={{ color: 'var(--color-blue)', marginRight: '10px' }}>&#9679;</span>
                                    <span>Đang chờ</span>
                              </>
                        );
                  }
            },
      },
];

export const DetailsServices = () => {
      const [services, setService] = useState<ServiceType>({} as ServiceType);
      const { id } = useParams();
      const data = useSelector((state: State) => state.service);
      const dataCustomerService = useSelector((state: State) => state.customerService);
      const [dataSource, setDataSource] = useState<CustomerServiceType[] | []>([]);
      const dataRef = useRef<CustomerServiceType[] | []>([]);
      const selectedDate = useRef<number[]>([]);

      useEffect(() => {
            const infoService = data.dataServices.find((service: ServiceType) => {
                  return service.key.toString() === id && service;
            });
            infoService !== undefined && setService(infoService);

            const dataCustomerServiceTable = dataCustomerService.dataCustomerServices.filter((data) =>
                  data.ordinalNumber.toString().startsWith(infoService?.id!),
            );
            setDataSource(dataCustomerServiceTable);
            dataRef.current = dataCustomerServiceTable;
      }, [data.dataServices, id, dataCustomerService.dataCustomerServices]);

      const handleChangeSelect = (value: string) => {
            if (value === 'all') {
                  setDataSource(dataRef.current);
            } else {
                  setDataSource(dataRef.current.filter((state) => state.status === value));
            }
      };

      const handleChangeDate = (e: moment.Moment | null, type: 'from' | 'to') => {
            const utcTime = e?.utc().valueOf();
            const date = new Date(utcTime!).getDate();
            const month = new Date(utcTime!).getMonth();
            const year = new Date(utcTime!).getFullYear();
            var value = 0;

            if (type === 'from') {
                  value = new Date(year, month, date, 0, 0, 0).getTime();
                  selectedDate.current[0] = value;
            } else if (type === 'to') {
                  value = new Date(year, month, date, 23, 59, 59).getTime();
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
                  setDataSource(dataRef.current);
                  return;
            }
      };
      const optionServices: CheckboxOptionType[] = [
            {
                  label: (
                        <div className={cx('object')}>
                              <span className={cx('key')}>Tăng tự động từ:</span>
                              <span className={cx('value')}>
                                    <span className={cx('text-special')}>0001</span>
                                    &nbsp; đến &nbsp;
                                    <span className={cx('text-special')}>9999</span>
                              </span>
                        </div>
                  ),
                  value: 'autoBoost',
            },
            {
                  label: (
                        <div className={cx('object')} style={{ margin: '4px 0px' }}>
                              <span className={cx('key')}>Prefix:</span>
                              <span className={cx('value')}>
                                    <span className={cx('text-special')}>0001</span>
                              </span>
                        </div>
                  ),
                  value: 'prefix',
            },
            {
                  label: (
                        <div className={cx('object')} style={{ margin: '4px 0px' }}>
                              <span className={cx('key')}>Suffix:</span>
                              <span className={cx('value')}>
                                    <span className={cx('text-special')}>0001</span>
                              </span>
                        </div>
                  ),
                  value: 'suffix',
            },
            {
                  label: (
                        <div className={cx('object')}>
                              <span className={cx('key')}>Reset mỗi ngày</span>
                        </div>
                  ),
                  value: 'resetEveryday',
            },
      ];

      const pageSize = 6;
      const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
      return (
            <div className={cx('wrapper')}>
                  <HeaderContent title="Quản lý dịch vụ" />
                  <div className={cx('content-wrapper')}>
                        <div className={cx('content')}>
                              <div className={cx('content-left')}>
                                    <>
                                          <header className={cx('header-content')}>Thông tin dịch vụ</header>
                                          <div className={cx('object')}>
                                                <span className={cx('value')}>
                                                      <strong className={cx('title')}>Mã dịch vụ: </strong>
                                                      {services?.id}
                                                </span>
                                          </div>
                                          <div className={cx('object')}>
                                                <span className={cx('value')}>
                                                      <strong className={cx('title')}>Tên dịch vụ: </strong>
                                                      {services?.name}
                                                </span>
                                          </div>
                                          <div
                                                className={cx('object')}
                                                style={{ height: '130px', overflow: 'overlay' }}
                                          >
                                                <span className={cx('value')}>
                                                      <strong className={cx('title')}>Mô tả: </strong>
                                                      {services?.desc}
                                                </span>
                                          </div>
                                          {/* --------------------------------------------------------------------------------------------------- */}
                                          <br />
                                          <header className={cx('header-content')}>Quy tắc cấp số</header>
                                          {services.listOption &&
                                                services.listOption.map((option) => {
                                                      const jsxElement = optionServices.find(
                                                            (service) => option.valueOf() === service.value.valueOf(),
                                                      );
                                                      return (
                                                            <div
                                                                  style={{ marginBottom: '10px' }}
                                                                  key={jsxElement?.value.toString()}
                                                            >
                                                                  {jsxElement?.label}
                                                            </div>
                                                      );
                                                })}
                                    </>
                              </div>

                              <div className={cx('content-right')}>
                                    {/* Action Header */}
                                    <div className={cx('listSelect')}>
                                          <div className={cx('select', 'selectActive')}>
                                                <div>
                                                      <h3 className={cx('title')}>Trạng thái hoạt động</h3>
                                                      <Select
                                                            defaultValue="all"
                                                            className="service-select"
                                                            onSelect={handleChangeSelect}
                                                      >
                                                            <Select.Option value="all">Tất cả</Select.Option>
                                                            <Select.Option value="complete">Đã sử dụng</Select.Option>
                                                            <Select.Option value="skip">Bỏ qua</Select.Option>
                                                            <Select.Option value="waiting">Đang chờ</Select.Option>
                                                      </Select>
                                                      <LogoArrow className={cx('logo-arrow')} />
                                                </div>
                                          </div>

                                          <div className={cx('select', 'selectDate')}>
                                                <h3 className={cx('title')}>Chọn thời gian</h3>
                                                <div className="selectDateGroup">
                                                      <DatePicker
                                                            className="selectDate"
                                                            placeholder="Từ ngày"
                                                            format={dateFormatList}
                                                            popupClassName="popup-date"
                                                            onChange={(e) => handleChangeDate(e, 'from')}
                                                      />
                                                      <LogoArrow className="selectDate-logoArrow" />
                                                      <DatePicker
                                                            className="selectDate"
                                                            format={dateFormatList}
                                                            placeholder="Đến ngày"
                                                            popupClassName="popup-date"
                                                            onChange={(e) => handleChangeDate(e, 'to')}
                                                      />
                                                </div>
                                          </div>

                                          <div className={cx('select', 'search')}>
                                                <div>
                                                      <div className={cx('title')}>Từ khóa</div>
                                                      <input
                                                            // onChange={handleChangeInput}
                                                            // value={inputSearch}
                                                            type="text"
                                                            placeholder="Nhập từ khóa..."
                                                            className={cx('input-content')}
                                                      />
                                                      <LogoSearch className={cx('logo-arrow')} />
                                                </div>
                                          </div>
                                    </div>

                                    {/* Table Content */}
                                    <div className="table-DetailsServices">
                                          <CustomizeTable
                                                columns={columns}
                                                dataSource={dataSource}
                                                pageSize={pageSize}
                                          />
                                    </div>
                              </div>
                        </div>
                        <CustomizeButton
                              type="Link"
                              title="Cập nhật danh sách"
                              logo={<LogoEdit />}
                              to={`${routesConfig.updateServices.replace('/:id', '')}/${id}`}
                              className={cx('editDevices')}
                        />
                  </div>
            </div>
      );
};
