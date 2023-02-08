import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ModalContent, ModalCloseBtn } from './Modal.styled';
import { BsXCircle } from 'react-icons/bs';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ currentImage: { src }, closeModal, search }) => {
  useEffect(() => {
    const closeByEsc = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', closeByEsc);
    return () => document.removeEventListener('keydown', closeByEsc);
  }, [closeModal]);

  const closeOnBackdrop = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <Backdrop onClick={closeOnBackdrop}>
      <ModalContent>
        <img src={src} alt={search} width="400" />
        <ModalCloseBtn onClick={closeModal}>
          <BsXCircle
            style={{
              color: '#757575',
              display: 'inline-block',
              width: '100%',
            }}
          />
        </ModalCloseBtn>
      </ModalContent>
    </Backdrop>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  currentImage: PropTypes.shape({ src: PropTypes.string }).isRequired,
  closeModal: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};
