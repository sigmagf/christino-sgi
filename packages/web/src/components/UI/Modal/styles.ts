import styled from 'styled-components';

export const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;

  width: 100%;

  > button {
    height: 34px;
    width: 34px;
  }

  .header-item {
    display: flex;
    justify-content: center;
    align-items: center;

    width: calc(100% - 34px);
    font-weight: bold;
  }
`;
