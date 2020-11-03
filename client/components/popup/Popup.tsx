import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { ModalAttributes } from '../../store/modal/interface';
import { StoreState } from '../../store/store';
import { closeModal } from '../../store/modal/actions';

import './popup.scss';

const Popup: React.FC<ModalAttributes> = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { BodyModal, open, title, data }: ModalAttributes = useSelector(
    (state: StoreState) => state.modal
  );
  const handleClose = () => {
    setShow(false);
    dispatch(closeModal(false));
  };
  useEffect(() => {
    setShow(open);
  }, [open]);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        animation
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {BodyModal !== null && <BodyModal data={data} />}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Popup;
