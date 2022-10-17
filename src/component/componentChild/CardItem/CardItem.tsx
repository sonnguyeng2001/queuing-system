import classNames from 'classnames/bind';
import style from './CardItem.module.scss';
import { Card } from 'antd';
import { LogoCalendar } from '../../../assets/svg/LogoCalendar';
import { CardItemType } from '../../propsType/CardItemProps';
const cx = classNames.bind(style);

type CardProps = {
   children: CardItemType;
};

export const CardItem = (props: CardProps) => {
   return (
      <Card hoverable={true} className={cx('card-wrapper')}>
         <div className={cx('first-row')}>
            <span className={cx('logoCard')}>{props.children.LogoCard}</span>
            <span className={cx('title')}>{props.children.title}</span>
         </div>
         <div className={cx('second-row')}>
            <span className={cx('quantity')}>{props.children.quantity} </span>
            <span className={cx('percent')}>
               <span className={cx('percent-logo')}>
                  {props.children.LogoUp || props.children.LogoDown}
               </span>
               <span className={cx('percent-quantity')}>{props.children.percent}%</span>
            </span>
         </div>
      </Card>
   );
};