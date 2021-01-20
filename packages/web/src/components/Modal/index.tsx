import { transparentize } from 'polished';
import React from 'react';
import ReactModal from 'react-modal';
import { useTheme } from 'styled-components';

ReactModal.setAppElement('#root');
export const Modal: React.FC<ReactModal.Props> = ({ children, ...props }) => {
  const theme = useTheme();

  const customStyles: ReactModal.Styles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',

      borderColor: theme.primary.main,
      borderRadius: 10,
      background: theme.primary.main,
      boxShadow: '0 0 4px 4px rgba(29, 31, 35, .25)',
    },
    overlay: {
      background: transparentize(0.25, theme.background),
      backdropFilter: 'blur(2px)',
    },
  };

  return (
    <ReactModal style={customStyles} {...props}>
      { children }
    </ReactModal>
  );
};
