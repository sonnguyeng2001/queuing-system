import { useEffect, useState } from 'react';
import './UpdateServices.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { State } from '../../../../redux/store';
import style from './UpdateServices.module.scss';
import classNames from 'classnames/bind';
import { HeaderContent } from '../../../componentChild/HeaderContent/HeaderContent';
import { CustomizeCheckbox } from '../../../componentChild/CustomizeCheckbox/CustomizeCheckbox';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckboxOptionType } from 'antd/lib/checkbox';
import { ServiceType } from '../../../propsType/ServiceProps';
import * as yup from 'yup';
import { updateService } from '../../../../redux/features/ServiceSlice';
import { routesConfig } from '../../../../routes/routeConfig';
import { addActionHistory } from '../../../../redux/features/ActionHistorySlice';
import { toast } from 'react-toastify';
const cx = classNames.bind(style);

export const UpdateServices = () => {
      const [service, setService] = useState<ServiceType | undefined>({} as ServiceType);
      const { id } = useParams();
      const dispatch = useDispatch<any>();
      const navigate = useNavigate();
      const dataService = useSelector((state: State) => state.service);
      const dataUser = useSelector((state: State) => state.user);

      const schema: yup.SchemaOf<Partial<ServiceType>> = yup.object({
            desc: yup.string().required('Vui lòng điền vào trường này'),
            name: yup
                  .string()
                  .required('Vui lòng điền vào trường này')
                  .test('nameExists', 'Tên dịch vụ đã tồn tại', (value) => {
                        if (service?.name === value) {
                              return true;
                        } else {
                              const isExists = dataService.dataServices.find((service) => service.name === value);
                              return isExists ? false : true;
                        }
                  }),
            id: yup
                  .string()
                  .required('Vui lòng điền vào trường này')
                  .test('idExists', 'Mã dịch vụ đã tồn tại', (value) => {
                        if (service?.id === value) {
                              return true;
                        }
                        const isExists = dataService.dataServices.find((service) => service.id === value);
                        return isExists ? false : true;
                  }),
            isActive: yup.boolean().notRequired(),
            key: yup.string().notRequired(),
            listOption: yup.array().notRequired(),
      });
      const {
            register,
            handleSubmit,
            reset,
            control,
            formState: { errors },
      } = useForm<ServiceType>({ resolver: yupResolver(schema), defaultValues: service });

      useEffect(() => {
            const infoService = dataService.dataServices.find((service: ServiceType) => service.key === id);
            setService(infoService);
            reset(infoService);
      }, [dataService.dataServices, id, reset]);

      const onFormSubmit: SubmitHandler<ServiceType> = async (data) => {
            try {
                  await dispatch(updateService(data));
                  await dispatch(
                        addActionHistory({
                              description: `Cập nhật dịch vụ: ${data.id} - ${data.name}`,
                              keyUser: dataUser.currentUser.key,
                        }),
                  );

                  toast.success('Cập nhật thành công', { theme: 'dark' });
                  navigate(routesConfig.listServices);
            } catch (error) {
                  console.log(error);
            }
      };

      const optionServices: CheckboxOptionType[] = [
            {
                  label: (
                        <div className={cx('object')}>
                              <span className={cx('key')}>Tăng tự động từ:</span>
                              <span className={cx('value')}>
                                    <span className={cx('text-special')}>0001</span>
                                    &nbsp; đến &nbsp;
                                    <span className={cx('text-special')}>9999</span>
                              </span>
                        </div>
                  ),
                  value: 'autoBoost',
            },
            {
                  label: (
                        <div className={cx('object')} style={{ margin: '4px 0px' }}>
                              <span className={cx('key')}>Prefix:</span>
                              <span className={cx('value')}>
                                    <span className={cx('text-special')}>0001</span>
                              </span>
                        </div>
                  ),
                  value: 'prefix',
            },
            {
                  label: (
                        <div className={cx('object')} style={{ margin: '4px 0px' }}>
                              <span className={cx('key')}>Suffix:</span>
                              <span className={cx('value')}>
                                    <span className={cx('text-special')}>0001</span>
                              </span>
                        </div>
                  ),
                  value: 'suffix',
            },
            {
                  label: (
                        <div className={cx('object')}>
                              <span className={cx('key')}>Reset mỗi ngày</span>
                        </div>
                  ),
                  value: 'resetEveryday',
            },
      ];

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
                                                {errors.id?.message && (
                                                      <span className={cx('errorMessage')}>{errors.id?.message}</span>
                                                )}
                                          </p>
                                          <input
                                                disabled
                                                className={cx('input-field')}
                                                type="text"
                                                placeholder="Nhập mã dịch vụ"
                                                {...register('id')}
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
                              <Controller
                                    name="listOption"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field: { value, onChange } }) => (
                                          <CustomizeCheckbox
                                                showCheckAll={false}
                                                defaultCheckedList={value}
                                                onChange={onChange}
                                                options={optionServices}
                                          />
                                    )}
                              />
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
                              <button onClick={() => navigate(-1)} type="button" className={cx('btn', 'btn-btnCancel')}>
                                    Hủy bỏ
                              </button>
                              <button type="submit" className={cx('btn', 'btn-btnUpdate')}>
                                    Cập nhật
                              </button>
                        </div>
                  </form>
            </div>
      );
};
