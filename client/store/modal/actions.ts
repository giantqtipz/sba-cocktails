import { AppThunk } from '../thunkType';
import { TYPES } from '../types';
import { ModalAttributes } from './interface';

const showModal = ({ BodyModal, data, open, title }: ModalAttributes) => ({
  type: TYPES.OPEN_MODAL,
  BodyModal,
  data,
  title,
  open,
});

const hideModal = (open: boolean) => ({
  type: TYPES.CLOSE_MODAL,
  open,
});

export const openModal = ({
  BodyModal,
  data,
  open,
  title,
}: ModalAttributes): AppThunk => async (dispatch) => {
  return dispatch(showModal({ BodyModal, data, open, title }));
};

export const closeModal = (open: boolean): AppThunk => async (dispatch) => {
  return dispatch(hideModal(open));
};
