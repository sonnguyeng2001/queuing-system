import style from './ListRole.module.scss';
import classNames from 'classnames/bind';
import { HeaderContent } from '../../../../componentChild/HeaderContent/HeaderContent';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getRoles } from '../../../../../redux/features/RoleSlice';
import { RoleProps } from '../../../../propsType/RoleProps';
import { CustomizeTable } from '../../../../componentChild/CustomizeTable/CustomizeTable';
import { LinkAction } from '../../../../componentChild/LinkAction/LinkAction';
import { LogoPlus } from '../../../../../assets/svg/LogoPlus';
import { routesConfig } from '../../../../../routes/routeConfig';
import { Link } from 'react-router-dom';
import { LogoSearch } from '../../../../../assets/svg/LogoSearch';
import useDebounce from '../../../../../Hooks/useDebound';
const cx = classNames.bind(style);

const columns = [
      {
            title: 'Tên vai trò',
            dataIndex: 'roleName',
      },
      {
            title: 'Số người dùng',
            dataIndex: 'roleUserCount',
      },
      {
            title: 'Mô tả',
            dataIndex: 'roleDescription',
      },
      {
            title: 'Update Action',
            dataIndex: 'updateAction',
            render: (data: string) => {
                  return (
                        <>
                              <Link
                                    className="text-underline"
                                    to={`${routesConfig.updateRole.replace(
                                          '/:id',
                                          '',
                                    )}/${data.replace('Cập nhật', '')}`}
                              >
                                    Cập nhật
                              </Link>
                        </>
                  );
            },
      },
];

export const ListRole = () => {
      const dispatch = useDispatch<any>();
      const [dataSource, setDataSource] = useState<RoleProps[] | []>([]);
      const [inputSearch, setInputSearch] = useState<string>('');
      const dataSourceRef = useRef<RoleProps[] | []>([]);

      const fetchData = async () => {
            const response = await dispatch(getRoles());
            const newArray = response.payload.map((role: RoleProps) => {
                  return {
                        ...role,
                        updateAction: `Cập nhật${role.key}`,
                  };
            });

            return newArray;
      };
      useEffect(() => {
            fetchData().then((data) => {
                  setDataSource(data);
                  dataSourceRef.current = data;
            });
      }, [dispatch]);

      const debouncedValue = useDebounce(inputSearch, 500);
      useEffect(() => {
            setDataSource(
                  dataSourceRef.current.filter((key) =>
                        key.roleName
                              .toString()
                              .toLowerCase()
                              .includes(debouncedValue.toLowerCase()),
                  ),
            );
      }, [debouncedValue]);

      const handleChangeInput = (e: any) => {
            const searchValue = e.target.value;
            if (!searchValue.startsWith(' ')) {
                  setInputSearch(e.target.value);
            }
      };

      const pageSize = 7;
      return (
            <div className={cx('settingRoleWrapper')}>
                  <HeaderContent title="Danh sách vai trò" />
                  <div className={cx('actionHeader')}>
                        <div className={cx('searchArea')}>
                              <h3 className={cx('title')}>Từ khóa</h3>
                              <input
                                    value={inputSearch}
                                    onChange={handleChangeInput}
                                    type="text"
                                    placeholder="Nhập từ khóa..."
                                    className={cx('content')}
                              />
                              <LogoSearch className={cx('logo-arrow')} />
                        </div>
                  </div>
                  <div className={cx('table-settingRole')}>
                        <CustomizeTable
                              columns={columns}
                              dataSource={dataSource}
                              pageSize={pageSize}
                        />

                        <LinkAction
                              logo={<LogoPlus />}
                              title="Thêm vai trò"
                              to={routesConfig.addRole}
                        />
                  </div>
            </div>
      );
};
