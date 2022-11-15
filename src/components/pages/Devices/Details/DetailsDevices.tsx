import { useParams } from 'react-router-dom';
import { routesConfig } from '../../../../routes/routeConfig';
import style from './DetailsDevices.module.scss';
import classNames from 'classnames/bind';
import { HeaderContent } from '../../../componentChild/HeaderContent/HeaderContent';
import { useSelector } from 'react-redux';
import { State } from '../../../../redux/store';
import { useEffect, useState } from 'react';
import { DevicesType } from '../../../propsType/DevicesProps';
import { LinkAction } from '../../../componentChild/LinkAction/LinkAction';
import { LogoEdit } from '../../../../assets/svg/LogoEdit';
import { ServiceType } from '../../../propsType/ServiceProps';

const cx = classNames.bind(style);

export const DetailsDevices = () => {
      const [devices, setDevices] = useState<DevicesType | undefined>({} as DevicesType);
      const { id } = useParams();
      const dataDevices = useSelector((state: State) => state.device);
      const dataService = useSelector((state: State) => state.service);

      useEffect(() => {
            var infoDevice = dataDevices.dataDevices.find((device: DevicesType) => {
                  return device?.id === id && device;
            });
            setDevices(infoDevice);
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
                                                <span className={cx('value')}>{devices?.id}</span>
                                          </div>
                                          <div className={cx('object')}>
                                                <span className={cx('key')}>Loại thiết bị:</span>
                                                <span className={cx('value')}>{devices?.category}</span>
                                          </div>
                                    </div>
                                    <div className={cx('double-object')}>
                                          <div className={cx('object')}>
                                                <span className={cx('key')}>Tên thiết bị:</span>
                                                <span className={cx('value')}>{devices?.name}</span>
                                          </div>
                                          <div className={cx('object')}>
                                                <span className={cx('key')}>Tên đăng nhập:</span>
                                                <span className={cx('value')}>{devices?.userName}</span>
                                          </div>
                                    </div>
                                    <div className={cx('double-object')}>
                                          <div className={cx('object')}>
                                                <span className={cx('key')}>Địa chỉ IP:</span>
                                                <span className={cx('value')}>{devices?.ipAddress}</span>
                                          </div>
                                          <div className={cx('object')}>
                                                <span className={cx('key')}>Mật khẩu:</span>
                                                <span className={cx('value')}>{devices?.password}</span>
                                          </div>
                                    </div>

                                    <div className={cx('object')}>
                                          <p className={cx('key')}>Dịch vụ sử dụng</p>
                                          <p className={cx('value')}>
                                                {devices?.used &&
                                                      devices?.used.map((value, index) => {
                                                            return dataService.dataServices.map(
                                                                  (service: ServiceType) =>
                                                                        value === service.id && (
                                                                              <span key={index}>
                                                                                    {service.name}
                                                                                    {index !==
                                                                                          devices.used.length - 1 && (
                                                                                          <span>, &nbsp;</span>
                                                                                    )}
                                                                              </span>
                                                                        ),
                                                            );
                                                                  
                                                      })}
                                          </p>
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
