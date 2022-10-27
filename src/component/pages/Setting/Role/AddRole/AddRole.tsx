import style from './AddRole.module.scss';
import classNames from 'classnames/bind';
import { Checkbox } from 'antd';
import { HeaderContent } from '../../../../componentChild/HeaderContent/HeaderContent';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(style);

export const AddRole = () => {
      const navigate = useNavigate();
      const nameRole = document.getElementById('nameRole') as HTMLInputElement | null;
      const descRole = document.getElementById('descRole') as HTMLTextAreaElement | null;
      const handleAddRole = () => {
            // ---- button nhớ thêm type  = "submit" để có thể lấy được value khi sử dụng document.getElementById()
            alert(nameRole?.value + '  ' + descRole?.value);
      };
      return (
            <div className={cx('AddRole-Wrapper')}>
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
                        <button onClick={handleAddRole} type="submit" className={cx('btn', 'btn-btnAdd')}>
                              Thêm vai trò
                        </button>
                  </div>
            </div>
      );
};
