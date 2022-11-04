import './AddServices.css';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from 'antd';
import style from './AddServices.module.scss';
import classNames from 'classnames/bind';
import { HeaderContent } from '../../../componentChild/HeaderContent/HeaderContent';
import uid from 'react-uuid';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ServiceType } from '../../../propsType/ServiceProps';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addService } from '../../../../redux/features/ServiceSlice';

const cx = classNames.bind(style);
const schema: yup.SchemaOf<Partial<ServiceType>> = yup.object({
      desc: yup.string().required('Vui lòng điền vào trường này'),
      name: yup.string().required('Vui lòng điền vào trường này'),
      isActive: yup.boolean().notRequired(),
      key: yup.string().notRequired(),
});

export const AddServices = () => {
      const navigate = useNavigate();
      const {
            register,
            handleSubmit,
            formState: { errors },
      } = useForm<ServiceType>({ resolver: yupResolver(schema) });
      const dispatch = useDispatch<any>();

      const onFormSubmit: SubmitHandler<ServiceType> = async (data) => {
            const idDevice = uid().slice(0, 8).toUpperCase();
            const setIsActive = Math.floor(Math.random() * 10) % 2 === 0;
            const dataService = { ...data, key: idDevice, isActive: setIsActive };
            await dispatch(addService(dataService))
                  .then((data: ServiceType) => {
                        data && alert('Thêm thành công');
                  })
                  .catch((errors: any) => console.log(errors));
      };
      return (
            <div className={cx('wrapper')}>
                  <HeaderContent title="Quản lý dịch vụ" />
                  <form onSubmit={handleSubmit(onFormSubmit)}>
                        <div className={cx('content')}>
                              <header className={cx('header-content')}>Thông tin dịch vụ</header>
                              <div className={cx('double-object')}>
                                    <div className={cx('object')}>
                                          <p className={cx('label')}>
                                                Mã dịch vụ: <span className={cx('required')}>*</span>{' '}
                                                {errors.key?.message && (
                                                      <span className={cx('errorMessage')}>{errors.key?.message}</span>
                                                )}
                                          </p>
                                          <input
                                                className={cx('input-field')}
                                                type="text"
                                                placeholder="Disabled"
                                                disabled
                                                {...register('key')}
                                          />
                                          <br />
                                          <p className={cx('label')} style={{ marginTop: '0' }}>
                                                Tên dịch vụ: <span className={cx('required')}>*</span>
                                                {errors.name?.message && (
                                                      <span className={cx('errorMessage')}>{errors.name?.message}</span>
                                                )}
                                          </p>
                                          <input
                                                className={cx('input-field')}
                                                type="text"
                                                placeholder="Nhập tên dịch vụ"
                                                {...register('name')}
                                          />
                                    </div>
                                    <div className={cx('object')}>
                                          <p className={cx('label')}>
                                                Mô tả: <span className={cx('required')}>*</span>
                                                {errors.desc?.message && (
                                                      <span className={cx('errorMessage')}>{errors.desc?.message}</span>
                                                )}
                                          </p>
                                          <div style={{ height: '76%' }}>
                                                <textarea
                                                      style={{ height: '100%' }}
                                                      rows={4}
                                                      className={cx('input-field')}
                                                      placeholder="Nhập mô tả..."
                                                      {...register('desc')}
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
                                    <span style={{ color: 'var(--color-gray-300)', marginLeft: '10px' }}>
                                          Là trường thông tin bắt buộc
                                    </span>
                              </p>
                        </div>
                        <div className={cx('wrapper-btn')}>
                              <button onClick={() => navigate(-1)} className={cx('btn', 'btn-btnCancel')}>
                                    Hủy bỏ
                              </button>
                              <button type="submit" className={cx('btn', 'btn-btnAdd')}>
                                    Thêm dịch vụ
                              </button>
                        </div>
                  </form>
            </div>
      );
};
