import { useEffect, useState } from 'react';
import './UpdateDevices.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { State } from '../../../../redux/store';
import { Select } from 'antd';
import { DevicesType } from '../../../propsType/DevicesProps';
import style from './UpdateDevices.module.scss';
import classNames from 'classnames/bind';
import { HeaderContent } from '../../../componentChild/HeaderContent/HeaderContent';
import { getDevices } from '../../../../redux/features/DeviceSlice';
import { LogoArrow } from '../../../../assets/svg/LogoArrow';

const cx = classNames.bind(style);

export const UpdateDevices = () => {
   const [devices, setDevices] = useState<DevicesType | undefined>({} as DevicesType);
   const { id } = useParams();
   const navigate = useNavigate();
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
   const handleClickSubmit = () => {
      const inputID = document.getElementById('inputID') as HTMLInputElement | null;
      const inputKindOfDevices = document.getElementById(
         'inputKindOfDevices',
      ) as HTMLInputElement | null;
      const inputNameDevices = document.getElementById(
         'inputNameDevices',
      ) as HTMLInputElement | null;
      const inputAddressDevices = document.getElementById(
         'inputAddressDevices',
      ) as HTMLInputElement | null;
      alert(
         `ID: ${inputID?.value} - ${inputKindOfDevices?.value} - ${inputNameDevices?.value} - ${inputAddressDevices?.value}`,
      );
   };
   return (
      <div className={cx('wrapper')}>
         <HeaderContent title="Thông tin thiết bị" />
         <div className={cx('table-content')}>
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
                           defaultValue={devices?.deviceId}
                           type="text"
                        />
                     </div>
                     <div className={cx('object')}>
                        <p className={cx('label')}>
                           Loại thiết bị: <span className={cx('required')}>*</span>
                        </p>
                        <div className="wrapper-select-inputKindOfDevices">
                           <Select
                              id="inputKindOfDevices"
                              loading={devices?.deviceName ? false : true}
                              defaultValue={devices?.deviceName || 'Error'}
                              // value={devices?.name}
                              popupClassName="popupClassName"
                           >
                              {dataDevices.dataDevices.map((devices) => {
                                 return (
                                    <Select.Option
                                       key={devices.deviceId}
                                       value={devices.deviceId}
                                    >
                                       {devices.deviceName}
                                    </Select.Option>
                                 );
                              })}
                           </Select>
                           <LogoArrow className="logo-arrow" />
                        </div>
                     </div>
                  </div>
                  <div className={cx('double-object')}>
                     <div className={cx('object')}>
                        <p className={cx('label')}>
                           Tên thiết bị: <span className={cx('required')}>*</span>
                        </p>
                        <input
                           id="inputNameDevices"
                           className={cx('input-field')}
                           defaultValue={devices?.deviceName}
                           type="text"
                        />
                     </div>
                     <div className={cx('object')}>
                        <p className={cx('label')}>
                           Tên đăng nhập: <span className={cx('required')}>*</span>
                        </p>
                        <input
                           id="inputUserName"
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
                           id="inputAddressDevices"
                           className={cx('input-field')}
                           defaultValue={devices?.deviceAddress}
                           type="text"
                        />
                     </div>
                     <div className={cx('object')}>
                        <p className={cx('label')}>
                           Mật khẩu: <span className={cx('required')}>*</span>
                        </p>
                        <input
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
                     <div className="wrapper-select-listUseDevices">
                        <Select
                           mode="multiple"
                           placeholder="Please select"
                           defaultValue={['item 1', 'item 2']}
                        >
                           <Select.Option value="1">Khám răng hàm mặt</Select.Option>
                           <Select.Option value="2">Khám tai mũi họng</Select.Option>
                        </Select>
                     </div>
                  </div>
                  <p className={cx('label')}>
                     <span className={cx('required')}>*</span>
                     <span style={{ color: 'var(--color-gray-300)', marginLeft: '10px' }}>
                        Là trường thông tin bắt buộc
                     </span>
                  </p>
               </div>
            </div>
            <div className={cx('wrapper-btn')}>
               <button
                  onClick={() => navigate(-1)}
                  className={cx('btn', 'btn-btnCancel')}
               >
                  Hủy bỏ
               </button>
               <button
                  onClick={handleClickSubmit}
                  type="submit"
                  className={cx('btn', 'btn-btnUpdate')}
               >
                  Cập nhật
               </button>
            </div>
         </div>
      </div>
   );
};
