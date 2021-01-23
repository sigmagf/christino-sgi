import styled from 'styled-components';

export const UserBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 70px;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto 0 auto;
  background: ${({ theme }) => theme.primary.main};
  box-shadow: ${({ theme }) => theme.shadow};
  border-radius: 5px;
  padding: 10px;

  .actions {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;

    margin: 5px 0;
    height: calc(100% - 10px);

    font-weight: 800;
  }

  .user-actions {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;

    margin: 5px 0;
    height: calc(100% - 10px);

    > button {
      height: 100%;
      min-width: 40px;
    }

    img {
      border-radius: 5px;
      height: 50px;
      width: 50px;
      height: 50px;
    }
  }
`;
