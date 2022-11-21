import classNames from 'classnames/bind';
import style from './PageLoading.module.scss';

const cx = classNames.bind(style);

const PageLoading = () => {
      return (
            <div className={cx('wrapper')}>
                  <div className={cx('lds-ellipsis')}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                  </div>
            </div>
      );
};
export default PageLoading;
