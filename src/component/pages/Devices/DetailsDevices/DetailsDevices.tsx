import { Link, useParams } from 'react-router-dom';
import { routesConfig } from '../../../../routes/routeConfig';
import style from './DetailsDevices.module.scss';
import classNames from 'classnames/bind';
import { HeaderContent } from '../../../componentChild/HeaderContent/HeaderContent';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../../../redux/store';
import { useEffect, useState } from 'react';
import { DevicesType } from '../../../propsType/DevicesProps';
import { LinkAction } from '../../../componentChild/LinkAction/LinkAction';
import { LogoEdit } from '../../../../assets/svg/LogoEdit';
import { getDevices } from '../../../../redux/features/DeviceSlice';

const cx = classNames.bind(style);

export const DetailsDevices = () => {
   const [devices, setDevices] = useState<DevicesType | undefined>({} as DevicesType);
   const { id } = useParams();
   const dispatch = useDispatch<any>();
   const dataDevices = useSelector((state: State) => state.device);

   const fetchData = async () => {
      const response = await dispatch(getDevices());
      var infoDevices = await response.payload.find((device: DevicesType) => {
         return device?.deviceId === id && device;
      });
      return infoDevices;
   };
   useEffect(() => {
      if (dataDevices.dataDevices.length > 0) {
         var infoDevices = dataDevices.dataDevices.find((device: DevicesType) => {
            return device?.deviceId === id && device;
         });
         setDevices(infoDevices);
      } else {
         fetchData().then((data) => {
            setDevices(data);
         });
      }
   }, []);

   return (
      <div className={cx('wrapper')}>
         <HeaderContent title="Quản lý thiết bị" />
         <div className={cx('table-content')}>
            <div className={cx('content')}>
               <header className={cx('header-content')}>Thông tin thiết bị</header>
               <div className={cx('info-devices')}>
                  <div className={cx('double-object')}>
                     <div className={cx('object')}>
                        <span className={cx('key')}>Mã thiết bị:</span>
                        <span className={cx('value')}>{devices?.deviceId}</span>
                     </div>
                     <div className={cx('object')}>
                        <span className={cx('key')}>Loại thiết bị:</span>
                        <span className={cx('value')}>{devices?.deviceName}</span>
                     </div>
                  </div>
                  <div className={cx('double-object')}>
                     <div className={cx('object')}>
                        <span className={cx('key')}>Tên thiết bị:</span>
                        <span className={cx('value')}>{devices?.deviceName}</span>
                     </div>
                     <div className={cx('object')}>
                        <span className={cx('key')}>Tên đăng nhập:</span>
                        <span className={cx('value')}>Linhkyo011</span>
                     </div>
                  </div>
                  <div className={cx('double-object')}>
                     <div className={cx('object')}>
                        <span className={cx('key')}>Địa chỉ IP:</span>
                        <span className={cx('value')}>{devices?.deviceAddress}</span>
                     </div>
                     <div className={cx('object')}>
                        <span className={cx('key')}>Mật khẩu:</span>
                        <span className={cx('value')}>CMS</span>
                     </div>
                  </div>

                  <div className={cx('object')}>
                     <p className={cx('key')}>Dịch vụ sử dụng</p>
                     <p className={cx('value')}>{devices?.deviceUsed}</p>
                  </div>
               </div>
            </div>
            <LinkAction
               title="Cập nhật thiết bị"
               logo={<LogoEdit />}
               to={`${routesConfig.updateDevices.replace('/:id', '')}/${id}`}
               className={cx('editDevices')}
            />
         </div>
      </div>
   );
};
