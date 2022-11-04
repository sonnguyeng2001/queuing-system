import classNames from 'classnames/bind';
import style from './ForgotPassword.module.scss';
import { Logo } from '../../../assets/svg/Logo';
import { GroupPeoplePassword } from '../../../assets/svg/GroupPeoplePassword';
import { Button } from 'antd';
import { State } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const cx = classNames.bind(style);
export const ForgotPasswordPage = () => {
      const dataUser = useSelector((state: State) => state.user);

      const emailRef = useRef<HTMLInputElement>(null);
      const errorRef = useRef<HTMLParagraphElement>(null);
      const navigate = useNavigate();

      const hanleCheckExistsEmail = () => {
            const checkUser = dataUser.data.find((user) => user.email === emailRef.current?.value);
            if (checkUser) {
                  errorRef.current?.classList.remove(cx('showError'));
                  navigate('/resetPassword', {
                        state: {
                              email: checkUser.email,
                              key: checkUser.key,
                        },
                  });
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
                                    <p className={cx('heading')}>Đặt lại mật khẩu</p>
                                    <p className={cx('label')}>Vui lòng nhập email để đặt lại mật khẩu của bạn</p>
                                    <input ref={emailRef} className={cx('input')} type="email" />
                              </div>
                              <p ref={errorRef} className={cx('forgotPassWord')}>
                                    Email không tồn tại
                              </p>
                        </div>
                        <div className={cx('wrapper-btn')}>
                              <Link to="/" className={cx('btn', 'btnCancel')}>
                                    Hủy
                              </Link>
                              <Button onClick={hanleCheckExistsEmail} className={cx('btn', 'btnContinue')}>
                                    Tiếp tục
                              </Button>
                        </div>
                  </div>
                  <div className={cx('rightContent')}>
                        <GroupPeoplePassword />
                  </div>
            </div>
      );
};
