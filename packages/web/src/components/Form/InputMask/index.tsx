import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';
import ReactInputMask, { Props } from 'react-input-mask';

import { InputContainer } from './styles';

type InputMask = Props & {
  label?: string;
  name: string;
};

const InputMask: React.FC<InputMask> = ({ name, label, style, ...props }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref: any) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <InputContainer hasLabel={!!label} style={style}>
      {label && (
        <label htmlFor={name}>
          { label }
        </label>
      )}
      <ReactInputMask ref={inputRef} defaultValue={defaultValue} id={name} {...props} />
    </InputContainer>
  );
};

export default InputMask;
