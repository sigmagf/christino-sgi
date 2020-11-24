import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';

import { InputContainer } from './styles';

type Input = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
};

const Input: React.FC<Input> = ({ name, label, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
    });
  }, [fieldName, registerField]);

  return (
    <InputContainer hasLabel={!!label}>
      {label && (
        <label htmlFor={name}>
          { label }
        </label>
      )}
      <input ref={inputRef} defaultValue={defaultValue} id={name} {...props} />
    </InputContainer>
  );
};

export default Input;
