import { FormHandles } from '@unform/core';
import { RefObject } from 'react';

import { formatMoney } from './formatMoney';

export const onValueFocus = (formRef: RefObject<FormHandles>, inputName = 'value') => {
  if(formRef.current) {
    const value = formRef.current.getFieldValue(inputName).replace('.', '');
    formRef.current.setFieldValue(inputName, value);
  }
};

export const onValueBlur = (formRef: RefObject<FormHandles>, cb?: (value: string) => void, inputName = 'value') => {
  if(formRef.current) {
    const value = formRef.current.getFieldValue(inputName).replace(',', '.');
    formRef.current.setFieldValue(inputName, formatMoney(value));

    if(cb) {
      cb(value);
    }
  }
};
