import { lighten } from 'polished';
import styled from 'styled-components';

export const UserBarContainer = styled.div`
  display: flex;
  height: 70px;
  width: 100%;
  max-width: 1080px;
  margin: 30px auto;
  background: ${({ theme }) => theme.primary.main};
  box-shadow: 0 0 4px 4px rgba(29, 31, 35, .25);
  border-radius: 10px;
  padding: 10px;

  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0;
    height: calc(100% - 10px);
    width: calc(100% - 100px);
    border-radius: 10px;
    background: ${({ theme }) => lighten(0.1, theme.primary.main)};
    box-shadow: 0 0 4px 4px rgba(29, 31, 35, .25);
    overflow: hidden;

    .label {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      width: 40px;
    }

    input {
      height: 100%;
      width: calc(100% - 40px);
      background: none;
      border: none;
      color: white;
      ::placeholder {
        color: rgba(255, 255, 255, .75);
      }
    }
  }

  .settings {
    margin: 5px 10px;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      padding: none;
      background: ${({ theme }) => lighten(0.05, theme.primary.main)};
      border-radius: 10px;
      height: 40px;
      width: 40px;
      box-shadow: 0 0 4px 4px rgba(29, 31, 35, .25);
      cursor: pointer;

      :hover {
        background: ${({ theme }) => lighten(0.09, theme.primary.main)};
      }
    }
  }

  .user {
    border-radius: 10px;
    height: 50px;
    width: 50px;
    overflow: hidden;

    img {
      height: 50px;
    }
  }
`;
