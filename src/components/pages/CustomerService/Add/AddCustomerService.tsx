import './AddCustomerService.css';
import style from './AddCustomerService.module.scss';
import { Select, Modal } from 'antd';
import classNames from 'classnames/bind';
import { HeaderContent } from '../../../componentChild/HeaderContent/HeaderContent';
import { LogoArrow } from '../../../../assets/svg/LogoArrow';
import { useNavigate } from 'react-router-dom';
import { BaseOptionType, DefaultOptionType } from 'antd/lib/select';
import { useState, useRef } from 'react';
import moment from 'moment';
import 'moment/locale/vi';
import { useSelector } from 'react-redux';
import { State } from '../../../../redux/store';
import { ServiceType } from '../../../propsType/ServiceProps';

const cx = classNames.bind(style);

export const AddCustomerService = () => {
      const navigate = useNavigate();
      const nameServiceRef = useRef<string>('');
      const dataService = useSelector((state: State) => state.service);
      const [isOpen, setIsOpen] = useState<boolean>(false);

      const handlePrint = () => {
            const data = {};
            if (nameServiceRef.current) {
                  setIsOpen(true);
            } else {
                  alert('Vui lòng chọn dịch vụ');
            }
      };
      const handleCancel = () => {
            setIsOpen(false);
      };
      const handleChangeSelect = (value: string, option: BaseOptionType | DefaultOptionType) => {
            console.log(value);
            nameServiceRef.current = option.children;
      };

      return (
            <div className={cx('wrapper')}>
                  <HeaderContent title="Quản lý cấp số" />
                  <div className={cx('content')}>
                        <header className={cx('header-content')}>Cấp số mới</header>
                        <div className={cx('wrapper-select')}>
                              <p className={cx('label')}>Dịch vụ khách hàng lựa chọn </p>
                              <div className={cx('select')}>
                                    <Select onChange={handleChangeSelect} placeholder="Chọn dịch vụ">
                                          {dataService.dataServices.map((service: ServiceType) => {
                                                return (
                                                      <Select.Option key={service.id} value={service.name}>
                                                            {service.name}
                                                      </Select.Option>
                                                );
                                          })}
                                    </Select>
                                    <LogoArrow className={cx('logo-arrow')} />
                              </div>
                        </div>
                        <div className={cx('wrapper-btn')}>
                              <button onClick={() => navigate(-1)} type="button" className={cx('btn', 'btn-btnCancel')}>
                                    Hủy bỏ
                              </button>
                              <button onClick={handlePrint} className={cx('btn', 'btn-btnPrint')}>
                                    In số
                              </button>
                        </div>
                  </div>
                  <Modal
                        className="modal-CustomerService"
                        open={isOpen}
                        footer={null}
                        onCancel={handleCancel}
                        centered={true}
                  >
                        <div className="infoService">
                              <h3 className="header">Số thứ tự được cấp</h3>
                              <p className="number">{Math.floor(Math.random() * 9999999)}</p>
                              <p className="nameService">
                                    DV: {nameServiceRef.current}
                                    &nbsp;
                                    <span className="placeService">(tại quầy số 1)</span>
                              </p>
                        </div>
                        <div className="timeService">
                              <p>
                                    <span>Thời gian cấp: </span>
                                    <span>
                                          {`${moment().format('LT').replace(' PM', ' - ')} ${moment().format(
                                                'DD/MM/YYYY',
                                          )}`}
                                    </span>
                              </p>
                              <p>
                                    <span> Hạn sử dụng: </span>
                                    <span>17:30 - {moment().format('DD/MM/YYYY')}</span>
                              </p>
                        </div>
                  </Modal>
            </div>
      );
};
