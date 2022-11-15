import './CustomizeCheckbox.css';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useEffect, useState } from 'react';
import { CheckboxType } from '../../propsType/CheckboxProps';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { CheckboxOptionType } from 'antd/lib/checkbox';

// export const CustomizeCheckbox = (props: CheckboxType) => {
//       const [checkedList, setCheckedList] = useState<CheckboxValueType[] | undefined>([]);
//       const [checkAll, setCheckAll] = useState(false);

//       useEffect(() => {
//             setCheckedList(props.defaultCheckedList);
//             setCheckAll(props.options.length === props.defaultCheckedList?.length);
//       }, [props.defaultCheckedList]);
//       const onCheckAllChange = (e: CheckboxChangeEvent) => {
//             setCheckedList(e.target.checked ? props.options : []);
//             props.onChange(e.target.checked ? props.options : []);
//             setCheckAll(e.target.checked);
//       };

//       const handleChange = (list: CheckboxValueType[]) => {
//             setCheckedList(list);
//             setCheckAll(list.length === props.options.length);
//             props.onChange(list);
//       };

//       return (
//             <>
//                   <Checkbox onChange={onCheckAllChange} checked={checkAll}>
//                         Tất cả
//                   </Checkbox>
//                   <Checkbox.Group options={props.options} value={checkedList} onChange={handleChange} />
//             </>
//       );
// };

export const CustomizeCheckbox = (props: CheckboxType) => {
      const [checkedList, setCheckedList] = useState<CheckboxValueType[] | undefined>([]);
      const [checkAll, setCheckAll] = useState(false);

      useEffect(() => {
            setCheckedList(props.defaultCheckedList);
            setCheckAll(props.options.length === props.defaultCheckedList?.length);
      }, [props.defaultCheckedList]);

      const onCheckAllChange = (e: CheckboxChangeEvent) => {
            const arrayOption: CheckboxValueType[] = props.options.map((option) => option.value);
            setCheckedList(e.target.checked ? arrayOption : []);
            props.onChange(e.target.checked ? arrayOption : []);
            setCheckAll(e.target.checked);
      };

      const handleChange = (list: CheckboxValueType[]) => {
            setCheckedList(list);
            setCheckAll(list.length === props.options.length);
            props.onChange(list);
      };

      return (
            <>
                  {props.showCheckAll && (
                        <Checkbox onChange={onCheckAllChange} checked={checkAll}>
                              Tất cả
                        </Checkbox>
                  )}
                  <Checkbox.Group options={props.options} value={checkedList} onChange={handleChange} />
            </>
      );
};
