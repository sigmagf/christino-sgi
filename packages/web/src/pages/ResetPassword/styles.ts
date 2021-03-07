import { transparentize } from 'polished';
import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;

  > div {
    img {
      max-width: 300px;
    }

    .divider {
      height: 1px;
      background: ${({ theme }) => transparentize(0.5, theme.background)};

      margin: 10px 0;
    }

    form {
      display: grid;

      grid-template-columns: 145px 145px;
      grid-template-areas: 'HD HD'
                           'EM EM'
                           'P1 P1'
                           'P2 P2'
                           'SB SB';

      gap: 10px;
    }
  }
`;
