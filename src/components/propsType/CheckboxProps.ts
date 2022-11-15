import React from 'react';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { CheckboxOptionType } from 'antd/lib/checkbox';
export type CheckboxType = {
      // defaultCheckedList?: CheckboxValueType[] | (() => CheckboxValueType[]);
      // options: string[];
      options: CheckboxOptionType[];
      defaultCheckedList?: CheckboxValueType[];
      children?: React.ReactNode;
      showCheckAll: boolean;
      onChange: (checkedValue: CheckboxValueType[]) => void | string[];
};
