import classNames from 'classnames/bind';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDevices } from '../../../redux/features/DeviceSlice';

import { Header } from '../header/Header';
import { Sidebar } from '../sidebar/Sidebar';
import style from './DefaultLayout.module.scss';
const cx = classNames.bind(style);

type ComponentProps = {
      component: React.ReactNode;
};

export const DefaultLayout = (children: ComponentProps) => {
      const dispatch = useDispatch<any>();
      useEffect(() => {
            dispatch(getDevices());
      }, [dispatch]);
      return (
            <div className={cx('wrapper')}>
                  <div className={cx('sidebar')}>
                        <Sidebar />
                  </div>
                  <div className={cx('content')}>
                        <Header />
                        <div className={cx('children')}>{children.component}</div>
                  </div>
            </div>
      );
};
