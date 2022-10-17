import classNames from 'classnames/bind';
import style from './CardNoName.module.scss';
import { Progress } from 'antd';
import { LogoDevices } from '../../../assets/svg/LogoDevices';
import { CardNoNameType } from '../../propsType/CardNoNameProps';

const cx = classNames.bind(style);

type CardType = {
   children: CardNoNameType;
};

export const CardNoName = (props: CardType) => {
   const percentActive = Math.floor((props.children.activeNumber / props.children.total) * 100);
   return (
      <div className={cx('wrapper')}>
         <div className={cx('progress-circle')}>
            <div className={cx('circle')}>
               <Progress
                  strokeWidth={5}
                  width={60}
                  strokeLinecap="round"
                  strokeColor={props.children.color}
                  type="circle"
                  percent={percentActive}
               />
            </div>
            <div className={cx('circle')}>
               <Progress
                  strokeWidth={5}
                  width={50}
                  strokeLinecap="round"
                  strokeColor="var(--color-gray-300)"
                  type="circle"
                  percent={100 - percentActive}
               />
            </div>
            <div className={cx('circle')}>{percentActive}%</div>
         </div>
         <div className={cx('info')}>
            <h3>{props.children.total}</h3>
            <div>
               <span style={{ color: props.children.color }}>{props.children.logo}</span>
               <span style={{ color: props.children.color }}>{props.children.title}</span>
            </div>
         </div>
         <div className={cx('status')}>
            <p>
               <span style={{ color: props.children.color }}>&bull;</span>
               <span>Đang hoạt động</span>
               <span style={{ color: props.children.color }}>{props.children.activeNumber}</span>
            </p>
            <p>
               <span>&bull;</span>
               <span>Ngưng hoạt động</span>
               <span style={{ color: props.children.color }}>{props.children.stopNumber}</span>
            </p>
         </div>
      </div>
   );
};
