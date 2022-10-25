import style from './UpdateRole.module.scss';
import classNames from 'classnames/bind';
import { HeaderContent } from '../../../../componentChild/HeaderContent/HeaderContent';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(style);

export const UpdateRole = () => {
   const { id } = useParams();
   return (
      <div className={cx('UpdateRole-Wrapper')}>
         <HeaderContent title="Update Role" />
         <h2>Role ID: {id}</h2>
      </div>
   );
};
