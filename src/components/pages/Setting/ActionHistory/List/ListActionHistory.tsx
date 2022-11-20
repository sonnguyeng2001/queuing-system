import './ListActionHistory.css';
import style from './ListActionHistory.module.scss';
import classNames from 'classnames/bind';
import { DatePicker } from 'antd';
import { LogoArrow } from '../../../../../assets/svg/LogoArrow';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { ActionHistoryType } from '../../../../propsType/ActionHistoryProps';
import { CustomizeTable } from '../../../../componentChild/CustomizeTable/CustomizeTable';
import { CustomizeButton } from '../../../../componentChild/LinkAction/LinkAction';
import { LogoDownload } from '../../../../../assets/svg/LogoDownload';
import { State } from '../../../../../redux/store';
import moment from 'moment';
import * as XLSX from 'xlsx';
const cx = classNames.bind(style);

export const ListActionHistory = () => {
      const dataRef = useRef<ActionHistoryType[] | []>([]);
      const [dataSource, setDataSource] = useState<ActionHistoryType[] | []>([]);
      const dataActionHistory = useSelector((state: State) => state.actionHistory);
      const dataUser = useSelector((state: State) => state.user);
      const selectedDate = useRef<number[]>([]);

      const columns: any = [
            {
                  title: 'Tên đăng nhập',
                  dataIndex: 'idUsername',
                  width: '20%',
                  sorter: (a: ActionHistoryType, b: ActionHistoryType) => a.idUsername.length - b.idUsername.length,
                  render: (data: string) => {
                        const nameUser = dataUser.data.find((user) => user.key === data);
                        return <span>{nameUser?.userName}</span>;
                  },
            },
            {
                  title: 'Thời gian tác động',
                  dataIndex: 'timeStart',
                  width: '20%',
                  sorter: (a: ActionHistoryType, b: ActionHistoryType) => a.timeStart - b.timeStart,
                  render: (data: number) => {
                        return (
                              <span>{`${moment(data).locale('vi').format('LTS')} -
                               ${moment(data).locale('vi').format('L')}`}</span>
                        );
                  },
            },
            {
                  title: 'IP thực thiện',
                  dataIndex: 'ip',
                  width: '20%',
            },
            {
                  title: 'Thao tác thực hiện',
                  dataIndex: 'desc',
                  width: '40%',
            },
      ];
      useEffect(() => {
            dataRef.current = dataActionHistory.data;
            setDataSource(dataActionHistory.data);
      }, [dataActionHistory.data]);

      const handleChangeDate = (e: moment.Moment | null, type: 'from' | 'to') => {
            const utcTime = e?.utc().valueOf();
            const date = new Date(utcTime!).getDate();
            const month = new Date(utcTime!).getMonth();
            const year = new Date(utcTime!).getFullYear();
            var value = 0;

            if (type === 'from') {
                  value = new Date(year, month, date, 0,0,0).getTime();
                  selectedDate.current[0] = value;
            } else if (type === 'to') {
                  value = new Date(year, month, date, 23, 59,59).getTime();
                  selectedDate.current[1] = value;
            }

            if (selectedDate.current[0] && selectedDate.current[1]) {
                  const dataFilter = dataRef.current.filter(
                        (row) => row.timeStart > selectedDate.current[0] && row.timeStart < selectedDate.current[1],
                  );
                  setDataSource(dataFilter);
                  return;
            }

            if (selectedDate.current[0]) {
                  const dataFilter = dataRef.current.filter((row) => row.timeStart > selectedDate.current[0]);
                  setDataSource(dataFilter);
                  return;
            }

            if (selectedDate.current[1]) {
                  const dataFilter = dataRef.current.filter((row) => row.timeStart < selectedDate.current[1]);
                  setDataSource(dataFilter);
                  return;
            }

            if (!selectedDate.current[1] || !selectedDate.current[0]) {
                  console.log('4');
                  setDataSource(dataRef.current);
                  return;
            }
      };

      const handleExportData = () => {
            const time = moment().locale('vi').format('LT');
            const date = moment().locale('vi').format('L');
            var dataExcel: {
                  userName: string;
                  fullName: string;
                  timeAction: string;
                  ipAction: string;
                  desc: string;
            }[] = [];
            dataSource.forEach((value, index) => {
                  dataUser.data.find(
                        (user) =>
                              user.key === value.idUsername &&
                              dataExcel.push({
                                    userName: user.userName,
                                    fullName: user.fullName,
                                    timeAction: `${moment(value.timeStart).locale('vi').format('LTS')} - ${moment(
                                          value.timeStart,
                                    )
                                          .locale('vi')
                                          .format('L')}`,
                                    ipAction: value.ip,
                                    desc: value.desc,
                              }),
                  );
            });
            var wb = XLSX.utils.book_new();
            var ws = XLSX.utils.json_to_sheet(dataExcel);
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb, `Excel-${time}-${date}.xlsx`);
      };

      const pageSize = 9;
      const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
      return (
            <div className={cx('report-wrapper')}>
                  <div className={cx('select')}>
                        <h3 className={cx('title')}>Chọn thời gian</h3>
                        <div className="selectDateGroup">
                              <DatePicker
                                    className="selectDate"
                                    format={dateFormatList}
                                    popupClassName="popup-date"
                                    placeholder="Từ ngày"
                                    onChange={(e) => handleChangeDate(e, 'from')}
                              />
                              <LogoArrow className="selectDate-logoArrow" />
                              <DatePicker
                                    className="selectDate"
                                    format={dateFormatList}
                                    popupClassName="popup-date"
                                    placeholder="Đến ngày"
                                    onChange={(e) => handleChangeDate(e, 'to')}
                              />
                        </div>
                  </div>
                  <div className="tableReport">
                        <CustomizeTable columns={columns} dataSource={dataSource} pageSize={pageSize} />
                        <CustomizeButton
                              onClick={handleExportData}
                              type="button"
                              title="Tải về"
                              logo={<LogoDownload />}
                        />
                  </div>
            </div>
      );
};
