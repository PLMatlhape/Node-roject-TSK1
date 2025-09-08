# Shopping List API

A REST API for managing shopping list items built with Node.js, Express, and TypeScript. This application allows users to create, read, update, and delete shopping list items through HTTP endpoints.

## 📋 Project Overview

This is a shopping list management API that lets users:
- Add items to their shopping list
- View all items or individual items
- Update item details (name, quantity, purchased status)
- Remove items they no longer need
- Track when items were created and last updated

**Use-case Scenario:**
- Create a shopping list with items like "Milk, Eggs, Bread"
- Modify quantities (e.g., change from 1L to 2L of milk)
- Mark items as purchased while shopping
- Remove items that are no longer needed

## 🚀 Features

- **Full CRUD Operations** - Create, Read, Update, Delete shopping list items
- **Data Validation** - Comprehensive input validation with detailed error messages
- **Error Handling** - Consistent error responses and proper HTTP status codes
- **TypeScript** - Full type safety and modern JavaScript features
- **In-Memory Storage** - Items stored in memory (resets on server restart)
- **CORS Support** - Cross-origin resource sharing enabled
- **Request Logging** - All requests logged with timestamps

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Additional Libraries:**
  - `cors` - Cross-origin resource sharing
  - `express` - Web framework
  - `ts-node` - TypeScript execution

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 18 or higher)
- npm (comes with Node.js)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Node-roject-TSK1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Development setup**
   ```bash
   # Run in development mode with hot reload
   npm run dev
   
   # Or run with file watching
   npm run watch
   ```

4. **Production setup**
   ```bash
   # Build the TypeScript code
   npm run build
   
   # Start the production server
   npm start
   ```

The server will start on `http://localhost:3000` (or the port specified in the `PORT` environment variable).

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Health Check
**GET** `/health`

Check if the API is running.

**Response:**
```json
{
  "success": true,
  "message": "Shopping List API is running",
  "timestamp": "2025-09-08T10:30:00.000Z"
}
```

### Items Endpoints

#### 1. Get All Items
**GET** `/items`

Retrieve all items in the shopping list.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Milk",
      "quantity": 2,
      "purchased": false,
      "createdAt": "2025-09-08T10:00:00.000Z",
      "updatedAt": "2025-09-08T10:00:00.000Z"
    }
  ],
  "count": 1
}
```

#### 2. Get Single Item
**GET** `/items/:id`

Retrieve a specific item by its ID.

**Parameters:**
- `id` (number) - The item ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Milk",
    "quantity": 2,
    "purchased": false,
    "createdAt": "2025-09-08T10:00:00.000Z",
    "updatedAt": "2025-09-08T10:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "error": "ItemNotFoundError",
  "message": "Item with id 999 not found",
  "statusCode": 404
}
```

#### 3. Create New Item
**POST** `/items`

Add a new item to the shopping list.

**Request Body:**
```json
{
  "name": "Bread",
  "quantity": 1  // optional, defaults to 1
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 2,
    "name": "Bread",
    "quantity": 1,
    "purchased": false,
    "createdAt": "2025-09-08T10:05:00.000Z",
    "updatedAt": "2025-09-08T10:05:00.000Z"
  },
  "message": "Item created successfully"
}
```

**Validation Rules:**
- `name` - Required, non-empty string
- `quantity` - Optional, positive number (defaults to 1)

#### 4. Update Item
**PUT** `/items/:id`

Update an existing item's details.

**Parameters:**
- `id` (number) - The item ID

**Request Body (all fields optional):**
```json
{
  "name": "Whole Milk",
  "quantity": 3,
  "purchased": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Whole Milk",
    "quantity": 3,
    "purchased": true,
    "createdAt": "2025-09-08T10:00:00.000Z",
    "updatedAt": "2025-09-08T10:10:00.000Z"
  },
  "message": "Item updated successfully"
}
```

**Validation Rules:**
- `name` - If provided, must be a non-empty string
- `quantity` - If provided, must be a positive number
- `purchased` - If provided, must be a boolean

#### 5. Delete Item
**DELETE** `/items/:id`

Remove an item from the shopping list.

**Parameters:**
- `id` (number) - The item ID

**Response (204):**
```
No content (successful deletion)
```

**Error Response (404):**
```json
{
  "error": "ItemNotFoundError",
  "message": "Item with id 999 not found",
  "statusCode": 404
}
```

## 🧪 Testing with Postman

### Collection Setup
1. Create a new Postman collection called "Shopping List API"
2. Set the base URL variable: `{{baseUrl}}` = `http://localhost:3000`

### Sample Test Cases

#### Test 1: Health Check
```
GET {{baseUrl}}/health
```

#### Test 2: Create Items
```
POST {{baseUrl}}/items
Content-Type: application/json

{
  "name": "Milk",
  "quantity": 2
}
```

#### Test 3: Get All Items
```
GET {{baseUrl}}/items
```

#### Test 4: Update Item
```
PUT {{baseUrl}}/items/1
Content-Type: application/json

{
  "purchased": true
}
```

#### Test 5: Delete Item
```
DELETE {{baseUrl}}/items/1
```

### Error Testing
- Send invalid data types to test validation
- Try to access non-existent items (ID 999)
- Send requests with missing required fields

## 🔧 Project Structure

```
src/
├── server.ts              # Main server setup and configuration
├── item/
│   └── item.ts            # Item interfaces and custom error classes
├── routes/
│   └── items.ts           # Item routes and business logic
└── middleware/
    └── errorHandler.ts    # Global error handling middleware

Configuration files:
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tsconfig.dev.json      # Development TypeScript config
└── README.md              # This file
```

## 🔍 Data Model

### Item Interface
```typescript
interface Item {
  id: number;           // Auto-generated unique identifier
  name: string;         // Item name (e.g., "Milk")
  quantity: number;     // Quantity needed (default: 1)
  purchased: boolean;   // Purchase status (default: false)
  createdAt: Date;      // Creation timestamp
  updatedAt: Date;      // Last update timestamp
}
```

## 🚦 HTTP Status Codes

- `200` - OK (successful GET, PUT)
- `201` - Created (successful POST)
- `204` - No Content (successful DELETE)
- `400` - Bad Request (validation errors)
- `404` - Not Found (item doesn't exist)
- `500` - Internal Server Error (unexpected errors)

## 🔄 Error Handling

The API provides consistent error responses:

```json
{
  "error": "ErrorType",
  "message": "Human-readable error description",
  "statusCode": 400
}
```

**Common Error Types:**
- `ItemValidationError` - Invalid input data
- `ItemNotFoundError` - Item doesn't exist
- `ValidationError` - General validation failures

## 🌟 Development Features

- **Hot Reload** - Automatic server restart on file changes
- **Type Safety** - Full TypeScript support with strict mode
- **Request Logging** - All requests logged with timestamps
- **Error Boundaries** - Comprehensive error handling
- **Input Validation** - Robust data validation

## 🔮 Future Enhancements

- Database integration (MongoDB, PostgreSQL)
- User authentication and authorization
- Item categories and tags
- Due dates and reminders
- Shopping list sharing
- API rate limiting
- Unit and integration tests
- Docker containerization

## 📄 License

MIT License - see LICENSE file for details.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or issues, please create an issue in the repository or contact the development team.
