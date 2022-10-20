import { useEffect, useState } from 'react';
import './UpdateDevices.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { State } from '../../../../redux/store';
import { privateRoutes } from '../../../../routes';
import { routesConfig } from '../../../../routes/routeConfig';
import { DevicesType } from '../../../propsType/DevicesProps';
import style from './UpdateDevices.module.scss';
import classNames from 'classnames/bind';
import { HeaderContent } from '../../../componentChild/HeaderContent/HeaderContent';
import { Select } from 'antd';
import { getDevices } from '../../../../redux/features/DeviceSlice';

const cx = classNames.bind(style);

export const UpdateDevices = () => {
   const [devices, setDevices] = useState<DevicesType | undefined>({} as DevicesType);
   const { id } = useParams();
   const dispatch = useDispatch<any>();
   const dataDevices = useSelector((state: State) => state.device);

   const fetchData = async () => {
      const response = await dispatch(getDevices());
      var infoDevices = await response.payload.find((device: DevicesType) => {
         return device?.id === id && device;
      });
      return infoDevices;
   };
   useEffect(() => {
      if (dataDevices.dataDevices.length > 0) {
         var infoDevices = dataDevices.dataDevices.find((device: DevicesType) => {
            return device?.id === id && device;
         });
         setDevices(infoDevices);
      } else {
         fetchData().then((data) => {
            setDevices(data);
         });
      }
   }, []);
   const handleClick = () => {
      const inputID = document.getElementById('inputID') as HTMLInputElement | null;
   };
   return (
      <div className={cx('wrapper')}>
         <HeaderContent title="Thông tin thiết bị" />
         <div className={cx('table-content')}>
            <button onClick={handleClick}>Click me</button>
            <div className={cx('content')}>
               <header className={cx('header-content')}>Thông tin thiết bị</header>
               <div className={cx('info-devices')}>
                  <div className={cx('double-object')}>
                     <div className={cx('object')}>
                        <p className={cx('label')}>
                           Mã thiết bị: <span className={cx('required')}>*</span>
                        </p>
                        <input
                           id="inputID"
                           className={cx('input-field')}
                           defaultValue={devices?.id}
                           type="text"
                        />
                     </div>
                     <div className={cx('object')}>
                        <p className={cx('label')}>
                           Loại thiết bị: <span className={cx('required')}>*</span>
                        </p>
                        <input
                           id="inputID"
                           className={cx('input-field')}
                           defaultValue={devices?.name}
                           type="text"
                        />
                     </div>
                  </div>
                  <div className={cx('double-object')}>
                     <div className={cx('object')}>
                        <p className={cx('label')}>
                           Tên thiết bị: <span className={cx('required')}>*</span>
                        </p>
                        <input
                           id="inputID"
                           className={cx('input-field')}
                           defaultValue={devices?.name}
                           type="text"
                        />
                     </div>
                     <div className={cx('object')}>
                        <p className={cx('label')}>
                           Tên đăng nhập: <span className={cx('required')}>*</span>
                        </p>
                        <input
                           id="inputID"
                           className={cx('input-field')}
                           defaultValue="LinhKyo011"
                           type="text"
                        />
                     </div>
                  </div>
                  <div className={cx('double-object')}>
                     <div className={cx('object')}>
                        <p className={cx('label')}>
                           Địa chỉ IP: <span className={cx('required')}>*</span>
                        </p>
                        <input
                           id="inputID"
                           className={cx('input-field')}
                           defaultValue={devices?.address}
                           type="text"
                        />
                     </div>
                     <div className={cx('object')}>
                        <p className={cx('label')}>
                           Mật khẩu: <span className={cx('required')}>*</span>
                        </p>
                        <input
                           id="inputID"
                           className={cx('input-field')}
                           defaultValue="CMS"
                           type="text"
                        />
                     </div>
                  </div>

                  <div className={cx('object')}>
                     <p className={cx('label')}>
                        Dịch vụ sử dụng <span className={cx('required')}>*</span>
                     </p>
                     <Select
                        mode="multiple"
                        placeholder="Please select"
                        defaultValue={['item 1', 'item 2']}
                     >
                        <Select.Option value="1">Hello</Select.Option>
                        <Select.Option value="2">Hello123</Select.Option>
                        <Select.Option value="3">Hello456</Select.Option>
                        <Select.Option value="4">
                           Hello456dasdasdasdasdasdsa
                        </Select.Option>
                        <Select.Option value="9">
                           Hello45dasdasdasdasdasdadasdasdasdasdasdasd6
                        </Select.Option>
                        <Select.Option value="8">
                           Hello45dasdasdasdasdasdasdadasdasdasdas6
                        </Select.Option>
                        <Select.Option value="3">
                           asdasdasdasdasdasdasdasdasdasdasdsad
                        </Select.Option>
                     </Select>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
