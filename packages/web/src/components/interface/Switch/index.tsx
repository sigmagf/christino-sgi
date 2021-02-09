import { lighten } from 'polished';
import React from 'react';
import ReactSwitch from 'react-switch';
import { useTheme } from 'styled-components';

import { SwitchContainer } from './styles';

interface ISwitch {
  onChange: () => void;
  checked: boolean;
  label?: string;
  style: React.CSSProperties;
  id?: string;
}

export const Switch: React.FC<ISwitch> = ({ onChange, checked, label, style, id }) => {
  const theme = useTheme();

  return (
    <SwitchContainer hasLabel={!!label} style={style} id={id}>
      {label && (
        <label htmlFor={id}>
          { label }
        </label>
      )}
      <div style={{ height: 40, display: 'flex', alignItems: 'center' }}>
        <ReactSwitch
          id={id}
          onChange={onChange}
          checked={checked}
          checkedIcon={false}
          uncheckedIcon={false}
          height={10}
          width={40}
          handleDiameter={20}
          offColor={lighten(0.1, theme.primary.main)}
          onColor={theme.secondary.main}
        />
      </div>
    </SwitchContainer>
  );
};
