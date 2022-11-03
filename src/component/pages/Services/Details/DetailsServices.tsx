import './DetailsServices.css';
import { Link, useParams } from 'react-router-dom';
import { routesConfig } from '../../../../routes/routeConfig';
import style from './DetailsServices.module.scss';
import classNames from 'classnames/bind';
import { HeaderContent } from '../../../componentChild/HeaderContent/HeaderContent';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../../../redux/store';
import { useEffect, useState, useRef } from 'react';
import { DevicesType } from '../../../propsType/DevicesProps';
import { LinkAction } from '../../../componentChild/LinkAction/LinkAction';
import { LogoEdit } from '../../../../assets/svg/LogoEdit';
import { getDevices } from '../../../../redux/features/DeviceSlice';
import { LogoSearch } from '../../../../assets/svg/LogoSearch';
import { DatePicker, Select } from 'antd';
import { LogoArrow } from '../../../../assets/svg/LogoArrow';
import moment from 'moment';
import { CustomizeTable } from '../../../componentChild/CustomizeTable/CustomizeTable';
const cx = classNames.bind(style);

const columns: any = [
      {
            title: 'Số thứ tự',
            dataIndex: 'key',
      },

      {
            title: 'Trạng thái',
            dataIndex: 'deviceActive',
            render: (status: boolean) => {
                  return status ? (
                        <>
                              <span style={{ color: 'var(--color-green)', marginRight: '10px' }}>&#9679;</span>
                              <span> Hoạt động</span>
                        </>
                  ) : (
                        <>
                              <span style={{ color: 'var(--color-red)', marginRight: '10px' }}>&#9679;</span>
                              <span> Ngưng hoạt động</span>
                        </>
                  );
            },
      },
];

export const DetailsServices = () => {
      const [devices, setDevices] = useState<DevicesType | undefined>({} as DevicesType);
      const { id } = useParams();
      const data = useSelector((state: State) => state.device);
      const [dataSource, setDataSource] = useState<DevicesType[] | []>([]);
      const dataRef = useRef<DevicesType[] | []>([]);

      useEffect(() => {
            const infoDevices = data.dataDevices.find((device: DevicesType) => {
                  return device?.id === id && device;
            });
            setDevices(infoDevices);
            setDataSource(data.dataDevices);
            dataRef.current = data.dataDevices;
      }, []);

      const handleChangeSelect = (value: string) => {
            if (value === 'all') {
                  setDataSource(dataRef.current);
            } else {
                  const booleanValue = value.replace('stateActive/', '') === 'active' ? true : false;
                  setDataSource(dataRef.current.filter((active) => active.isActive === booleanValue));
            }
      };

      const pageSize = 6;
      const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
      return (
            <div className={cx('wrapper')}>
                  <HeaderContent title="Quản lý dịch vụ" />
                  <div className={cx('content-wrapper')}>
                        <div className={cx('content')}>
                              <div className={cx('content-left')}>
                                    <header className={cx('header-content')}>Thông tin dịch vụ</header>
                                    <div className={cx('object')}>
                                          <span className={cx('key')}>Mã dịch vụ:</span>
                                          <span className={cx('value')}>{devices?.id}</span>
                                    </div>
                                    <div className={cx('object')}>
                                          <span className={cx('key')}>Tên dịch vụ:</span>
                                          <span className={cx('value')}>{devices?.name}</span>
                                    </div>
                                    <div className={cx('object')}>
                                          <span className={cx('key')}>Mô tả dịch vụ:</span>
                                          <span className={cx('value')}>{devices?.ipAddress}</span>
                                    </div>
                                    {/* --------------------------------------------------------------------------------------------------- */}
                                    <br />
                                    <br />
                                    <br />
                                    <header className={cx('header-content')}>Quy tắc cấp số</header>
                                    <div className={cx('object')}>
                                          <span className={cx('key')}>Tăng tự động:</span>
                                          <span className={cx('value')}>
                                                {' '}
                                                <span className={cx('text-special')}>0001</span>
                                                &nbsp; đến &nbsp;
                                                <span className={cx('text-special')}>9999</span>
                                          </span>
                                    </div>
                                    <div className={cx('object')} style={{ margin: '16px 0px' }}>
                                          <span className={cx('key')}>Prefix:</span>
                                          <span className={cx('value')}>
                                                <span className={cx('text-special')}>0001</span>
                                          </span>
                                    </div>
                                    <div className={cx('object')}>
                                          <span className={cx('key')}>Reset mỗi ngày:</span>
                                    </div>
                                    <div className={cx('object')}>
                                          <span className={cx('value')}>Ví dụ: 201 - 2001</span>
                                    </div>
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
                                                            <Select.Option value="stateActive/active">
                                                                  Hoạt động
                                                            </Select.Option>
                                                            <Select.Option value="stateActive/stop">
                                                                  Ngưng hoạt động
                                                            </Select.Option>
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
                                                      />
                                                      <LogoArrow className="selectDate-logoArrow" />
                                                      <DatePicker
                                                            className="selectDate"
                                                            format={dateFormatList}
                                                            placeholder="Đến ngày"
                                                            popupClassName="popup-date"
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
                        <LinkAction
                              title="Cập nhật danh sách"
                              logo={<LogoEdit />}
                              to={`${routesConfig.updateServices.replace('/:id', '')}/${id}`}
                              className={cx('editDevices')}
                        />
                  </div>
            </div>
      );
};
