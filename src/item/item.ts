export interface Item {
  id: number;
  name: string;
  quantity: number;
  purchased: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateItemRequest {
  name: string;
  quantity?: number;
}

export interface UpdateItemRequest {
  name?: string;
  quantity?: number;
  purchased?: boolean;
}

export class ItemValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ItemValidationError';
  }
}

export class ItemNotFoundError extends Error {
  constructor(id: number) {
    super(`Item with id ${id} not found`);
    this.name = 'ItemNotFoundError';
  }
}