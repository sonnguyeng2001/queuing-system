import style from './AddAccount.module.scss';
import { Select } from 'antd';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { HeaderContent } from '../../../../componentChild/HeaderContent/HeaderContent';
import { LogoArrow } from '../../../../../assets/svg/LogoArrow';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../../../redux/store';
import { RoleType } from '../../../../propsType/RoleProps';
import { UserType } from '../../../../propsType/UserProps';
import uid from 'react-uuid';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { addUser } from '../../../../../redux/features/UserSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'yup-phone';
import { updateRoleQuantity } from '../../../../../redux/features/RoleSlice';
import { routesConfig } from '../../../../../routes/routeConfig';
const cx = classNames.bind(style);

type formType = UserType & {
      confirmPassword: string;
};

const schema: yup.SchemaOf<Partial<formType>> = yup.object({
      fullName: yup.string().required('Vui lòng điền vào trường này').trim(),
      userName: yup.string().required('Vui lòng điền vào trường này').trim(),
      phone: yup
            .string()
            .trim()
            .required('Vui lòng điền vào trường này')
            .phone('VN', true, 'Vui lòng nhập đúng định dạng số điện thoại'),
      email: yup.string().trim().required('Vui lòng điền vào trường này').email('Vui lòng điền đúng định dạng email'),
      password: yup.string().trim().required('Vui lòng điền vào trường này').min(10, 'Tối thiểu phải có 10 ký tự'),
      confirmPassword: yup
            .string()
            .required('Vui lòng điền vào trường này')
            .oneOf([yup.ref('password'), null], '2 mật khẩu phải trùng nhau'),
      active: yup.boolean().notRequired(),
      img: yup.string().notRequired(),
      key: yup.string().notRequired(),
      roleName: yup.string().notRequired(),
});

export const AddAccount = () => {
      const navigate = useNavigate();
      const [listRole, setListRole] = useState<RoleType[] | []>([]);
      const dataRole = useSelector((state: State) => state.role);
      const dispatch = useDispatch<any>();

      const {
            register,
            handleSubmit,
            formState: { errors },
            control,
      } = useForm<formType>({
            resolver: yupResolver(schema),
      });
      const onSubmit: SubmitHandler<formType> = async (data) => {
            const configUser = { ...data, key: uid().slice(0, 8).toUpperCase() };
            const infoRole = dataRole.data.find((role: RoleType) => role.roleName === data.roleName);
            await dispatch(addUser(configUser))
                  .then(async (response: any) => {
                        response &&
                              (await dispatch(updateRoleQuantity(infoRole!)).then((response: any) => {
                                    alert('Thêm thành công ');
                                    navigate(routesConfig.listAccount);
                              }));
                  })
                  .catch((error: any) => {
                        console.log(error);
                  });
      };

      useEffect(() => {
            setListRole(dataRole.data);
      }, []);

      return (
            <div className={cx('wrapper')}>
                  <HeaderContent title="Quản lý tài khoản" />
                  <div className={cx('table-content')}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                              <div className={cx('content')}>
                                    <header className={cx('header-content')}>Thông tin tài khoản</header>
                                    <div className={cx('double-object')}>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Họ tên: <span className={cx('required')}>*</span>
                                                </p>
                                                <input
                                                      className={cx('input-field')}
                                                      placeholder="Nhập họ tên"
                                                      type="text"
                                                      {...register('fullName')}
                                                />
                                                {errors.fullName?.message && (
                                                      <p className={cx('errorMessage')}>{errors.fullName?.message}</p>
                                                )}
                                          </div>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Tên đăng nhập: <span className={cx('required')}>*</span>
                                                </p>
                                                <input
                                                      className={cx('input-field')}
                                                      type="text"
                                                      placeholder="Nhập tên đăng nhập"
                                                      {...register('userName')}
                                                />
                                                {errors.userName?.message && (
                                                      <p className={cx('errorMessage')}>{errors.userName?.message}</p>
                                                )}
                                          </div>
                                    </div>
                                    <div className={cx('double-object')}>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Số điện thoại: <span className={cx('required')}>*</span>
                                                </p>
                                                <input
                                                      className={cx('input-field')}
                                                      type="text"
                                                      placeholder="Nhập số điện thoại"
                                                      {...register('phone')}
                                                />
                                                {errors.phone?.message && (
                                                      <p className={cx('errorMessage')}>{errors.phone?.message}</p>
                                                )}
                                          </div>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Mật khẩu: <span className={cx('required')}>*</span>
                                                </p>
                                                <input
                                                      className={cx('input-field')}
                                                      type="password"
                                                      placeholder="Nhập mật khẩu"
                                                      {...register('password')}
                                                />
                                                {errors.password?.message && (
                                                      <p className={cx('errorMessage')}>{errors.password?.message}</p>
                                                )}
                                          </div>
                                    </div>
                                    <div className={cx('double-object')}>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Email: <span className={cx('required')}>*</span>
                                                </p>
                                                <input
                                                      className={cx('input-field')}
                                                      type="text"
                                                      placeholder="Nhập email"
                                                      {...register('email')}
                                                />
                                                {errors.email?.message && (
                                                      <p className={cx('errorMessage')}>{errors.email?.message}</p>
                                                )}
                                          </div>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Nhập lại mật khẩu: <span className={cx('required')}>*</span>
                                                </p>
                                                <input
                                                      className={cx('input-field')}
                                                      type="password"
                                                      placeholder="Nhập lại mật khẩu"
                                                      {...register('confirmPassword')}
                                                />
                                                {errors.confirmPassword?.message && (
                                                      <p className={cx('errorMessage')}>
                                                            {errors.confirmPassword?.message}
                                                      </p>
                                                )}
                                          </div>
                                    </div>
                                    <div className={cx('double-object')}>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Vai trò <span className={cx('required')}>*</span>
                                                </p>
                                                <div className={cx('select', 'selectRole')}>
                                                      {/* xài controller nếu sử dụng library UI  link: https://legacy.react-hook-form.com/get-started/#IntegratingwithUIlibraries*/}
                                                      <Controller
                                                            name="roleName"
                                                            rules={{ required: true }}
                                                            control={control}
                                                            render={({ field }) => (
                                                                  <Select
                                                                        {...field}
                                                                        placeholder="Nhập vai trò"
                                                                        options={listRole.map((role: RoleType) => {
                                                                              return {
                                                                                    value: role.roleName,
                                                                                    label: role.roleName,
                                                                              };
                                                                        })}
                                                                  />
                                                            )}
                                                      />

                                                      <LogoArrow className={cx('logoArrow')} />
                                                </div>
                                                {errors.roleName?.message && (
                                                      <p className={cx('errorMessage')}>{errors.roleName?.message}</p>
                                                )}
                                          </div>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Tình trạng <span className={cx('required')}>*</span>
                                                </p>
                                                <div className={cx('select', 'selectActive')}>
                                                      {/* xài controller nếu sử dụng library UI  link: https://legacy.react-hook-form.com/get-started/#IntegratingwithUIlibraries*/}
                                                      <Controller
                                                            name="active"
                                                            control={control}
                                                            render={({ field }) => (
                                                                  <Select
                                                                        placeholder="Nhập tình trạng"
                                                                        {...field}
                                                                        options={[
                                                                              {
                                                                                    value: false,
                                                                                    label: 'Ngưng hoạt động',
                                                                              },
                                                                              {
                                                                                    value: true,
                                                                                    label: 'Hoạt động',
                                                                              },
                                                                        ]}
                                                                  />
                                                            )}
                                                      />
                                                      <LogoArrow className={cx('logoArrow')} />
                                                </div>
                                                {errors.active?.message && (
                                                      <p className={cx('errorMessage')}>{errors.active?.message}</p>
                                                )}
                                          </div>
                                    </div>
                                    <p className={cx('label')}>
                                          <span className={cx('required')}>*</span>
                                          <span style={{ color: 'var(--color-gray-300)', marginLeft: '10px' }}>
                                                Là trường thông tin bắt buộc
                                          </span>
                                    </p>
                              </div>
                              <div className={cx('wrapper-btn')}>
                                    <button
                                          onClick={() => navigate(-1)}
                                          type="button"
                                          className={cx('btn', 'btn-btnCancel')}
                                    >
                                          Hủy bỏ
                                    </button>
                                    <button type="submit" className={cx('btn', 'btn-btnAdd')}>
                                          Thêm tài khoản
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
};
