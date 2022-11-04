import style from './ListAccount.module.scss';
import classNames from 'classnames/bind';
import { HeaderContent } from '../../../../componentChild/HeaderContent/HeaderContent';
import { routesConfig } from '../../../../../routes/routeConfig';
import { LogoPlus } from '../../../../../assets/svg/LogoPlus';
import { LinkAction } from '../../../../componentChild/LinkAction/LinkAction';
import { CustomizeTable } from '../../../../componentChild/CustomizeTable/CustomizeTable';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from '../../../../../redux/store';
import { UserType } from '../../../../propsType/UserProps';
import { LogoSearch } from '../../../../../assets/svg/LogoSearch';
import { LogoArrow } from '../../../../../assets/svg/LogoArrow';
import { Select } from 'antd';
const cx = classNames.bind(style);

const columns: any = [
      {
            title: 'Tên đăng nhập',
            dataIndex: 'userName',
            sorter: (a: UserType, b: UserType) => a.userName.length - b.userName.length,
      },
      {
            title: 'Họ tên',
            dataIndex: 'fullName',
      },
      {
            title: 'Số điện thoại',
            dataIndex: 'phone',
      },
      {
            title: 'Email',
            dataIndex: 'email',
      },
      {
            title: 'Vai trò',
            dataIndex: 'roleName',
      },
      {
            title: 'Trạng thái hoạt động',
            dataIndex: 'active',
            render: (status: boolean) => {
                  return status ? (
                        <>
                              <span style={{ color: 'var(--color-green)', marginRight: '10px' }}>&#9679;</span>
                              <span> Kết nối</span>
                        </>
                  ) : (
                        <>
                              <span style={{ color: 'var(--color-red)', marginRight: '10px' }}>&#9679;</span>
                              <span> Mất kết nối</span>
                        </>
                  );
            },
            sorter: (a: UserType, b: UserType) => Number(a.active) - Number(b.active),
      },
      {
            title: '',
            dataIndex: 'actionUpdate',
            render: (data: string) => {
                  return (
                        <>
                              <Link
                                    className="text-underline"
                                    to={`${routesConfig.updateAccount.replace('/:id', '')}/${data.replace(
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
export const ListAccount = () => {
      const [dataSource, setDataSource] = useState<UserType[] | []>([]);
      const dataAccount = useSelector((state: State) => state.user);
      const dataAccountRef = useRef<UserType[] | []>([]);

      useEffect(() => {
            const response = dataAccount.data.map((user) => {
                  return {
                        ...user,
                        actionUpdate: `Cập nhật${user.key}`,
                  };
            });
            setDataSource(response);
            dataAccountRef.current = response;
      }, []);

      const handleChangeSelect = (value: string) => {
            alert(value);
      };
      return (
            <div className={cx('ListAccount-Wrapper')}>
                  <div className={cx('wrapper-content')}>
                        <HeaderContent title="Danh sách tài khoản" />
                        <div className={cx('listSelect')}>
                              <div className={cx('select', 'selectActive')}>
                                    <div>
                                          <h3 className={cx('title')}>Tên vai trò</h3>
                                          <Select defaultValue="all" onSelect={handleChangeSelect}>
                                                <Select.Option value="all">Tất cả</Select.Option>
                                                <Select.Option value="stateActive/active">Hoạt động</Select.Option>
                                                <Select.Option value="stateActive/stop">Ngưng hoạt động</Select.Option>
                                          </Select>
                                          <LogoArrow className={cx('logo-arrow')} />
                                    </div>
                              </div>
                              <div className={cx('select', 'search')}>
                                    <div>
                                          <div className={cx('title')}>Từ khóa</div>
                                          <input
                                                // onChange={handleChangeInput}
                                                // value={inputSearch}
                                                type="text"
                                                placeholder="Nhập từ khóa..."
                                                className={cx('content')}
                                          />
                                          <LogoSearch className={cx('logo-arrow')} />
                                    </div>
                              </div>
                        </div>
                        <div className={cx('table-account')}>
                              <CustomizeTable columns={columns} dataSource={dataSource} pageSize={7} />
                              <LinkAction title="Thêm tài khoản" to={routesConfig.addAccount} logo={<LogoPlus />} />
                        </div>
                  </div>
            </div>
      );
};
