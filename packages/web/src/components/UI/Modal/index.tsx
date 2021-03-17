import { transparentize } from 'polished';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import ReactModal, { Props } from 'react-modal';
import { useTheme } from 'styled-components';

import { Button } from '~/components/UI/Button';

import { ModalHeader } from './styles';

interface IModalProps extends Props {
  haveHeader?: boolean;
  header?: JSX.Element|string;
  fullCover?: boolean;
  centeredContent?: boolean;
}

ReactModal.setAppElement('#root');
export const Modal: React.FC<IModalProps> = ({ children, haveHeader = true, header, onRequestClose, fullCover, centeredContent, ...props }) => {
  const theme = useTheme();

  const customStyles: ReactModal.Styles = {
    content: {
      top: fullCover ? '5px' : '50%',
      left: fullCover ? '5px' : '50%',
      right: fullCover ? '5px' : 'auto',
      bottom: fullCover ? '5px' : 'auto',
      margin: 'none',
      transform: fullCover ? 'unset' : 'translate(-50%, -50%)',

      display: centeredContent ? 'flex' : 'unset',
      justifyContent: centeredContent ? 'center' : 'unset',
      alignItems: centeredContent ? 'center' : 'unset',
      flexDirection: centeredContent ? 'column' : 'unset',

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
    <ReactModal style={customStyles} onRequestClose={onRequestClose} {...props}>
      {haveHeader && (
        <ModalHeader>
          <Button variant="error" onClick={onRequestClose}>
            <FaTimes />
          </Button>
          <div className="header-item">
            { header }
          </div>
        </ModalHeader>
      )}
      { children }
    </ReactModal>
  );
};
