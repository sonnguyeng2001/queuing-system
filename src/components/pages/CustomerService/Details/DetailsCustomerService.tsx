import { useParams } from 'react-router-dom';
import { routesConfig } from '../../../../routes/routeConfig';
import style from './DetailsCustomerService.module.scss';
import classNames from 'classnames/bind';
import { HeaderContent } from '../../../componentChild/HeaderContent/HeaderContent';
import { useSelector } from 'react-redux';
import { State } from '../../../../redux/store';
import { useEffect, useState } from 'react';
import { LinkAction } from '../../../componentChild/LinkAction/LinkAction';
import { CustomerServiceType } from '../../../propsType/CustomerServiceProps';
import { RenderStatus } from '../List/ListCustomerService';
import moment from 'moment';
import { LogoBack } from '../../../../assets/svg/LogoBack';

const cx = classNames.bind(style);

export const DetailsCustomerService = () => {
      const [customerService, setCustomerService] = useState<CustomerServiceType | undefined>(
            {} as CustomerServiceType,
      );
      const { id } = useParams();
      const dataCustomerService = useSelector((state: State) => state.customerService);
      const dataServices = useSelector((state: State) => state.service);

      useEffect(() => {
            var infoCustomerService = dataCustomerService.dataCustomerServices.find((cs: CustomerServiceType) => {
                  return cs.key === id && cs;
            });
            setCustomerService(infoCustomerService);
      }, [dataCustomerService.dataCustomerServices, id]);

      return (
            <div className={cx('wrapper')}>
                  <HeaderContent title="Quản lý cấp số" />
                  <div className={cx('table-content')}>
                        <div className={cx('content')}>
                              <header className={cx('header-content')}>Thông tin cấp số</header>
                              <div className={cx('info-customerService')}>
                                    <div className={cx('double-object')}>
                                          <div className={cx('object')}>
                                                <span className={cx('key')}>Họ tên:</span>
                                                <span className={cx('value')}>{customerService?.customerName}</span>
                                          </div>
                                          <div className={cx('object')}>
                                                <span className={cx('key')}>Nguồn cấp:</span>
                                                <span className={cx('value')}>{customerService?.origin}</span>
                                          </div>
                                    </div>
                                    <div className={cx('double-object')}>
                                          <div className={cx('object')}>
                                                <span className={cx('key')}>Tên dịch vụ:</span>
                                                <span className={cx('value')}>
                                                      {dataServices.dataServices.map(
                                                            (service) =>
                                                                  service.id === customerService?.serviceValue &&
                                                                  service.name,
                                                      )}
                                                </span>
                                          </div>
                                          <div className={cx('object')}>
                                                <span className={cx('key')}>Trạng thái:</span>
                                                <span className={cx('value')}>
                                                      {RenderStatus(customerService?.status!)}
                                                </span>
                                          </div>
                                    </div>
                                    <div className={cx('double-object')}>
                                          <div className={cx('object')}>
                                                <span className={cx('key')}>Số thứ tự:</span>
                                                <span className={cx('value')}>{customerService?.ordinalNumber}</span>
                                          </div>
                                          <div className={cx('object')}>
                                                <span className={cx('key')}>Số điện thoại:</span>
                                                <span className={cx('value')}>{customerService?.phone}</span>
                                          </div>
                                    </div>
                                    <div className={cx('double-object')}>
                                          <div className={cx('object')}>
                                                <span className={cx('key')}>Thời gian cấp:</span>
                                                <span className={cx('value')}>
                                                      {`${moment(customerService?.timeStart)
                                                            .locale('vi')
                                                            .format('LT')} - ${moment(customerService?.timeStart)
                                                            .locale('vi')
                                                            .format('L')}`}
                                                </span>
                                          </div>
                                          <div className={cx('object')}>
                                                <span className={cx('key')}>Địa chỉ email:</span>
                                                <span className={cx('value')}>{customerService?.email}</span>
                                          </div>
                                    </div>
                                    <div className={cx('double-object')}>
                                          <div className={cx('object')}>
                                                <span className={cx('key')}>Hạn sử dụng:</span>
                                                <span className={cx('value')}>
                                                      {`${moment(customerService?.timeEnd)
                                                            .locale('vi')
                                                            .format('LT')} - ${moment(customerService?.timeEnd)
                                                            .locale('vi')
                                                            .format('L')}`}
                                                </span>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <LinkAction
                              title="Quay lại"
                              logo={<LogoBack />}
                              to={`${routesConfig.listCustomerService}`}
                              className={cx('editDevices')}
                        />
                  </div>
            </div>
      );
};
