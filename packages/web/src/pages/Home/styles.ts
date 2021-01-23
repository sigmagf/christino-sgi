import { lighten } from 'polished';
import styled from 'styled-components';

export const HomeContainer = styled.main`
  display: flex;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 5px;
  min-height: 40px;

  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow};
  background: ${({ theme }) => lighten(0.1, theme.primary.main)};
  border: 2px solid ${({ theme }) => lighten(0.1, theme.primary.main)};

  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 5px;
    box-shadow: ${({ theme }) => theme.shadow};
    background: ${({ theme }) => theme.secondary.main};
    line-height: 17px;

    i {
      cursor: pointer;
      margin-left: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const TagInput = styled.input`
  height: 26px;
  width: 100%;

  background: none;
  border: none;
  color: white;

  ::placeholder {
    color: rgba(255, 255, 255, .75);
  }
`;
