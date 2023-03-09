import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { OverlayStyled, ModalStyled } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export function Modal()  {
   useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
 

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  return createPortal(     
      <OverlayStyled onClick={handleBackdropClick}>
        <ModalStyled><span>hi</span></ModalStyled>       
      </OverlayStyled>,
      modalRoot
    );
  
};

 Modal.propTypes = {
    onClick: PropTypes.func,
    onClose: PropTypes.func,
   
  };