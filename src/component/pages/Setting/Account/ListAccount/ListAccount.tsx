import style from './ListAccount.module.scss';
import classNames from 'classnames/bind';
import { HeaderContent } from '../../../../componentChild/HeaderContent/HeaderContent';
const cx = classNames.bind(style);

export const ListAccount = () => {
   return (
      <div className={cx('ListAccount-Wrapper')}>
         <HeaderContent title="ListAccount" />
      </div>
   );
};
