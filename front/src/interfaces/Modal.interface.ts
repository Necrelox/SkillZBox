import { ModalTypes } from 'enums/modal.enum'

export interface IModal {
  message: string;
  type: ModalTypes;
}
