import './ListDevices.css';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import style from './ListDevices.module.scss';
import classNames from 'classnames/bind';
import { Table, Select, Pagination, Popover } from 'antd';
import { routesConfig } from '../../../../routes/routeConfig';
import { HeaderContent } from '../../../componentChild/HeaderContent/HeaderContent';
import { LogoArrow } from '../../../../assets/svg/LogoArrow';
import { LogoSearch } from '../../../../assets/svg/LogoSearch';
import { LogoPlus } from '../../../../assets/svg/LogoPlus';
import { DevicesType } from '../../../propsType/DevicesProps';
import { useDispatch } from 'react-redux';
import { getDevices } from '../../../../redux/features/DeviceSlice';
import useDebounce from '../../../../Hooks/useDebound';
import { LinkAction } from '../../../componentChild/LinkAction/LinkAction';

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
      dataIndex: 'address',
   },
   {
      title: 'Trạng thái hoạt động',
      dataIndex: 'statusActive',
      render: (status: boolean) => {
         return status ? (
            <>
               <span style={{ color: 'var(--color-green)', marginRight: '10px' }}>
                  &#9679;
               </span>
               <span> Hoạt động</span>
            </>
         ) : (
            <>
               <span style={{ color: 'var(--color-red)', marginRight: '10px' }}>
                  &#9679;
               </span>
               <span> Ngưng hoạt động</span>
            </>
         );
      },
   },
   {
      title: 'Trạng thái kết nối',
      dataIndex: 'statusConnect',
      render: (status: boolean) => {
         return status ? (
            <>
               <span style={{ color: 'var(--color-green)', marginRight: '10px' }}>
                  &#9679;
               </span>
               <span> Kết nối</span>
            </>
         ) : (
            <>
               <span style={{ color: 'var(--color-red)', marginRight: '10px' }}>
                  &#9679;
               </span>
               <span> Mất kết nối</span>
            </>
         );
      },
   },
   {
      title: 'Dịch vụ sử dụng',
      dataIndex: 'useDevices',
      render: (data: string) => {
         return (
            <>
               <div className="text-devices">{data}</div>
               <Popover className="popover" content={data} trigger="click">
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
   const dispatch = useDispatch<any>();
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [dataSource, setDataSource] = useState<DevicesType[] | []>([]);
   const [inputSearch, setInputSearch] = useState<string>('');
   const dataRef = useRef<DevicesType[] | []>([]);

   const fetchData = async () => {
      const response = await dispatch(getDevices());
      var arr = await response.payload.map((device: DevicesType) => {
         return {
            ...device,
            detailsAction: `Chi tiết${device.id}`,
            updateAction: `Cập nhật${device.id}`,
         };
      });
      return arr;
   };
   useEffect(() => {
      fetchData().then((data) => {
         dataRef.current = data;
         setDataSource(data);
      });
   }, [dispatch]);

   const getData = (current: number, pageSize: number) => {
      return dataSource.slice((current - 1) * pageSize, current * pageSize);
   };

   const handleChangeSelect = (value: string) => {
      if (value === 'all') {
         setDataSource(dataRef.current);
      } else {
         if (value.startsWith('stateActive/')) {
            const booleanValue =
               value.replace('stateActive/', '') === 'active' ? true : false;
            setDataSource(
               dataRef.current.filter((active) => active.statusActive === booleanValue),
            );
         } else if (value.startsWith('stateConnect/')) {
            const booleanValue =
               value.replace('stateConnect/', '') === 'connected' ? true : false;
            setDataSource(
               dataRef.current.filter((active) => active.statusConnect === booleanValue),
            );
         }
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

   const pageSize = 6;
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
                     <Select.Option value="stateActive/stop">
                        Ngưng hoạt động
                     </Select.Option>
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
                     <Select.Option value="stateConnect/disconnected">
                        Mất kết nối
                     </Select.Option>
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
         <div className={cx('table-content')}>
            <Table
               columns={columns}
               bordered
               dataSource={getData(currentPage, pageSize)}
               pagination={false}
               loading={dataSource.length ? false : true}
            />
            <Pagination
               total={dataSource?.length}
               current={currentPage}
               pageSize={pageSize}
               onChange={setCurrentPage}
            />

            <LinkAction
               title="Thêm thiết bị"
               to={routesConfig.addDevices}
               logo={<LogoPlus />}
            />
         </div>
      </div>
   );
};
