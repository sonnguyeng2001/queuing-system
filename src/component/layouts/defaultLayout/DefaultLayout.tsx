import classNames from 'classnames/bind';
import React from 'react';

import { Header } from '../header/Header';
import { Sidebar } from '../sidebar/Sidebar';
import style from './DefaultLayout.module.scss';
const cx = classNames.bind(style);

type ComponentProps = {
   component: React.ReactNode;
};

export const DefaultLayout = (children: ComponentProps) => {
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
