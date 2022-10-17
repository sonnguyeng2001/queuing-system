import { Link } from 'react-router-dom';
import { routesConfig } from '../../../../routes/routeConfig';
import style from './ListDevices.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);
export const ListDevices = () => {
   return (
      <div className={cx('wrapper')}>
         <Link to={routesConfig.deleteDevices}>Delete Delete divices page</Link>
         <h2 className={cx('heading')}>Danh sách thiết bị</h2>
         <div className={cx('listSelect')}>
            <div className={cx('select', 'selectActive')}>
               <h3 className={cx('title')}>Trạng thái hoạt động</h3>
               <select className={cx('content')}>
                  <option value="All">Tất cả</option>
                  <option value="Active">Hoạt động</option>
                  <option value="Stop">Ngưng hoạt động</option>
               </select>
            </div>
            <div className={cx('select', 'selectConnect')}>
               <h3 className={cx('title')}>Trạng thái kết nối</h3>
               <select className={cx('content')}>
                  <option value="All">Tất cả</option>
                  <option value="Connected">Kết nối</option>
                  <option value="Disconnected">Mất kết nối</option>
               </select>
            </div>
            <div className={cx('select', 'search')}>
               <h3 className={cx('title')}>Từ khóa</h3>
               <input type="text" placeholder="Nhập từ khóa" />
            </div>
         </div>
      </div>
   );
};
