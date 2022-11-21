import style from './AddRole.module.scss';
import classNames from 'classnames/bind';
import { HeaderContent } from '../../../../componentChild/HeaderContent/HeaderContent';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RoleType } from '../../../../propsType/RoleProps';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../../../redux/store';
import { addRole } from '../../../../../redux/features/RoleSlice';
import { CustomizeCheckbox } from '../../../../componentChild/CustomizeCheckbox/CustomizeCheckbox';
import uuid from 'react-uuid';
import { routesConfig } from '../../../../../routes/routeConfig';
import { CheckboxOptionType } from 'antd/lib/checkbox';
import { toast } from 'react-toastify';
const cx = classNames.bind(style);

export const AddRole = () => {
      const navigate = useNavigate();
      const dataRole = useSelector((state: State) => state.role);
      const dispatch = useDispatch<any>();

      const schema: yup.SchemaOf<Partial<RoleType>> = yup.object({
            key: yup.string().notRequired(),
            roleUserCount: yup.number().notRequired(),
            roleDescription: yup.string().required('Vui lòng điền vào trường này'),
            roleName: yup
                  .string()
                  .required('Vui lòng điền vào trường này')
                  .test('isExists', 'Vai trò đã tồn tại', (value) => {
                        const isExists = dataRole.data.find(
                              (role) => role.roleName.toLowerCase().trim() === value?.toLowerCase().trim(),
                        );
                        return isExists ? false : true;
                  }),
            roleTaskA: yup.array().notRequired(),
            roleTaskB: yup.array().notRequired(),
            roleTaskC: yup
                  .array()
                  .notRequired()
                  .test('required', 'Vui lòng chọn ít nhất 1 dịch vụ', (value, ctx) => {
                        const lengthTaskA =
                              ctx.parent.roleTaskA === undefined || ctx.parent.roleTaskA.length === 0
                                    ? 0
                                    : ctx.parent.roleTaskA.length;
                        const lengthTaskB =
                              ctx.parent.roleTaskB === undefined || ctx.parent.roleTaskB.length === 0
                                    ? 0
                                    : ctx.parent.roleTaskB.length;
                        const lengthTaskC = value === undefined || value.length === 0 ? 0 : value.length;
                        if (lengthTaskA + lengthTaskB + lengthTaskC >= 1) {
                              return true;
                        }
                        return false;
                  }),
      });

      const {
            register,
            handleSubmit,
            formState: { errors },
            control,
      } = useForm<RoleType>({
            resolver: yupResolver(schema),
      });

      const onSubmit: SubmitHandler<RoleType> = async (data) => {
            const dataWithKey = { ...data, key: uuid().slice(0, 8).toUpperCase(), roleUserCount: 0 };
            await dispatch(addRole(dataWithKey))
                  .then((response: RoleType) => {
                        response && toast.success('Thêm thành công', { theme: 'dark' });
                        navigate(routesConfig.listRole);
                  })
                  .catch((errors: any) => {
                        toast.error('Thêm thất bại', { theme: 'dark' });
                        console.log(errors);
                  });
      };

      const checkboxOptionA: CheckboxOptionType[] = [
            { value: 'Ax', label: 'Chức năng Ax' },
            { value: 'Ay', label: 'Chức năng Ay' },
            { value: 'Az', label: 'Chức năng Az' },
      ];
      const checkboxOptionB: CheckboxOptionType[] = [
            { value: 'Bx', label: 'Chức năng Bx' },
            { value: 'By', label: 'Chức năng By' },
            { value: 'Bz', label: 'Chức năng Bz' },
      ];
      const checkboxOptionC: CheckboxOptionType[] = [
            { value: 'Cx', label: 'Chức năng Cx' },
            { value: 'Cy', label: 'Chức năng Cy' },
            { value: 'Cz', label: 'Chức năng Cz' },
      ];

      return (
            <div className={cx('AddRole-Wrapper')}>
                  <HeaderContent title="Danh sách vai trò" />

                  <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={cx('wrapper-content')}>
                              <header className={cx('header-content')}>Thông tin vai trò</header>
                              <div className={cx('content')}>
                                    <div className={cx('content-left')}>
                                          <div className={cx('double-object')}>
                                                <div className={cx('object')}>
                                                      <p className={cx('label')}>
                                                            Tên vai trò:
                                                            <span className={cx('required')}>*</span>{' '}
                                                      </p>
                                                      <input
                                                            className={cx('input-field')}
                                                            type="text"
                                                            placeholder="Nhập tên vai trò"
                                                            {...register('roleName')}
                                                      />
                                                      {errors.roleName?.message && (
                                                            <span className={cx('errorMessage')}>
                                                                  {errors.roleName?.message}
                                                            </span>
                                                      )}
                                                </div>
                                                <div className={cx('object')}>
                                                      <p className={cx('label')}>
                                                            Mô tả: <span className={cx('required')}>*</span>{' '}
                                                      </p>
                                                      <div style={{ height: '76%' }}>
                                                            <textarea
                                                                  style={{ height: '100%' }}
                                                                  rows={4}
                                                                  className={cx('input-field')}
                                                                  placeholder="Nhập mô tả"
                                                                  {...register('roleDescription')}
                                                            />
                                                            {errors.roleDescription?.message && (
                                                                  <span className={cx('errorMessage')}>
                                                                        {errors.roleDescription?.message}
                                                                  </span>
                                                            )}
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
                                                            <span className={cx('required')}>*</span>{' '}
                                                            {(errors.roleTaskA?.message ||
                                                                  errors.roleTaskB?.message ||
                                                                  errors.roleTaskC?.message) && (
                                                                  <span className={cx('errorMessage')}>
                                                                        {errors.roleTaskA?.message ||
                                                                              errors.roleTaskB?.message ||
                                                                              errors.roleTaskC?.message}
                                                                  </span>
                                                            )}
                                                      </p>
                                                </div>
                                                <div className={cx('object', 'listCheckbox')}>
                                                      <div className={cx('checkbox', 'checkboxA')}>
                                                            <h3 className={cx('heading-checkbox')}>Nhóm chức năng A</h3>
                                                            <Controller
                                                                  name="roleTaskA"
                                                                  control={control}
                                                                  rules={{ required: true }}
                                                                  render={({ field: { value = [], onChange } }) => (
                                                                        <CustomizeCheckbox
                                                                              showCheckAll={true}
                                                                              defaultCheckedList={value}
                                                                              onChange={onChange}
                                                                              options={checkboxOptionA}
                                                                        />
                                                                  )}
                                                            />
                                                      </div>
                                                      {/* ------------------------------------------------------------------------------------------------------- */}
                                                      <div className={cx('checkbox', 'checkboxB')}>
                                                            <h3 className={cx('heading-checkbox')}>Nhóm chức năng B</h3>
                                                            <Controller
                                                                  name="roleTaskB"
                                                                  control={control}
                                                                  rules={{ required: true }}
                                                                  render={({ field: { value = [], onChange } }) => (
                                                                        <CustomizeCheckbox
                                                                              showCheckAll={true}
                                                                              defaultCheckedList={value}
                                                                              onChange={onChange}
                                                                              options={checkboxOptionB}
                                                                        />
                                                                  )}
                                                            />
                                                      </div>
                                                      {/* ------------------------------------------------------------------------------------------------------- */}
                                                      <div className={cx('checkbox', 'checkboxC')}>
                                                            <h3 className={cx('heading-checkbox')}>Nhóm chức năng C</h3>
                                                            <Controller
                                                                  name="roleTaskC"
                                                                  control={control}
                                                                  rules={{ required: true }}
                                                                  render={({ field: { value = [], onChange } }) => (
                                                                        <CustomizeCheckbox
                                                                              showCheckAll={true}
                                                                              defaultCheckedList={value}
                                                                              onChange={onChange}
                                                                              options={checkboxOptionC}
                                                                        />
                                                                  )}
                                                            />
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <div className={cx('wrapper-btn')}>
                              <button onClick={() => navigate(-1)} type="button" className={cx('btn', 'btn-btnCancel')}>
                                    Hủy bỏ
                              </button>
                              <button type="submit" className={cx('btn', 'btn-btnAdd')}>
                                    Thêm vai trò
                              </button>
                        </div>
                  </form>
            </div>
      );
};
