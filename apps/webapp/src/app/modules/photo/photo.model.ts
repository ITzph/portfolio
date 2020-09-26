export enum ORDER {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum ORDER_BY {
  TITLE = 'title',
  DESCRIPTION = 'description',
  CREATED_DATE = 'createdAt',
}

export interface OrderByEventProp {
  orderBy: ORDER_BY;
  order: ORDER;
}
