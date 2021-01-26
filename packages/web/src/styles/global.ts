import { lighten, transparentize } from 'polished';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    ::-webkit-scrollbar { width: 10px; }
    ::-webkit-scrollbar-track { background: ${({ theme }) => lighten(0.2, theme.primary.main)}; }
    ::-webkit-scrollbar-thumb { background: ${({ theme }) => transparentize(0.75, theme.secondary.main)}; }
    ::-webkit-scrollbar-thumb:hover { background: ${({ theme }) => transparentize(0.50, theme.secondary.main)}; }
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
  }

  hr {
    border: none;
    border-top: 1px solid ${({ theme }) => lighten(0.1, theme.primary.main)};
  }

  *, button, input {
    outline: 0;
    font: 14px "Roboto", -apple-system, system-ui, sans-serif;
  }
  
  input, select {
    font-family: 'Roboto Mono', monospace;
  }

  ::placeholder, ::-ms-input-placeholder, :-ms-input-placeholder {
    font-family: "Roboto", -apple-system, system-ui, sans-serif;
  }

  svg {
    color: ${({ theme }) => theme.text};
  }
`;
