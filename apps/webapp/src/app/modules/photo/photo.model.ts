export enum ORDER {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface OrderByEventProp {
  orderBy: 'title' | 'description';
  order: ORDER;
}
