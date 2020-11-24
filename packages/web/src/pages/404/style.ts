import { shade } from 'polished';
import styled from 'styled-components';

export const NotFoundContainer = styled.main`
  height: 100%;
  width: 100%;
  .container {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .errorMessage {
    display: flex;

    .notFound {
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid rgba(255, 255, 255, 0.3);
      padding: 10px 23px 10px 0px;
      font-size: 24px;
      font-weight: 500;
      vertical-align: top;
      margin-block-start: 0.67em;
      margin-block-end: 0.67em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      margin: 0px 20px 0px 0px;
    }

    .pageNotFound {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: left;
      vertical-align: middle;
      font-size: 14px;
      font-weight: normal;
      line-height: inherit;
      margin: 0px;
      padding: 0px;
      margin-block-start: 0.83em;
      margin-block-end: 0.83em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
    }
  }

  .backHome {
    margin-top: 10px;
    width: 100%;

    button {
      width: 100%;
      height: 30px;

      padding: none;

      display: flex;
      justify-content: center;
      align-items: center;

      border-radius: 5px;
      border: none;

      background: ${({ theme }) => shade(0.2, theme.background)};
      color: ${({ theme }) => theme.primary.contrastText};

      transition: all 250ms ease;

      :hover {
        background: ${({ theme }) => shade(0.5, theme.background)};
      }

      cursor: pointer;
    }
  }
`;
