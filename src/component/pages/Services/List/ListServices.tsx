import classNames from 'classnames/bind';
import './ListServices.css';
import style from './ListServices.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Select, DatePicker } from 'antd';
import { routesConfig } from '../../../../routes/routeConfig';
import { HeaderContent } from '../../../componentChild/HeaderContent/HeaderContent';
import { LogoArrow } from '../../../../assets/svg/LogoArrow';
import { LogoSearch } from '../../../../assets/svg/LogoSearch';
import { LogoPlus } from '../../../../assets/svg/LogoPlus';
import { DevicesType } from '../../../propsType/DevicesProps';
import { useDispatch, useSelector } from 'react-redux';
import { getDevices } from '../../../../redux/features/DeviceSlice';
import useDebounce from '../../../../Hooks/useDebound';
import { LinkAction } from '../../../componentChild/LinkAction/LinkAction';
import { CustomizeTable } from '../../../componentChild/CustomizeTable/CustomizeTable';
import { State } from '../../../../redux/store';

const cx = classNames.bind(style);

const columns: any = [
      {
            title: 'Mã dịch vụ',
            dataIndex: 'id',
      },
      {
            title: 'Tên dịch vụ',
            dataIndex: 'name',
      },
      {
            title: 'Mô tả',
            dataIndex: 'name',
      },
      {
            title: 'Trạng thái hoạt động',
            dataIndex: 'isActive',
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
      {
            title: '',
            dataIndex: 'detailsAction',
            render: (data: string) => {
                  return (
                        <>
                              <Link
                                    className="text-underline"
                                    to={`${routesConfig.detailsServices.replace('/:id', '')}/${data.replace(
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
      {
            title: '',
            dataIndex: 'updateAction',
            render: (data: string) => {
                  return (
                        <>
                              <Link
                                    className="text-underline"
                                    to={`${routesConfig.updateServices.replace('/:id', '')}/${data.replace(
                                          'Cập nhật',
                                          '',
                                    )}`}
                              >
                                    Cập nhật
                              </Link>
                        </>
                  );
            },
      },
];

export const ListServices = () => {
      const dispatch = useDispatch<any>();
      const [dataSource, setDataSource] = useState<DevicesType[] | []>([]);
      const [inputSearch, setInputSearch] = useState<string>('');
      const data = useSelector((state: State) => state.device);
      const dataRef = useRef<DevicesType[] | []>([]);
      
      useEffect(() => {
            var arr = data.dataDevices.map((device: DevicesType) => {
                  return {
                        ...device,
                        detailsAction: `Chi tiết${device.id}`,
                        updateAction: `Cập nhật${device.id}`,
                  };
            });
            dataRef.current = arr;
            setDataSource(arr);
      }, [dispatch]);

      const handleChangeSelect = (value: string) => {
            if (value === 'all') {
                  setDataSource(dataRef.current);
            } else {
                  const booleanValue = value.replace('stateActive/', '') === 'active' ? true : false;
                  setDataSource(dataRef.current.filter((active) => active.isActive === booleanValue));
            }
      };

      const debouncedValue = useDebounce(inputSearch, 500);
      useEffect(() => {
            setDataSource(
                  dataRef.current.filter((key) =>
                        key.name.toString().toLowerCase().includes(debouncedValue.toLowerCase()),
                  ),
            );
      }, [debouncedValue]);

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
                  <HeaderContent title="Danh sách thiết bị" />
                  <div className={cx('listSelect')}>
                        <div className={cx('select', 'selectActive')}>
                              <div>
                                    <h3 className={cx('title')}>Trạng thái hoạt động</h3>
                                    <Select defaultValue="all" onSelect={handleChangeSelect}>
                                          <Select.Option value="all">Tất cả</Select.Option>
                                          <Select.Option value="stateActive/active">Hoạt động</Select.Option>
                                          <Select.Option value="stateActive/stop">Ngưng hoạt động</Select.Option>
                                    </Select>
                                    <LogoArrow className={cx('logo-arrow')} />
                              </div>
                        </div>
                        <div className={cx('select')}>
                              <h3 className={cx('title')}>Chọn thời gian</h3>
                              <div className="selectDateGroup">
                                    <DatePicker
                                          className="selectDate"
                                          // defaultValue={moment(moment().format('DD/MM/YYYY'), 'DD/MM/YYYY')}
                                          format={dateFormatList}
                                          popupClassName="popup-date"
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
                  <div className={cx('table-services')}>
                        <CustomizeTable columns={columns} dataSource={dataSource} pageSize={pageSize} />
                        <LinkAction title="Thêm dịch vụ" to={routesConfig.addServices} logo={<LogoPlus />} />
                  </div>
            </div>
      );
};
