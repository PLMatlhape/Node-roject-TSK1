import { Router } from 'express';
import type { Request, Response } from 'express';
import type { 
  Item, 
  CreateItemRequest, 
  UpdateItemRequest
} from '../item/item.js';
import { 
  ItemValidationError, 
  ItemNotFoundError 
} from '../item/item.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const router = Router();


let items: Item[] = [];
let nextId = 1;


const validateCreateItem = (data: any): CreateItemRequest => {
  if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
    throw new ItemValidationError('Name is required and must be a non-empty string');
  }

  if (data.quantity !== undefined && (typeof data.quantity !== 'number' || data.quantity < 1)) {
    throw new ItemValidationError('Quantity must be a positive number');
  }

  return {
    name: data.name.trim(),
    quantity: data.quantity || 1
  };
};

const validateUpdateItem = (data: any): UpdateItemRequest => {
  const updateData: UpdateItemRequest = {};

  if (data.name !== undefined) {
    if (typeof data.name !== 'string' || data.name.trim() === '') {
      throw new ItemValidationError('Name must be a non-empty string');
    }
    updateData.name = data.name.trim();
  }

  if (data.quantity !== undefined) {
    if (typeof data.quantity !== 'number' || data.quantity < 1) {
      throw new ItemValidationError('Quantity must be a positive number');
    }
    updateData.quantity = data.quantity;
  }

  if (data.purchased !== undefined) {
    if (typeof data.purchased !== 'boolean') {
      throw new ItemValidationError('Purchased must be a boolean');
    }
    updateData.purchased = data.purchased;
  }

  return updateData;
};


router.get('/', asyncHandler(async (req: Request, res: Response) => {
  res.json({
    success: true,
    data: items,
    count: items.length
  });
}));


router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id!);
  
  if (isNaN(id)) {
    throw new ItemValidationError('Invalid item ID');
  }

  const item = items.find(item => item.id === id);
  
  if (!item) {
    throw new ItemNotFoundError(id);
  }

  res.json({
    success: true,
    data: item
  });
}));


router.post('/', asyncHandler(async (req: Request, res: Response) => {
  const validatedData = validateCreateItem(req.body);
  
  const newItem: Item = {
    id: nextId++,
    name: validatedData.name,
    quantity: validatedData.quantity || 1,
    purchased: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  items.push(newItem);

  res.status(201).json({
    success: true,
    data: newItem,
    message: 'Item created successfully'
  });
}));


router.put('/:id', asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id!);
  
  if (isNaN(id)) {
    throw new ItemValidationError('Invalid item ID');
  }

  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    throw new ItemNotFoundError(id);
  }

  const validatedData = validateUpdateItem(req.body);
  
  
  const currentItem = items[itemIndex]!;
  const updatedItem: Item = {
    ...currentItem,
    ...validatedData,
    updatedAt: new Date()
  };

  items[itemIndex] = updatedItem;

  res.json({
    success: true,
    data: updatedItem,
    message: 'Item updated successfully'
  });
}));


router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id!);
  
  if (isNaN(id)) {
    throw new ItemValidationError('Invalid item ID');
  }

  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    throw new ItemNotFoundError(id);
  }

  items.splice(itemIndex, 1);

  res.status(204).send(); 
}));

export default router;