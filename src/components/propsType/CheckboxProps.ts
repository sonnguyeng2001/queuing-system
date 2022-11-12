import { CheckboxValueType } from 'antd/lib/checkbox/Group';
export type CheckboxType = {
      options: string[];
      defaultCheckedList?: CheckboxValueType[] | (() => CheckboxValueType[]);
      onChange: (checkedValue: CheckboxValueType[]) => void | string[];
};
