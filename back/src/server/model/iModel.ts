export interface IModel {
  read(data: any): void;
  write(data: any): void;
  update(data: any): void;
  delete(data: any): void;
}
