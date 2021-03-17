import styled from 'styled-components';

interface IInputContainerStyledProps {
  hasLabel: boolean;
}

export const SwitchContainer = styled.div<IInputContainerStyledProps>`
  position: relative;
  width: 100%;

  label {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    height: 20px;
    width: 100%;

    padding: 0 5px;

    font-size: 10px;
    font-weight: bold;

    transition: background-color 250ms ease;
  }
`;
