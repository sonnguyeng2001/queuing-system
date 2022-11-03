import { useEffect, useState } from 'react';
import './UpdateServices.css';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { State } from '../../../../redux/store';
import { Checkbox } from 'antd';
import { DevicesType } from '../../../propsType/DevicesProps';
import style from './UpdateServices.module.scss';
import classNames from 'classnames/bind';
import { HeaderContent } from '../../../componentChild/HeaderContent/HeaderContent';

const cx = classNames.bind(style);

export const UpdateServices = () => {
      const [devices, setDevices] = useState<DevicesType | undefined>({} as DevicesType);
      const { id } = useParams();
      const navigate = useNavigate();
      const data = useSelector((state: State) => state.device);

      useEffect(() => {
            const infoDevices = data.dataDevices.find((device: DevicesType) => {
                  return device?.id === id && device;
            });
            setDevices(infoDevices);
      }, []);
      const handleClickSubmit = () => {
            const inputID = document.getElementById('inputID') as HTMLInputElement | null;
            const inputNameDevices = document.getElementById('inputNameDevices') as HTMLInputElement | null;
            const inputDescDevices = document.getElementById('inputDescDevices') as HTMLTextAreaElement | null;
            alert(`ID: ${inputID?.value} - ${inputNameDevices?.value} - ${inputDescDevices?.value}`);
      };
      return (
            <div className={cx('wrapper')}>
                  <HeaderContent title="Quản lý dịch vụ" />
                  <div className={cx('content')}>
                        <header className={cx('header-content')}>Thông tin dịch vụ</header>
                        <div className={cx('double-object')}>
                              <div className={cx('object')}>
                                    <p className={cx('label')}>
                                          Mã dịch vụ: <span className={cx('required')}>*</span>
                                    </p>
                                    <input
                                          id="inputID"
                                          className={cx('input-field')}
                                          defaultValue={devices?.id}
                                          type="text"
                                    />
                                    <br />
                                    <p className={cx('label')} style={{ marginTop: '0' }}>
                                          Tên dịch vụ: <span className={cx('required')}>*</span>
                                    </p>
                                    <input
                                          id="inputNameDevices"
                                          className={cx('input-field')}
                                          defaultValue={devices?.name}
                                          type="text"
                                    />
                              </div>
                              <div className={cx('object')}>
                                    <p className={cx('label')}>
                                          Mô tả: <span className={cx('required')}>*</span>
                                    </p>
                                    <div style={{ height: '76%' }}>
                                          <textarea
                                                id="inputDescDevices"
                                                style={{ height: '100%' }}
                                                rows={4}
                                                className={cx('input-field')}
                                                placeholder="Mô tả dịch vụ"
                                          />
                                    </div>
                              </div>
                        </div>
                        {/*  */}
                        <br />
                        {/*  */}
                        <header className={cx('header-content')}>Quy tắc cấp số</header>
                        <Checkbox.Group className="updateServices-checkboxGroup">
                              <Checkbox value="0">
                                    <div className={cx('object')}>
                                          <span className={cx('key')}>Tăng tự động từ:</span>
                                          <span className={cx('value')}>
                                                <span className={cx('text-special')}>0001</span>
                                                &nbsp; đến &nbsp;
                                                <span className={cx('text-special')}>9999</span>
                                          </span>
                                    </div>
                              </Checkbox>
                              <Checkbox value="1">
                                    <div className={cx('object')} style={{ margin: '4px 0px' }}>
                                          <span className={cx('key')}>Prefix:</span>
                                          <span className={cx('value')}>
                                                <span className={cx('text-special')}>0001</span>
                                          </span>
                                    </div>
                              </Checkbox>
                              <Checkbox value="2">
                                    <div className={cx('object')} style={{ margin: '4px 0px' }}>
                                          <span className={cx('key')}>Suffix:</span>
                                          <span className={cx('value')}>
                                                <span className={cx('text-special')}>0001</span>
                                          </span>
                                    </div>
                              </Checkbox>
                              <Checkbox value="3">
                                    <div className={cx('object')}>
                                          <span className={cx('key')}>Reset mỗi ngày</span>
                                    </div>
                              </Checkbox>
                        </Checkbox.Group>

                        <p className={cx('label')} style={{ padding: '2px 0px', fontSize: '14px' }}>
                              <span className={cx('required')}>*</span>
                              <span
                                    style={{
                                          color: 'var(--color-gray-300)',
                                          marginLeft: '10px',
                                    }}
                              >
                                    Là trường thông tin bắt buộc
                              </span>
                        </p>
                  </div>
                  <div className={cx('wrapper-btn')}>
                        <button onClick={() => navigate(-1)} className={cx('btn', 'btn-btnCancel')}>
                              Hủy bỏ
                        </button>
                        <button onClick={handleClickSubmit} type="submit" className={cx('btn', 'btn-btnUpdate')}>
                              Cập nhật
                        </button>
                  </div>
            </div>
      );
};
