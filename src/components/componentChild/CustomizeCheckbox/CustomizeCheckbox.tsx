import './CustomizeCheckbox.css';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useEffect, useRef, useState } from 'react';
import { CheckboxType } from '../../propsType/CheckboxProps';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { useForm, Controller } from 'react-hook-form';
// export const CustomizeCheckbox = forwardRef((props: CheckboxType, ref: Ref<HTMLInputElement>) => {
//       const [checkedList, setCheckedList] = useState(props.defaultCheckedList);
//       const [indeterminate, setIndeterminate] = useState(true);
//       const [checkAll, setCheckAll] = useState(false);

//       const onCheckAllChange = (e: CheckboxChangeEvent) => {
//             setCheckedList(e.target.checked ? props.options : []);
//             setIndeterminate(false);
//             setCheckAll(e.target.checked);
//       };

//       const onChange = (list: any) => {
//             setCheckedList(list);
//             setIndeterminate(!!list.length && list.length < props.options.length);
//             setCheckAll(list.length === props.options.length);
//       };
//       return (
//             <>
//                   <Checkbox ref={ref} indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
//                         Tất cả
//                   </Checkbox>
//                   <Checkbox.Group ref={ref} options={props.options} value={checkedList} onChange={onChange} />
//             </>
//       );
// });

export const CustomizeCheckbox = (props: CheckboxType) => {
      const [checkedList, setCheckedList] = useState<CheckboxValueType[] | undefined>([]);
      const [checkAll, setCheckAll] = useState(false);

      useEffect(() => {
            setCheckedList(props.defaultCheckedList);
            setCheckAll(props.options.length === props.defaultCheckedList?.length);
      }, [props.defaultCheckedList]);
      const onCheckAllChange = (e: CheckboxChangeEvent) => {
            setCheckedList(e.target.checked ? props.options : []);
            props.onChange(e.target.checked ? props.options : []);
            setCheckAll(e.target.checked);
      };

      const handleChange = (list: CheckboxValueType[]) => {
            setCheckedList(list);
            setCheckAll(list.length === props.options.length);
            props.onChange(list);
      };

      return (
            <>
                  <Checkbox onChange={onCheckAllChange} checked={checkAll}>
                        Tất cả
                  </Checkbox>
                  <Checkbox.Group options={props.options} value={checkedList} onChange={handleChange} />
            </>
      );
};
