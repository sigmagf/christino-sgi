import React from 'react';

import { InputContainer } from './styles';

type Input = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const InputDisabled: React.FC<Input> = ({ label, style, id, ...props }) => {
  return (
    <InputContainer hasLabel={!!label} style={style}>
      {label && (
        <label htmlFor={id}>
          { label }
        </label>
      )}
      <input {...props} id={id} disabled />
    </InputContainer>
  );
};

export { InputDisabled };
