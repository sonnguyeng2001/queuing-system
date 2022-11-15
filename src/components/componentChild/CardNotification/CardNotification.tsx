import classNames from 'classnames/bind';
import style from './CardNotification.module.scss';
import { LogoDevices } from '../../../assets/svg/LogoDevices';
import { CardNoNameType } from '../../propsType/CardNoNameProps';
import { CardNotificationType } from '../../propsType/CardNotificationProps';

const cx = classNames.bind(style);

interface CardNotificationProps {
      children: CardNotificationType;
}

export const CardNotification = (props: CardNotificationProps) => {
      return (
            <div className={cx('wrapper')}>
                  <h2 className={cx('user-name')}>Người dùng: {props.children.username}</h2>
                  <h2 className={cx('time')}>
                        Thời gian nhận số: {props.children.time} ngày {props.children.date}
                  </h2>
            </div>
      );
};
