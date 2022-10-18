import classNames from 'classnames/bind';
import style from './HeaderContent.module.scss';

const cx = classNames.bind(style);

type TitleProps = {
   title: string;
};
export const HeaderContent = (props: TitleProps) => {
   return <h2 className={cx('title')}>{props.title}</h2>;
};
