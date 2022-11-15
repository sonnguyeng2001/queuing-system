import './AddDevices.css';
import style from './AddDevices.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../../redux/store';
import { Select } from 'antd';
import classNames from 'classnames/bind';
import { HeaderContent } from '../../../componentChild/HeaderContent/HeaderContent';
import { LogoArrow } from '../../../../assets/svg/LogoArrow';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DevicesType } from '../../../propsType/DevicesProps';
import { addDevice } from '../../../../redux/features/DeviceSlice';
import uuid from 'react-uuid';

const cx = classNames.bind(style);

export const AddDevices = () => {
      const dataDevices = useSelector((state: State) => state.device);
      const dataService = useSelector((state: State) => state.service);
      const navigate = useNavigate();
      const dispatch = useDispatch<any>();

      const schema: yup.SchemaOf<Partial<DevicesType>> = yup.object({
            id: yup
                  .string()
                  .trim()
                  .required('Vui lòng điền vào trường này')
                  .test('idExists', 'Mã thiết bị đã tồn tại', (value) => {
                        const isExists = dataDevices.dataDevices.find((device) => device.id === value);
                        return isExists ? false : true;
                  }),
            ipAddress: yup
                  .string()
                  .trim()
                  .required('Vui lòng điền vào trường này')
                  .test('ipExists', 'Địa chỉ IP bị đã tồn tại', (value) => {
                        const isExists = dataDevices.dataDevices.find((device) => device.ipAddress === value);
                        return isExists ? false : true;
                  }),
            name: yup
                  .string()
                  .trim()
                  .required('Vui lòng điền vào trường này')
                  .test('nameExists', 'Tên thiết bị đã tồn tại', (value) => {
                        const isExists = dataDevices.dataDevices.find((device) => device.name === value);
                        return isExists ? false : true;
                  }),
            used: yup.array().min(1, 'Vui lòng chọn ít nhất 1 dịch vụ').required('Vui lòng ít nhất 1 dịch vụ'),
            isActive: yup.boolean().notRequired(),
            isConnected: yup.boolean().notRequired(),
            key: yup.string().trim().notRequired(),
            category: yup.string().trim().required('Vui lòng điền vào trường này'),
            userName: yup.string().trim().required('Vui lòng điền vào trường này'),
            password: yup.string().trim().required('Vui lòng điền vào trường này'),
      });

      const {
            register,
            handleSubmit,
            formState: { errors },
            control,
      } = useForm<DevicesType>({
            resolver: yupResolver(schema),
      });
      const onSubmit: SubmitHandler<DevicesType> = async (data: DevicesType) => {
            const isBoolean = Math.floor(Math.random() * 2001190238) / 2 === 0;
            const configData = {
                  ...data,
                  key: uuid().slice(0, 8).toString().toUpperCase(),
                  isActive: isBoolean,
                  isConnected: !isBoolean,
            };
            await dispatch(addDevice(configData))
                  .then((response: any) => {
                        response && alert('Thêm thành công');
                        navigate(-1);
                  })
                  .catch((error: any) => {
                        console.log(error);
                  });
      };

      return (
            <div className={cx('wrapper')}>
                  <HeaderContent title="Thông tin thiết bị" />
                  <div className={cx('table-content')}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                              <div className={cx('content')}>
                                    <header className={cx('header-content')}>Thông tin thiết bị</header>
                                    <div className={cx('info-devices')}>
                                          <div className={cx('double-object')}>
                                                <div className={cx('object')}>
                                                      <p className={cx('label')}>
                                                            Mã thiết bị: <span className={cx('required')}>*</span>{' '}
                                                            {errors.id?.message && (
                                                                  <span className={cx('errorMessage')}>
                                                                        {errors.id?.message}
                                                                  </span>
                                                            )}
                                                      </p>
                                                      <input
                                                            className={cx('input-field')}
                                                            type="text"
                                                            placeholder="Nhập mã thiết bị"
                                                            {...register('id')}
                                                      />
                                                </div>
                                                <div className={cx('object')}>
                                                      <p className={cx('label')}>
                                                            Loại thiết bị: <span className={cx('required')}>*</span>{' '}
                                                            {errors.category?.message && (
                                                                  <span className={cx('errorMessage')}>
                                                                        {errors.category?.message}
                                                                  </span>
                                                            )}
                                                      </p>
                                                      <div className="wrapper-select-inputKindOfDevices">
                                                            <Controller
                                                                  name="category"
                                                                  rules={{ required: true }}
                                                                  control={control}
                                                                  render={({ field }) => (
                                                                        <Select
                                                                              placeholder="Nhập vai trò"
                                                                              {...field}
                                                                              options={[
                                                                                    {
                                                                                          value: 'Kiosk',
                                                                                          label: 'Kiosk',
                                                                                    },
                                                                                    {
                                                                                          value: 'Hệ thống',
                                                                                          label: 'Hệ thống',
                                                                                    },
                                                                              ]}
                                                                        />
                                                                  )}
                                                            />
                                                            <LogoArrow className="logo-arrow" />
                                                      </div>
                                                </div>
                                          </div>
                                          <div className={cx('double-object')}>
                                                <div className={cx('object')}>
                                                      <p className={cx('label')}>
                                                            Tên thiết bị: <span className={cx('required')}>*</span>{' '}
                                                            {errors.name?.message && (
                                                                  <span className={cx('errorMessage')}>
                                                                        {errors.name?.message}
                                                                  </span>
                                                            )}
                                                      </p>
                                                      <input
                                                            className={cx('input-field')}
                                                            type="text"
                                                            placeholder="Nhập tên thiết bị"
                                                            {...register('name')}
                                                      />
                                                </div>
                                                <div className={cx('object')}>
                                                      <p className={cx('label')}>
                                                            Tên đăng nhập: <span className={cx('required')}>*</span>{' '}
                                                            {errors.userName?.message && (
                                                                  <span className={cx('errorMessage')}>
                                                                        {errors.userName?.message}
                                                                  </span>
                                                            )}
                                                      </p>
                                                      <input
                                                            className={cx('input-field')}
                                                            type="text"
                                                            placeholder="Nhập tên đăng nhập"
                                                            {...register('userName')}
                                                      />
                                                </div>
                                          </div>
                                          <div className={cx('double-object')}>
                                                <div className={cx('object')}>
                                                      <p className={cx('label')}>
                                                            Địa chỉ IP: <span className={cx('required')}>*</span>{' '}
                                                            {errors.ipAddress?.message && (
                                                                  <span className={cx('errorMessage')}>
                                                                        {errors.ipAddress?.message}
                                                                  </span>
                                                            )}
                                                      </p>
                                                      <input
                                                            className={cx('input-field')}
                                                            type="text"
                                                            placeholder="Nhập địa chỉ IP"
                                                            {...register('ipAddress')}
                                                      />
                                                </div>
                                                <div className={cx('object')}>
                                                      <p className={cx('label')}>
                                                            Mật khẩu: <span className={cx('required')}>*</span>{' '}
                                                            {errors.password?.message && (
                                                                  <span className={cx('errorMessage')}>
                                                                        {errors.password?.message}
                                                                  </span>
                                                            )}
                                                      </p>
                                                      <input
                                                            className={cx('input-field')}
                                                            type="text"
                                                            placeholder="Nhập mật khẩu"
                                                            {...register('password')}
                                                      />
                                                </div>
                                          </div>
                                          <div className={cx('object')}>
                                                <p className={cx('label')}>
                                                      Dịch vụ sử dụng <span className={cx('required')}>*</span>{' '}
                                                      {errors.used?.message && (
                                                            <span className={cx('errorMessage')}>
                                                                  {errors.used?.message}
                                                            </span>
                                                      )}
                                                </p>
                                                <div className="wrapper-select-listUseDevices">
                                                      <Controller
                                                            name="used"
                                                            rules={{ required: true }}
                                                            control={control}
                                                            render={({ field }) => (
                                                                  <Select
                                                                        mode="multiple"
                                                                        placeholder="Please select"
                                                                        {...field}
                                                                        options={dataService.dataServices.map(
                                                                              (service) => {
                                                                                    return {
                                                                                          value: service.id,
                                                                                          label: service.name,
                                                                                    };
                                                                              },
                                                                        )}
                                                                  />
                                                            )}
                                                      />
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
                                    <button
                                          onClick={() => navigate(-1)}
                                          type="button"
                                          className={cx('btn', 'btn-btnCancel')}
                                    >
                                          Hủy bỏ
                                    </button>
                                    <button type="submit" className={cx('btn', 'btn-btnAdd')}>
                                          Thêm thiết bị
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
};
