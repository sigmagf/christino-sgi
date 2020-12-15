import { useField } from '@unform/core';
import { lighten } from 'polished';
import React, { useEffect, useRef } from 'react';
import ReactSelect, { OptionTypeBase, Props as SelectProps } from 'react-select';
import { useTheme } from 'styled-components';

import { InputContainer } from './styles';

type Input = SelectProps & {
  label?: string;
  name: string;
};

const Input: React.FC<Input> = ({ name, label, style, id, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  const theme = useTheme();

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

  function handleOptionColor<T>(data: T, isDisabled: boolean, isFocused: boolean, isSelected: boolean) {
    if(isSelected) {
      return lighten(0.1, theme.secondary.main);
    }

    if(isFocused) {
      return lighten(0.2, theme.primary.main);
    }

    return lighten(0.1, theme.primary.main);
  }

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
        styles={{
          control: (styles, { isFocused }) => ({
            ...styles,
            height: 40,
            minWidth: 125,
            width: '100%',
            padding: 5,
            borderRadius: 10,
            boxShadow: '0 0 4px 4px rgba(29, 31, 35, .25)',
            background: lighten(0.1, theme.primary.main),
            border: `2px solid ${isFocused ? theme.secondary.main : lighten(0.1, theme.primary.main)}`,
          }),
          multiValue: (styles) => ({
            ...styles,
            color: theme.primary.contrastText,
          }),
          singleValue: (styles) => ({
            ...styles,
            color: theme.primary.contrastText,
          }),
          valueContainer: (styles) => ({
            ...styles,
            height: 25,
          }),
          indicatorsContainer: (styles) => ({
            ...styles,
            height: 25,
          }),
          input: (styles) => ({
            ...styles,
            color: theme.primary.contrastText,
          }),
          menu: (styles) => ({
            ...styles,
            height: 25,
            background: lighten(0.1, theme.primary.main),
          }),
          option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
            ...styles,
            background: handleOptionColor(data, isDisabled, isFocused, isSelected),
          }),
        }}
        {...rest}
      />
    </InputContainer>
  );
};

export default Input;
