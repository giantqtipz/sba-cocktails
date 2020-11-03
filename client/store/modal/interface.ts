import React from 'react';
import { CocktailAttributes } from '../cocktails/interface';

export interface ModalAttributes {
  BodyModal?: React.FC | any;
  data?: CocktailAttributes;
  open: boolean;
  title?: string;
}
