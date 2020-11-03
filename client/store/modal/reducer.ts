import { AnyAction } from 'redux';
import { TYPES } from '../types';
import { ModalAttributes } from './interface';

const initialState = {
  BodyModal: null,
  open: false,
  title: '',
  data: {},
};

export const modalReducer = (
  state = initialState,
  action: AnyAction
): ModalAttributes => {
  switch (action.type) {
    case TYPES.OPEN_MODAL:
      return {
        ...state,
        BodyModal: action.BodyModal,
        open: true,
        title: action.title,
        data: action.data,
      };
    case TYPES.CLOSE_MODAL:
      return {
        ...state,
        BodyModal: null,
        open: false,
        title: '',
        data: {},
      };
    default:
      return state;
  }
};
