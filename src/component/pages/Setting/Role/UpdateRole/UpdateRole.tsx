import style from './UpdateRole.module.scss';
import classNames from 'classnames/bind';
import { HeaderContent } from '../../../../componentChild/HeaderContent/HeaderContent';
import { useParams, useNavigate } from 'react-router-dom';
import { Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { RoleType } from '../../../../propsType/RoleProps';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../../../redux/store';
import { getRoles } from '../../../../../redux/features/RoleSlice';

const cx = classNames.bind(style);

export const UpdateRole = () => {
      const [role, setRole] = useState<RoleType | undefined>({} as RoleType);
      const navigate = useNavigate();
      const nameRole = document.getElementById('nameRole') as HTMLInputElement | null;
      const descRole = document.getElementById('descRole') as HTMLTextAreaElement | null;
      const dataRole = useSelector((state: State) => state.role);
      const dispatch = useDispatch<any>();
      const { id } = useParams();

      const fetchData = async () => {
            const response = await dispatch(getRoles());
            return response.payload;
      };
      useEffect(() => {
            if (dataRole.data.length > 0) {
                  const currentRole = dataRole.data.find((itemRole: RoleType) => {
                        return itemRole.key.toString() === id && itemRole;
                  });
                  setRole(currentRole);
            } else {
                  fetchData()
                        .then((data) => {
                              const currentRole = data.find((itemRole: RoleType) => {
                                    return itemRole.key.toString() === id && itemRole;
                              });
                              setRole(currentRole);
                        })
                        .catch((error) => {
                              console.log(error);
                        });
            }
      }, [dispatch]);

      const handleChangeInfoRole = () => {};

      const handleUpdateRole = () => {
            alert(nameRole?.value + ' ' + descRole?.value);
      };
      return (
            <div className={cx('UpdateRole-Wrapper')}>
                  <HeaderContent title="Danh sách vai trò" />
                  <div className={cx('wrapper-content')}>
                        <header className={cx('header-content')}>Thông tin vai trò</header>
                        <div className={cx('content')}>
                              <div className={cx('content-left')}>
                                    <div className={cx('double-object')}>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Tên vai trò:
                                                      <span className={cx('required')}>*</span>
                                                </p>
                                                <input
                                                      id="nameRole"
                                                      className={cx('input-field')}
                                                      type="text"
                                                      placeholder="Nhập tên vai trò"
                                                      defaultValue={role?.roleName}
                                                />
                                          </div>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Mô tả: <span className={cx('required')}>*</span>
                                                </p>
                                                <div style={{ height: '76%' }}>
                                                      <textarea
                                                            id="descRole"
                                                            style={{ height: '100%' }}
                                                            rows={4}
                                                            className={cx('input-field')}
                                                            placeholder="Nhập mô tả"
                                                            defaultValue={role?.roleDescription}
                                                      />
                                                </div>
                                          </div>
                                    </div>
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
                              <div className={cx('content-right')}>
                                    <div className={cx('double-object')}>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Phân quyền chức năng:
                                                      <span className={cx('required')}>*</span>
                                                </p>
                                          </div>
                                          <div className={cx('object', 'listCheckbox')}>
                                                <div className={cx('checkbox', 'checkboxA')}>
                                                      <h3 className={cx('heading-checkbox')}>Nhóm chức năng A</h3>
                                                      <Checkbox.Group className="updateServices-checkboxGroup">
                                                            <Checkbox value="0">
                                                                  <div className={cx('object')}>
                                                                        <span className={cx('key')}>Tất cả</span>
                                                                  </div>
                                                            </Checkbox>
                                                            <Checkbox value="1">
                                                                  <div
                                                                        className={cx('object')}
                                                                        style={{ margin: '4px 0px' }}
                                                                  >
                                                                        <span className={cx('key')}>Chức năng x</span>
                                                                  </div>
                                                            </Checkbox>
                                                            <Checkbox value="2">
                                                                  <div
                                                                        className={cx('object')}
                                                                        style={{ margin: '4px 0px' }}
                                                                  >
                                                                        <span className={cx('key')}>Chức năng y</span>
                                                                  </div>
                                                            </Checkbox>
                                                            <Checkbox value="3">
                                                                  <div className={cx('object')}>
                                                                        <span className={cx('key')}>Chức năng z</span>
                                                                  </div>
                                                            </Checkbox>
                                                      </Checkbox.Group>
                                                </div>
                                                {/* ------------------------------------------------------------------------------------------------------- */}
                                                <div className={cx('checkbox', 'checkboxB')}>
                                                      <h3 className={cx('heading-checkbox')}>Nhóm chức năng B</h3>
                                                      <Checkbox.Group className="updateServices-checkboxGroup">
                                                            <Checkbox value="0">
                                                                  <div className={cx('object')}>
                                                                        <span className={cx('key')}>Tất cả</span>
                                                                  </div>
                                                            </Checkbox>
                                                            <Checkbox value="1">
                                                                  <div
                                                                        className={cx('object')}
                                                                        style={{ margin: '4px 0px' }}
                                                                  >
                                                                        <span className={cx('key')}>Chức năng x</span>
                                                                  </div>
                                                            </Checkbox>
                                                            <Checkbox value="2">
                                                                  <div
                                                                        className={cx('object')}
                                                                        style={{ margin: '4px 0px' }}
                                                                  >
                                                                        <span className={cx('key')}>Chức năng y</span>
                                                                  </div>
                                                            </Checkbox>
                                                            <Checkbox value="3">
                                                                  <div className={cx('object')}>
                                                                        <span className={cx('key')}>Chức năng z</span>
                                                                  </div>
                                                            </Checkbox>
                                                      </Checkbox.Group>
                                                </div>
                                                {/* ------------------------------------------------------------------------------------------------------- */}
                                                <div className={cx('checkbox', 'checkboxC')}>
                                                      <h3 className={cx('heading-checkbox')}>Nhóm chức năng C</h3>
                                                      <Checkbox.Group className="updateServices-checkboxGroup">
                                                            <Checkbox value="0">
                                                                  <div className={cx('object')}>
                                                                        <span className={cx('key')}>Tất cả</span>
                                                                  </div>
                                                            </Checkbox>
                                                            <Checkbox value="1">
                                                                  <div
                                                                        className={cx('object')}
                                                                        style={{ margin: '4px 0px' }}
                                                                  >
                                                                        <span className={cx('key')}>Chức năng x</span>
                                                                  </div>
                                                            </Checkbox>
                                                            <Checkbox value="2">
                                                                  <div
                                                                        className={cx('object')}
                                                                        style={{ margin: '4px 0px' }}
                                                                  >
                                                                        <span className={cx('key')}>Chức năng y</span>
                                                                  </div>
                                                            </Checkbox>
                                                            <Checkbox value="3">
                                                                  <div className={cx('object')}>
                                                                        <span className={cx('key')}>Chức năng z</span>
                                                                  </div>
                                                            </Checkbox>
                                                      </Checkbox.Group>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <div className={cx('wrapper-btn')}>
                        <button onClick={() => navigate(-1)} className={cx('btn', 'btn-btnCancel')}>
                              Hủy bỏ
                        </button>
                        <button onClick={handleUpdateRole} className={cx('btn', 'btn-btnUpdate')}>
                              Cập nhật
                        </button>
                  </div>
            </div>
      );
};
