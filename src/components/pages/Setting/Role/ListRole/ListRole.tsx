import style from './ListRole.module.scss';
import classNames from 'classnames/bind';
import { HeaderContent } from '../../../../componentChild/HeaderContent/HeaderContent';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { RoleType } from '../../../../propsType/RoleProps';
import { CustomizeTable } from '../../../../componentChild/CustomizeTable/CustomizeTable';
import { CustomizeButton } from '../../../../componentChild/LinkAction/LinkAction';
import { LogoPlus } from '../../../../../assets/svg/LogoPlus';
import { routesConfig } from '../../../../../routes/routeConfig';
import { Link } from 'react-router-dom';
import { LogoSearch } from '../../../../../assets/svg/LogoSearch';
import useDebounce from '../../../../../Hooks/useDebound';
import { State } from '../../../../../redux/store';
const cx = classNames.bind(style);

const columns = [
      {
            title: 'Tên vai trò',
            dataIndex: 'roleName',
            width: '10%',
      },
      {
            title: 'Số người dùng',
            dataIndex: 'roleUserCount',
            width: '13%',
      },
      {
            title: 'Mô tả',
            dataIndex: 'roleDescription',
            render: (data: string) => {
                  return <span className="text-limited">{data}</span>;
            },
      },
      {
            title: '',
            dataIndex: 'updateAction',
            width: '10%',
            render: (data: string) => {
                  return (
                        <>
                              <Link
                                    className="text-underline"
                                    to={`${routesConfig.updateRole.replace('/:id', '')}/${data.replace(
                                          'Cập nhật',
                                          '',
                                    )}`}
                              >
                                    Cập nhật
                              </Link>
                        </>
                  );
            },
      },
];

export const ListRole = () => {
      const [dataSource, setDataSource] = useState<RoleType[] | []>([]);
      const [inputSearch, setInputSearch] = useState<string>('');
      const dataSourceRef = useRef<RoleType[] | []>([]);
      const dataRole = useSelector((state: State) => state.role);

      useEffect(() => {
            const newArray = dataRole.data.map((role: RoleType) => {
                  return {
                        ...role,
                        updateAction: `Cập nhật${role.key}`,
                  };
            });
            setDataSource(newArray);
            dataSourceRef.current = newArray;
      }, [dataRole.data]);

      const debouncedValue = useDebounce(inputSearch, 500);
      useEffect(() => {
            debouncedValue &&
                  setDataSource(
                        dataSourceRef.current.filter((key) => {
                              return key.roleName.toLowerCase().includes(debouncedValue.toLowerCase());
                        }),
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
                        <CustomizeTable columns={columns} dataSource={dataSource} pageSize={pageSize} />

                        <CustomizeButton type='Link' logo={<LogoPlus />} title="Thêm vai trò" to={routesConfig.addRole} />
                  </div>
            </div>
      );
};
