import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { OverlayStyled, ModalStyled } from './Modal.styled';


const modalRoot = document.querySelector('#modal-root');

export function Modal({ onClose, children })  {
   useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
 

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(     
      <OverlayStyled onClick={handleBackdropClick}>
      <ModalStyled>{children}</ModalStyled>       
      </OverlayStyled>,
      modalRoot
    );
  
};

 Modal.propTypes = {
    onClick: PropTypes.func,
    onClose: PropTypes.func,
   
  };