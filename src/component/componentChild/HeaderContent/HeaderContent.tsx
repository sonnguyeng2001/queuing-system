import classNames from 'classnames/bind';
import style from './HeaderContent.module.scss';

const cx = classNames.bind(style);

type TitleProps = {
   title: string;
};
export const HeaderContent = (props: TitleProps, anyProps: any) => {
   return (
      <h2 className={cx('title')} {...anyProps}>
         {props.title}
      </h2>
   );
};
