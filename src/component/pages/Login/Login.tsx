import classNames from 'classnames/bind';
import style from './Login.module.scss';
import { Logo } from '../../../assets/svg/Logo';
import { GroupPeopleLogin } from '../../../assets/svg/GroupPeopleLogin';
import { Button } from 'antd';
import { State } from '../../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { userLogin } from '../../../redux/features/UserSlice';
import { routesConfig } from '../../../routes/routeConfig';
import { UserType } from '../../propsType/UserProps';
import axios from 'axios';

const cx = classNames.bind(style);
export const LoginPage = () => {
      const dataUser = useSelector((state: State) => state.user);

      const usernameRef = useRef<HTMLInputElement>(null);
      const passwordRef = useRef<HTMLInputElement>(null);
      const errorRef = useRef<HTMLParagraphElement>(null);
      const navigate = useNavigate();
      const dispatch = useDispatch<any>();

      const handleClickLogin = () => {
            const currentUser = dataUser.data.find((user: UserType) => {
                  return (
                        user.userName === usernameRef.current?.value &&
                        user.password === passwordRef.current?.value &&
                        user
                  );
            });

            if (currentUser) {
                  errorRef.current?.classList.remove(cx('showError'));
                  dispatch(userLogin(currentUser));
                  alert('Success');
                  navigate(routesConfig.dashboard);
            } else {
                  errorRef.current?.classList.add(cx('showError'));
            }
      };

      return (
            <div className={cx('wrapper')}>
                  <div className={cx('leftContent')}>
                        <Logo className={cx('logo')} />
                        <div className={cx('form')}>
                              <div>
                                    <p className={cx('label')}>Tên đăng nhập *</p>
                                    <input ref={usernameRef} className={cx('input')} type="text" />
                              </div>
                              <div>
                                    <p className={cx('label')}>Mật khẩu *</p>
                                    <input ref={passwordRef} className={cx('input')} type="password" />
                              </div>
                              <p ref={errorRef} className={cx('errorMessage')}>
                                    Tên đăng nhập hoặc mật khẩu không đúng
                              </p>
                        </div>
                        <Button onClick={handleClickLogin} className={cx('btnLogin')}>
                              Đăng nhập
                        </Button>
                        <Link to="/forgotPassword" className={cx('forgotPassWord')}>
                              Quên mật khẩu?
                        </Link>
                  </div>
                  <div className={cx('rightContent')}>
                        <GroupPeopleLogin />
                        <div className={cx('text')}>
                              <p className={cx('first-text')}>Hệ thống</p>
                              <p className={cx('second-text')}>Quản lý xếp hàng</p>
                        </div>
                  </div>
            </div>
      );
};
