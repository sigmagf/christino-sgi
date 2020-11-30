import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;

    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }

  #root {
    display: flex;
    justify-content: flex-start;

    width: 100%;

    > nav {
      .expanded ~ main {
        max-width: calc(100% - 232px);
      }

      .collapsed ~ main {
        max-width: calc(100% - 70px);
      }
    }

    > main {
      height: 100vh;
      width: 100vw;
      transition: width 250ms ease;
      overflow-y: auto;

      > section {
        height: calc(100vh - 70px);
        width: 100%;
        max-width: 1080px;
        margin: 0 auto 30px auto;
      }
    }
  }

  *, button, input {
    outline: 0;
    font: 14px "Roboto", -apple-system, system-ui, sans-serif;
  }

  ::placeholder, ::-ms-input-placeholder, :-ms-input-placeholder {
    font-family: "Roboto", -apple-system, system-ui, sans-serif;
  }

  svg {
    color: ${({ theme }) => theme.text};
  }
`;
