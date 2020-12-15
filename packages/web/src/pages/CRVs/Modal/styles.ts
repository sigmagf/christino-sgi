import styled from 'styled-components';

export const ReceiptsModal = styled.div`
  form {
    display: grid;

    grid-template-columns: 80px 80px 80px 80px 80px 80px 80px 80px 80px 80px 80px 80px;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;

    grid-template-areas: 'CL CL CL CL CL CL CL CL CD CD GP GP'
                         'PL RN RN MM MM MM TP TP EM EM ST ST'
                         'DT DT DT DT DT DT DT DT DT DT DT DT'
                         'BT BT BT BT BT BT BT BT BT BT BT BT';

    .buttons {
      grid-area: BT;

      display: flex;
      gap: 10px;
      justify-content: center;
      align-items: center;
    }
  }

  div.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-weight: 800;
    font-size: 16px;
  }
`;
