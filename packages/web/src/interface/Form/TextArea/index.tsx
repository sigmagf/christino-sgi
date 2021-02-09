import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';

import { InputContainer } from './styles';

type TextArea = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  name: string;
};

const TextArea: React.FC<TextArea> = ({ name, label, style, id, ...props }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
    });
  }, [fieldName, registerField]);

  return (
    <InputContainer hasLabel={!!label} style={style} id={id}>
      {label && (
        <label htmlFor={name}>
          { label }
        </label>
      )}
      <textarea ref={inputRef} defaultValue={defaultValue} id={name} {...props} />
    </InputContainer>
  );
};

export default TextArea;
