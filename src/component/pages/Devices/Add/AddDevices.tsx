import './AddDevices.css';
import style from './AddDevices.module.scss';
import { useSelector } from 'react-redux';
import { State } from '../../../../redux/store';
import { Select, Input } from 'antd';
import classNames from 'classnames/bind';
import { HeaderContent } from '../../../componentChild/HeaderContent/HeaderContent';
import { LogoArrow } from '../../../../assets/svg/LogoArrow';
import { DefaultOptionType } from 'antd/lib/select';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

export const AddDevices = () => {
      const dataDevices = useSelector((state: State) => state.device);
      const navigate = useNavigate();
      const handleChangeKindOfDevices = (value: string, option: DefaultOptionType | DefaultOptionType[] | any) => {
            // Nhớ thêm | any để có thể lấy được tất cả key trong object
            // {key: "" ,value: "", children: ""}
      };
      const handleClickSubmit = () => {
            const inputID = document.getElementById('inputID') as HTMLInputElement | null;
            const inputKindOfDevices = document.getElementById('inputKindOfDevices') as HTMLInputElement | null;
            const inputNameDevices = document.getElementById('inputNameDevices') as HTMLInputElement | null;
            const inputAddressDevices = document.getElementById('inputAddressDevices') as HTMLInputElement | null;
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
                                                <Input
                                                      id="inputID"
                                                      className={cx('input-field')}
                                                      placeholder="Nhập mã thiết bị"
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
                                                            placeholder="Chọn loại thiết bị"
                                                            popupClassName="popupClassName"
                                                            onChange={handleChangeKindOfDevices}
                                                      >
                                                            {dataDevices.dataDevices.map((devices) => {
                                                                  return (
                                                                        <Select.Option
                                                                              key={devices.id}
                                                                              value={devices.id}
                                                                        >
                                                                              {devices.name}
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
                                                <Input
                                                      id="inputNameDevices"
                                                      className={cx('input-field')}
                                                      type="text"
                                                      placeholder="Nhập tên thiết bị"
                                                />
                                          </div>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Tên đăng nhập: <span className={cx('required')}>*</span>
                                                </p>
                                                <Input
                                                      id="inputUserName"
                                                      className={cx('input-field')}
                                                      type="text"
                                                      placeholder="Nhập tài khoản"
                                                />
                                          </div>
                                    </div>
                                    <div className={cx('double-object')}>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Địa chỉ IP: <span className={cx('required')}>*</span>
                                                </p>
                                                <Input
                                                      id="inputAddressDevices"
                                                      className={cx('input-field')}
                                                      type="text"
                                                      placeholder="Nhập địa chỉ IP"
                                                />
                                          </div>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Mật khẩu: <span className={cx('required')}>*</span>
                                                </p>
                                                <Input
                                                      className={cx('input-field')}
                                                      type="text"
                                                      placeholder="Nhập mật khẩu"
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
                                                      placeholder="Nhập dịch vụ sử dụng"
                                                      // popupClassName='' => css Popup
                                                >
                                                      <Select.Option value="0">Tất cả</Select.Option>
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
                              <button onClick={() => navigate(-1)} className={cx('btn', 'btn-btnCancel')}>
                                    Hủy bỏ
                              </button>
                              <button onClick={handleClickSubmit} type="submit" className={cx('btn', 'btn-btnAdd')}>
                                    Thêm thiết bị
                              </button>
                        </div>
                  </div>
            </div>
      );
};
