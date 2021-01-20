import { lighten } from 'polished';
import styled from 'styled-components';

export const HomeContainer = styled.main`
  display: flex;
`;

export const TagContainer = styled.div`
  display: flex;
  padding: 5px;

  border-radius: 5px;
  box-shadow: 0 0 4px 4px rgba(29, 31, 35, .25);
  background: ${({ theme }) => lighten(0.1, theme.primary.main)};
  border: 2px solid ${({ theme }) => lighten(0.1, theme.primary.main)};
`;

export const TagInput = styled.input`
  height: calc(60px - 20px);
  width: 100%;

  background: none;
  border: none;
  color: white;

  ::placeholder {
    color: rgba(255, 255, 255, .75);
  }
`;
