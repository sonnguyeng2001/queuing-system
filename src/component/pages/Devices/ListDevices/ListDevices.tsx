import './ListDevices.css';
import { Link } from 'react-router-dom';
import { routesConfig } from '../../../../routes/routeConfig';
import style from './ListDevices.module.scss';
import classNames from 'classnames/bind';
import { HeaderContent } from '../../../componentChild/HeaderContent/HeaderContent';
import { Table, Select, Pagination } from 'antd';
import { LogoArrow } from '../../../../assets/svg/LogoArrow';
import { LogoSearch } from '../../../../assets/svg/LogoSearch';
import { LogoPlus } from '../../../../assets/svg/LogoPlus';
import { useState } from 'react';
import { DevicesType } from '../../../propsType/DevicesProps';

const cx = classNames.bind(style);
const data: DevicesType[] = [
   {
      key: '1',
      id: 'KIO_01',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: false,
      statusConnect: true,
      useDevices: 'Khám tim mạch, Khám mắt Khám tim mạch, Khám mắt',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '2',
      id: 'KIO_02',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },

   {
      key: '3',
      id: 'KIO_03',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: false,
      statusConnect: true,
      useDevices: 'Khám tim mạch, Khám mắt Khám tim mạch, Khám mắt',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '4',
      id: 'KIO_04',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '5',
      id: 'KIO_05',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: false,
      statusConnect: true,
      useDevices: 'Khám tim mạch, Khám mắt Khám tim mạch, Khám mắt',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '6',
      id: 'KIO_06',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '7',
      id: 'KIO_07',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '8',
      id: 'KIO_08',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '1',
      id: 'KIO_01',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: false,
      statusConnect: true,
      useDevices: 'Khám tim mạch, Khám mắt Khám tim mạch, Khám mắt',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '2',
      id: 'KIO_02',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },

   {
      key: '3',
      id: 'KIO_03',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: false,
      statusConnect: true,
      useDevices: 'Khám tim mạch, Khám mắt Khám tim mạch, Khám mắt',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '4',
      id: 'KIO_04',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '5',
      id: 'KIO_05',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: false,
      statusConnect: true,
      useDevices: 'Khám tim mạch, Khám mắt Khám tim mạch, Khám mắt',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '6',
      id: 'KIO_06',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '7',
      id: 'KIO_07',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '8',
      id: 'KIO_08',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '1',
      id: 'KIO_01',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: false,
      statusConnect: true,
      useDevices: 'Khám tim mạch, Khám mắt Khám tim mạch, Khám mắt',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '2',
      id: 'KIO_02',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },

   {
      key: '3',
      id: 'KIO_03',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: false,
      statusConnect: true,
      useDevices: 'Khám tim mạch, Khám mắt Khám tim mạch, Khám mắt',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '4',
      id: 'KIO_04',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '5',
      id: 'KIO_05',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: false,
      statusConnect: true,
      useDevices: 'Khám tim mạch, Khám mắt Khám tim mạch, Khám mắt',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '6',
      id: 'KIO_06',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '7',
      id: 'KIO_07',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '8',
      id: 'KIO_08',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '1',
      id: 'KIO_01',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: false,
      statusConnect: true,
      useDevices: 'Khám tim mạch, Khám mắt Khám tim mạch, Khám mắt',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '2',
      id: 'KIO_02',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },

   {
      key: '3',
      id: 'KIO_03',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: false,
      statusConnect: true,
      useDevices: 'Khám tim mạch, Khám mắt Khám tim mạch, Khám mắt',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '4',
      id: 'KIO_04',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '5',
      id: 'KIO_05',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: false,
      statusConnect: true,
      useDevices: 'Khám tim mạch, Khám mắt Khám tim mạch, Khám mắt',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '6',
      id: 'KIO_06',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '7',
      id: 'KIO_07',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '8',
      id: 'KIO_08',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '1',
      id: 'KIO_01',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: false,
      statusConnect: true,
      useDevices: 'Khám tim mạch, Khám mắt Khám tim mạch, Khám mắt',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '2',
      id: 'KIO_02',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },

   {
      key: '3',
      id: 'KIO_03',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: false,
      statusConnect: true,
      useDevices: 'Khám tim mạch, Khám mắt Khám tim mạch, Khám mắt',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '4',
      id: 'KIO_04',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '5',
      id: 'KIO_05',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: false,
      statusConnect: true,
      useDevices: 'Khám tim mạch, Khám mắt Khám tim mạch, Khám mắt',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '6',
      id: 'KIO_06',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '7',
      id: 'KIO_07',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '8',
      id: 'KIO_08',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '1',
      id: 'KIO_01',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: false,
      statusConnect: true,
      useDevices: 'Khám tim mạch, Khám mắt Khám tim mạch, Khám mắt',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '2',
      id: 'KIO_02',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },

   {
      key: '3',
      id: 'KIO_03',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: false,
      statusConnect: true,
      useDevices: 'Khám tim mạch, Khám mắt Khám tim mạch, Khám mắt',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '4',
      id: 'KIO_04',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '5',
      id: 'KIO_05',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: false,
      statusConnect: true,
      useDevices: 'Khám tim mạch, Khám mắt Khám tim mạch, Khám mắt',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '6',
      id: 'KIO_06',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '7',
      id: 'KIO_07',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '8',
      id: 'KIO_08',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '1',
      id: 'KIO_01',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: false,
      statusConnect: true,
      useDevices: 'Khám tim mạch, Khám mắt Khám tim mạch, Khám mắt',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '2',
      id: 'KIO_02',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },

   {
      key: '3',
      id: 'KIO_03',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: false,
      statusConnect: true,
      useDevices: 'Khám tim mạch, Khám mắt Khám tim mạch, Khám mắt',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '4',
      id: 'KIO_04',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '5',
      id: 'KIO_05',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: false,
      statusConnect: true,
      useDevices: 'Khám tim mạch, Khám mắt Khám tim mạch, Khám mắt',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '6',
      id: 'KIO_06',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '7',
      id: 'KIO_07',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
   {
      key: '8',
      id: 'KIO_08',
      name: 'Kiosk',
      address: '192.1681.1.10',
      statusActive: true,
      statusConnect: false,
      useDevices: 'Khám tim mạch, Khám mắt ',
      details: 'Chi tiết',
      update: 'Cập nhật',
   },
];

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
      dataIndex: 'statusConnect',
      render: (status: boolean) => {
         return status ? (
            <>
               <span style={{ color: 'var(--color-green)', marginRight: '10px' }}>&#9679;</span>
               <span> Kết nối</span>
            </>
         ) : (
            <>
               <span style={{ color: 'var(--color-red)', marginRight: '10px' }}>&#9679;</span>
               <span> Ngưng kết nối</span>
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
               <Link className="text-underline" to="/">
                  Xem thêm
               </Link>
            </>
         );
      },
   },
   {
      title: '',
      dataIndex: 'details',
      render: (data: string) => {
         return (
            <>
               <Link className="text-underline" to="/">
                  {data}
               </Link>
            </>
         );
      },
   },
   {
      title: '',
      dataIndex: 'update',
      render: (data: string) => {
         return (
            <>
               <Link className="text-underline" to="/">
                  {data}
               </Link>
            </>
         );
      },
   },
];

export const ListDevices = () => {
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [dataSource, setDataSource] = useState<DevicesType[] | []>(data);
   const getData = (current: number, pageSize: number) => {
      return dataSource.slice((current - 1) * pageSize, current * pageSize);
   };

   const handleChangeActive = (value: string) => {
      const booleanValue: boolean = value === 'active' ? true : false;
      setDataSource(dataSource.filter((active) => active.statusActive === booleanValue ))
   };

   const handleChangeConnect = (value: string) => {
      alert(value);
   };

   const pageSize = 6;
   return (
      <div className={cx('wrapper')}>
         <HeaderContent title="Danh sách thiết bị" />
         <div className={cx('listSelect')}>
            <div className={cx('select', 'selectActive')}>
               <div>
                  <h3 className={cx('title')}>Trạng thái hoạt động</h3>
                  <Select defaultValue="all" onSelect={handleChangeActive}>
                     <Select.Option value="all">Tất cả</Select.Option>
                     <Select.Option value="active">Hoạt động</Select.Option>
                     <Select.Option value="stop">Ngưng hoạt động</Select.Option>
                  </Select>
                  <LogoArrow className={cx('logo-arrow')} />
               </div>
            </div>
            <div className={cx('select', 'selectConnect')}>
               <div>
                  <h3 className={cx('title')}>Trạng thái kết nối</h3>
                  <Select defaultValue="all" onSelect={handleChangeConnect}>
                     <Select.Option value="all">Tất cả</Select.Option>
                     <Select.Option value="connected">Kết nối</Select.Option>
                     <Select.Option value="disconnected">Mất kết nối</Select.Option>
                  </Select>
                  <LogoArrow className={cx('logo-arrow')} />
               </div>
            </div>
            <div className={cx('select', 'search')}>
               <div>
                  <div className={cx('title')}>Từ khóa</div>
                  <input type="text" placeholder="Nhập từ khóa..." className={cx('content')} />
                  <LogoSearch className={cx('logo-arrow')} />
               </div>
            </div>
         </div>

         <Table
            columns={columns}
            bordered
            dataSource={getData(currentPage, pageSize)}
            pagination={false}
         />
         <Pagination
            total={dataSource?.length}
            current={currentPage}
            pageSize={pageSize}
            onChange={setCurrentPage}
         />

         <Link to={routesConfig.addDevices} className={cx('addDevices')}>
            <LogoPlus />
            <p>Thêm thiết bị</p>
         </Link>
      </div>
   );
};
