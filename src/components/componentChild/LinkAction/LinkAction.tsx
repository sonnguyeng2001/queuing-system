import style from './LinkAction.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import React from 'react';

const cx = classNames.bind(style);

type LinkType = {
      type: 'Link';
      logo: any;
      to: string;
      title: string;
      className?: string;
};

type ButtonType = {
      type: 'button';
      logo: any;
      title: string;
      className?: string;
      onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

type CustomizeButtonType = LinkType | ButtonType;

export const CustomizeButton = (props: CustomizeButtonType) => {
      if (props.type === 'Link') {
            return (
                  <div className={cx('wrapper')}>
                        <Link to={props.to} className={cx('LinkAction')}>
                              {props.logo}
                              <p>{props.title}</p>
                        </Link>
                  </div>
            );
      }

      if (props.type === 'button') {
            return (
                  <div className={cx('wrapper')}>
                        <button onClick={props.onClick} type="button" className={cx('ButtonAction')}>
                              {props.logo}
                              <p>{props.title}</p>
                        </button>
                  </div>
            );
      }
      return <span>Errors</span>;
};
