import classNames from 'classnames/bind';
import style from './CardNotification.module.scss';
import { CustomerServiceType } from '../../propsType/CustomerServiceProps';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { routesConfig } from '../../../routes/routeConfig';

const cx = classNames.bind(style);

interface CardNotificationProps {
      children: CustomerServiceType;
}

export const CardNotification = (props: CardNotificationProps) => {
      return (
            <Link to={`${routesConfig.detailsCustomerService.replace(':id', '')}${props.children.key}`}>
                  <div className={cx('wrapper')}>
                        <h2 className={cx('user-name')}>Người dùng: {props.children.customerName}</h2>
                        <h2 className={cx('time')}>
                              Thời gian nhận số: {moment(props.children.timeStart).format('LT')} ngày{' '}
                              {moment(props.children.timeStart).format('L')}
                        </h2>
                  </div>
            </Link>
      );
};
