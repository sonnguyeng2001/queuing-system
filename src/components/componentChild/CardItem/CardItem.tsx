import './CardItem.css';
import classNames from 'classnames/bind';
import style from './CardItem.module.scss';
import { Card } from 'antd';

import { CardItemType } from '../../propsType/CardItemProps';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);

type CardProps = {
      children: CardItemType;
};

export const CardItem = (props: CardProps) => {
      return (
            <Link to={props.children.to}>
                  <Card hoverable={true} className={cx('card-wrapper')} id="cardItem">
                        <div className={cx('first-row')}>
                              <span className={cx('logoCard')}>{props.children.LogoCard}</span>
                              <span className={cx('title')}>{props.children.title}</span>
                        </div>
                        <div className={cx('second-row')}>
                              <span className={cx('quantity')}>{props.children.quantity?.toLocaleString('vi')} </span>
                              <span className={cx('percent')}>
                                    <span className={cx('percent-logo')}>
                                          {props.children.LogoUp || props.children.LogoDown}
                                    </span>
                                    <span className={cx('percent-quantity')}>{props.children.percent}%</span>
                              </span>
                        </div>
                  </Card>
            </Link>
      );
};
