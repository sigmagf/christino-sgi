import styled from 'styled-components';

export const UserBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 70px;
  width: 100%;
  max-width: 1080px;
  margin: 30px auto 15px auto;
  background: ${({ theme }) => theme.primary.main};
  box-shadow: 0 0 4px 4px rgba(29, 31, 35, .25);
  border-radius: 10px;
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
      border-radius: 10px;
      height: 50px;
      width: 50px;
      height: 50px;
    }
  }
`;
