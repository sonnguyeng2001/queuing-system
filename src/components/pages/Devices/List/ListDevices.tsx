import './ListDevices.css';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import style from './ListDevices.module.scss';
import classNames from 'classnames/bind';
import { Select, Popover } from 'antd';
import { routesConfig } from '../../../../routes/routeConfig';
import { HeaderContent } from '../../../componentChild/HeaderContent/HeaderContent';
import { LogoArrow } from '../../../../assets/svg/LogoArrow';
import { LogoSearch } from '../../../../assets/svg/LogoSearch';
import { LogoPlus } from '../../../../assets/svg/LogoPlus';
import { DevicesType } from '../../../propsType/DevicesProps';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../../../../Hooks/useDebound';
import { LinkAction } from '../../../componentChild/LinkAction/LinkAction';
import { CustomizeTable } from '../../../componentChild/CustomizeTable/CustomizeTable';
import { State } from '../../../../redux/store';

const cx = classNames.bind(style);

const columns: any = [
      {
            title: 'Mã thiết bị',
            dataIndex: 'id',
      },
      {
            title: 'Tên thiết bị',
            dataIndex: 'name',
      },
      {
            title: 'Địa chỉ IP',
            dataIndex: 'ipAddress',
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
            title: 'Trạng thái kết nối',
            dataIndex: 'isConnected',
            render: (status: boolean) => {
                  return status ? (
                        <>
                              <span style={{ color: 'var(--color-green)', marginRight: '10px' }}>&#9679;</span>
                              <span> Kết nối</span>
                        </>
                  ) : (
                        <>
                              <span style={{ color: 'var(--color-red)', marginRight: '10px' }}>&#9679;</span>
                              <span> Mất kết nối</span>
                        </>
                  );
            },
      },
      {
            title: 'Dịch vụ sử dụng',
            dataIndex: 'used',
            render: (data: string[] | []) => {
                  return (
                        <>
                              <div className="text-devices">{data.join(', ')}</div>
                              <Popover className="popover" content={data.join(', ')} trigger="click">
                                    <p className="text-underline">Xem thêm</p>
                              </Popover>
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
      {
            title: '',
            dataIndex: 'updateAction',
            render: (data: string) => {
                  return (
                        <>
                              <Link
                                    className="text-underline"
                                    to={`${routesConfig.updateDevices.replace('/:id', '')}/${data.replace(
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

export const ListDevices = () => {
      const [dataSource, setDataSource] = useState<DevicesType[] | []>([]);
      const data = useSelector((state: State) => state.device);
      const [inputSearch, setInputSearch] = useState<string>('');
      const dataRef = useRef<DevicesType[] | []>([]);

      useEffect(() => {
            var arr = data.dataDevices.map((device: DevicesType) => {
                  return {
                        ...device,
                        detailsAction: `Chi tiết${device?.id}`,
                        updateAction: `Cập nhật${device?.id}`,
                  };
            });
            dataRef.current = arr;
            setDataSource(arr);
      }, [data.dataDevices]);

      const handleChangeSelect = (value: string) => {
            if (value === 'all') {
                  setDataSource(dataRef.current);
            } else {
                  if (value.startsWith('stateActive/')) {
                        const booleanValue = value.replace('stateActive/', '') === 'active' ? true : false;
                        setDataSource(dataRef.current.filter((active) => active.isActive === booleanValue));
                  } else if (value.startsWith('stateConnect/')) {
                        const booleanValue = value.replace('stateConnect/', '') === 'connected' ? true : false;
                        setDataSource(dataRef.current.filter((active) => active.isConnected === booleanValue));
                  }
            }
      };

      const debouncedValue = useDebounce(inputSearch, 500);
      useEffect(() => {
            setDataSource(
                  dataRef.current.filter((key) => key.name.toLowerCase().includes(debouncedValue.toLowerCase())),
            );
      }, [debouncedValue]);

      const handleChangeInput = (e: any) => {
            const searchValue = e.target.value;
            if (!searchValue.startsWith(' ')) {
                  setInputSearch(e.target.value);
            }
      };

      const pageSize = 5;
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
                        <div className={cx('select', 'selectConnect')}>
                              <div>
                                    <h3 className={cx('title')}>Trạng thái kết nối</h3>
                                    <Select defaultValue="all" onSelect={handleChangeSelect}>
                                          <Select.Option value="all">Tất cả</Select.Option>
                                          <Select.Option value="stateConnect/connected">Kết nối</Select.Option>
                                          <Select.Option value="stateConnect/disconnected">Mất kết nối</Select.Option>
                                    </Select>
                                    <LogoArrow className={cx('logo-arrow')} />
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
                  <div className={cx('tableDevice')}>
                        <CustomizeTable columns={columns} dataSource={dataSource} pageSize={pageSize} />

                        <LinkAction title="Thêm thiết bị" to={routesConfig.addDevices} logo={<LogoPlus />} />
                  </div>
            </div>
      );
};
