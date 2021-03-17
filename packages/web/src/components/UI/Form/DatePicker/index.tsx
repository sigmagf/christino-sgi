import { useField } from '@unform/core';
import pt from 'date-fns/locale/pt';
import React, { useRef, useState, useEffect } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { InputContainer } from './styles';

interface IDatePickerProps extends Omit<ReactDatePickerProps, 'onChange'> {
  name: string;
  label?: string;
  style?: React.CSSProperties;
}

const DatePicker: React.FC<IDatePickerProps> = ({ name, style, id, label, ...rest }) => {
  const datepickerRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);
  const [date, setDate] = useState(defaultValue || null);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: 'props.selected',
      clearValue: (ref: any) => {
        ref.clear();
      },
    });
  }, [fieldName, registerField]);
  return (
    <InputContainer hasLabel={!!label} style={style} id={id}>
      {label && (
        <label htmlFor={name}>
          { label}
        </label>
      )}
      <ReactDatePicker ref={datepickerRef} selected={date} onChange={setDate} locale={pt} dateFormat="dd/MM/yyyy" {...rest} />
    </InputContainer>
  );
};

export default DatePicker;
