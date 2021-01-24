import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';
import ReactSelect, { OptionTypeBase, Props } from 'react-select';

import { InputContainer } from './styles';

type SelectProps = Props & {
  label?: string;
  name: string;
};

const Select: React.FC<SelectProps> = ({ name, label, style, id, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if(rest.isMulti) {
          if(!ref.state.value) {
            return [];
          }

          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }

        if(!ref.state.value) {
          return '';
        }

        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <InputContainer hasLabel={!!label} style={style} id={id}>
      {label && (
        <label htmlFor={name}>
          { label }
        </label>
      )}
      <ReactSelect
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        id={name}
        {...rest}
      />
    </InputContainer>
  );
};

export default Select;
