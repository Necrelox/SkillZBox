import { ModalTypes } from './modal.enum';

export interface IModal {
  isOpen: boolean;
  message: string;
  type: ModalTypes;
}
