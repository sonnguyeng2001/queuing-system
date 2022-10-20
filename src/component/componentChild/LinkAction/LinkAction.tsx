import style from './LinkAction.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(style);

type LinkActionType = {
   logo: any;
   title: string;
   to: string;
   className?: string;
};

export const LinkAction = (props: LinkActionType) => {
   return (
      <div className={cx('wrapper', props.className)}>
         <Link to={props.to} className={cx('LinkAction')}>
            {props.logo}
            <p>{props.title}</p>
         </Link>
      </div>
   );
};
