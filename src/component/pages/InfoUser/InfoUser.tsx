import style from './InfoUser.module.scss';
import classNames from 'classnames/bind';
import imgUser from '../../../assets/images/imgUser.png';
import { useSelector } from 'react-redux';
import { State } from '../../../redux/store';
import { LogoCamera } from '../../../assets/svg/LogoCamera';
import { useEffect, useState } from 'react';
import { UserType } from '../../propsType/UserProps';
import { Image } from 'antd';
const cx = classNames.bind(style);

export const InfoUser = () => {
      const dataUser = useSelector((state: State) => state.user);
      const [user, setUser] = useState<UserType | undefined>({} as UserType);

      useEffect(() => {
            if (dataUser.currentUser) {
                  setUser(dataUser.currentUser);
            } else {
            }
      }, []);

      return (
            <div className={cx('infoUser-wrapper')}>
                  <div className={cx('leftContent')}>
                        <div className={cx('user-img')}>
                              <div>
                                    <Image
                                          src={dataUser.currentUser.img || imgUser}
                                          className={cx('img')}
                                          alt="Error"
                                    />
                              </div>
                              <div className={cx('logoCamera')}>
                                    <LogoCamera />
                              </div>
                        </div>
                        <p className={cx('user-fullName')}>{dataUser.currentUser.fullName || 'No current user'}</p>
                  </div>
                  <div className={cx('rightContent')}>
                        <div className={cx('double-object')}>
                              <div className={cx('object')}>
                                    <p className={cx('label')}>
                                          Tên người dùng: <span className={cx('required')}>*</span>
                                    </p>
                                    <input
                                          disabled
                                          id="fullName"
                                          className={cx('input-field')}
                                          type="text"
                                          defaultValue={dataUser.currentUser.fullName}
                                    />
                              </div>
                              <div className={cx('object')}>
                                    <p className={cx('label')}>
                                          Tên đăng nhập: <span className={cx('required')}>*</span>
                                    </p>
                                    <input
                                          disabled
                                          id="userName"
                                          className={cx('input-field')}
                                          type="text"
                                          defaultValue={dataUser.currentUser.userName}
                                    />
                              </div>
                        </div>
                        <div className={cx('double-object')}>
                              <div className={cx('object')}>
                                    <p className={cx('label')}>
                                          Số điện thoại: <span className={cx('required')}>*</span>
                                    </p>
                                    <input
                                          disabled
                                          id="phone"
                                          className={cx('input-field')}
                                          type="text"
                                          defaultValue={dataUser.currentUser.phone}
                                    />
                              </div>
                              <div className={cx('object')}>
                                    <p className={cx('label')}>
                                          Mật khẩu: <span className={cx('required')}>*</span>
                                    </p>
                                    <input
                                          disabled
                                          id="password"
                                          className={cx('input-field')}
                                          type="text"
                                          defaultValue={dataUser.currentUser.password}
                                    />
                              </div>
                        </div>
                        <div className={cx('double-object')}>
                              <div className={cx('object')}>
                                    <p className={cx('label')}>
                                          Email: <span className={cx('required')}>*</span>
                                    </p>
                                    <input
                                          disabled
                                          id="email"
                                          className={cx('input-field')}
                                          defaultValue={dataUser.currentUser.email}
                                          type="text"
                                    />
                              </div>
                              <div className={cx('object')}>
                                    <p className={cx('label')}>
                                          Vai trò: <span className={cx('required')}>*</span>
                                    </p>
                                    <input
                                          disabled
                                          id="roleName"
                                          className={cx('input-field')}
                                          type="text"
                                          defaultValue={dataUser.currentUser.roleName}
                                    />
                              </div>
                        </div>
                  </div>
            </div>
      );
};
