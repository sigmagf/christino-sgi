import { useField } from '@unform/core';
import React, { useEffect, useRef } from 'react';
import { OptionTypeBase } from 'react-select';
import ReactSelect, { AsyncProps } from 'react-select/async';

import { InputContainer } from './styles';

type SelectProps = AsyncProps<OptionTypeBase> & {
  label?: string;
  name: string;
  style: React.CSSProperties;
  id?: string;
  hideControls?: boolean;
  placeholder?: string;
};

const SelectAsync: React.FC<SelectProps> = ({ name, label, style, id, hideControls, placeholder, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if(!ref.state.value) {
          return '';
        }

        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField]);

  return (
    <InputContainer hasLabel={!!label} style={style} id={id} hideControls={hideControls || false}>
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
        placeholder={placeholder || ''}
        {...rest}
      />
    </InputContainer>
  );
};

export default SelectAsync;
