import { shade, transparentize } from 'polished';
import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    border-radius: 5px;
    box-shadow: 0 0 4px 4px rgba(29, 31, 35, .25);
  }

  .Toastify__toast--info {
    background: ${({ theme }) => theme.info.main};
    color: ${({ theme }) => theme.info.contrastText};

    .Toastify__progress-bar--animated {
      background: ${({ theme }) => transparentize(0.50, shade(0.75, theme.info.main))};
    }
  }

  .Toastify__toast--success {
    background: ${({ theme }) => theme.success.main};
    color: ${({ theme }) => theme.success.contrastText};

    .Toastify__progress-bar--animated {
      background: ${({ theme }) => transparentize(0.50, shade(0.75, theme.success.main))};
    }
  }

  .Toastify__toast--warning {
    background: ${({ theme }) => theme.warning.main};
    color: ${({ theme }) => theme.warning.contrastText};

    .Toastify__progress-bar--animated {
      background: ${({ theme }) => transparentize(0.50, shade(0.75, theme.warning.main))};
    }
  }

  .Toastify__toast--error {
    background: ${({ theme }) => theme.error.main};
    color: ${({ theme }) => theme.error.contrastText};

    .Toastify__progress-bar--animated {
      background: ${({ theme }) => transparentize(0.50, shade(0.75, theme.error.main))};
    }
  }

  .Toastify__toast--default {
    background: ${({ theme }) => theme.primary.main};
    color: ${({ theme }) => theme.primary.contrastText};

    .Toastify__progress-bar--animated {
      background: ${({ theme }) => transparentize(0.50, shade(0.75, theme.secondary.main))};
    }
  }
`;
