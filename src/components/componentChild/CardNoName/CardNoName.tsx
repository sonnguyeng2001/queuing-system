import './CardNoName.css';
import classNames from 'classnames/bind';
import style from './CardNoName.module.scss';
import { Progress, Card } from 'antd';
import { CardNoNameType } from '../../propsType/CardNoNameProps';

const cx = classNames.bind(style);

type CardType = {
      children: CardNoNameType;
};

export const CardNoName = (props: CardType) => {
      const total = props.children.options.reduce((prev, current) => {
            return prev + current.number;
      }, 0);

      const getActive = props.children.options.find((value) => value.type === 'active');
      const getUnActive = props.children.options.find((value) => value.type === 'unActive');
      const getSkip = props.children.options.find((value) => value.type === 'skip');

      const valueActive = getActive?.number || 0;
      const valueUnActive = getUnActive?.number || 0;
      const valueSkip = getSkip?.number || 0;

      const colorActive = getActive?.color || 'transparent';
      const colorUnActive = getUnActive?.color || 'transparent';
      const colorSkip = getSkip?.color || 'transparent';

      const percentActive = (valueActive / total) * 100;
      const percentUnActive = (valueUnActive / total) * 100;
      const percentSkip = (valueSkip / total) * 100;

      return (
            <Card hoverable={true} className={cx('wrapper')} id="cardNoName">
                  <div className={cx('progress-circle')}>
                        <div className={cx('showPercent')}>{Math.floor(percentActive)}%</div>
                        <div className={cx('circle')}>
                              <Progress
                                    strokeWidth={5}
                                    width={60}
                                    strokeLinecap="round"
                                    strokeColor={colorActive}
                                    type="circle"
                                    percent={percentActive}
                              />
                        </div>
                        <div className={cx('circle')}>
                              <Progress
                                    strokeWidth={5}
                                    width={50}
                                    strokeLinecap="round"
                                    strokeColor={colorUnActive}
                                    type="circle"
                                    percent={percentUnActive}
                              />
                        </div>

                        {getSkip && (
                              <div className={cx('circle')}>
                                    <Progress
                                          strokeWidth={5}
                                          width={40}
                                          strokeLinecap="round"
                                          strokeColor={colorSkip}
                                          type="circle"
                                          percent={percentSkip}
                                    />
                              </div>
                        )}
                  </div>
                  <div className={cx('info')}>
                        <h3>{total}</h3>
                        <div>
                              <span style={{ color: props.children.colorPrimary }}>{props.children.logo}</span>
                              <span style={{ color: props.children.colorPrimary }}>{props.children.title}</span>
                        </div>
                  </div>
                  <div className={cx('status')}>
                        {props.children.options.map((option, index) => {
                              return (
                                    <p key={index}>
                                          <span style={{ color: option.color }}>&bull;</span>
                                          <span>{option.title}</span>
                                          <span style={{ color: props.children.colorPrimary }}>{option.number}</span>
                                    </p>
                              );
                        })}
                  </div>
            </Card>
      );
};
