# ☕ Airbean API

A REST API for the Airbean coffee ordering app, where customers can order coffee and have it delivered by drone.

---

## 🚀 Getting Started
Prerequisites

Node.js v18+
npm

### Prerequisites
- Node.js v18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Nehac210401/exam-test.git

# Install dependencies
npm install

# Create .env file in root
echo "ADMIN_API_KEY=your_secret_key" > .env

# Start development server
npm run dev
```

The server will start on `http://localhost:3000`

---

## 🗄️ Database

Built with **SQLite** using `better-sqlite3`. The database file `airbean.db` is created automatically on startup with the following tables:

| Table | Description |
|---|---|
| `menu_items` | All coffee and food items |
| `users` | Customer accounts with UUID |
| `orders` | Placed orders with delivery time |
| `order_items` | Individual items within each order |

---

## 📋 API Endpoints

### Menu

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/menu` | Get all menu items |
| GET | `/api/menu/:id` | Get a single menu item |
| PUT | `/api/menu/:id` | Update a menu item |
| DELETE | `/api/menu/:id` | Delete a menu item |

#### Example Response — `GET /api/menu`
```json
{
  "menu": [
    {
      "id": 1,
      "title": "Bryggkaffe",
      "desc": "Klassiskt bryggkaffe på månadens noggrant utvalda bönor.",
      "price": 39
    }
  ]
}
```

---

### Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get a single user by UUID |
| POST | `/api/users` | Create a new user account |
| PUT | `/api/users/:id` | Update user profile |
| DELETE | `/api/users/:id` | Delete user account |

#### Example Request — `POST /api/users`
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "teleph": 0701234567
}
```

#### Example Response
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "teleph": 0701234567
}
```

> ℹ️ A random UUID is automatically generated for each new user.

---

### Orders

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders` | Place a new order |
| GET | `/api/orders/status/:orderId` | Get order status and ETA |
| GET | `/api/orders/myOrders?user_id=` | Get order history for a user |
| GET | `/api/orders` | Get all orders *(admin only)* |

#### Example Request — `POST /api/orders`
```json
{
  "user_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "shipping_address": "Storgatan 1, Stockholm",
  "orderItems": [
    { "menu_id": 1, "quantity": 2 },
    { "menu_id": 3, "quantity": 1 }
  ]
}
```

> ℹ️ `user_id` is optional. Orders can be placed as a guest without an account.

#### Example Response
```json
{
  "order_id": "f1e2d3c4-b5a6-7890-abcd-123456789abc",
  "user_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "total_amount": 127,
  "shipping_address": "Storgatan 1, Stockholm",
  "delivery_time": "2026-04-09T10:35:00.000Z",
  "orderItems": [
    { "menu_id": 1, "quantity": 2 },
    { "menu_id": 3, "quantity": 1 }
  ]
}
```

#### Example Response — `GET /api/orders/status/:orderId`
```json
{
  "order_id": "f1e2d3c4-b5a6-7890-abcd-123456789abc",
  "status": "On the way",
  "minutes_left": 24,
  "delivery_time": "2026-04-09T10:35:00.000Z",
  "total_amount": 127,
  "shipping_address": "Storgatan 1, Stockholm"
}
```

---

## 🛡️ Middleware

| Middleware | What it does |
|---|---|
| `orderValidation.js` | Validates shipping address and order items |
| `userValidation.js` | Validates user input on create and update |
| `requireAdmin.js` | Protects admin routes with API key |
| `loggedInAuth.js` | Checks if a valid user ID is provided |

### Admin Authentication

Protected routes require the `x-admin-key` header:

```
x-admin-key: your_secret_key
```

---
## 🏗️ Project Structure

```
airbean-api/
├── db/
│   ├── menudb.js         # Menu table + seeding
│   ├── userdb.js         # Users table + seeding
│   ├── orderdb.js        # Orders + order_items tables
│   ├── menu.js           # Menu seed data
│   └── user.js           # User seed data
├── middleware/
│   ├── orderValidation.js
│   ├── userValidation.js
│   ├── requireAdmin.js
│   └── loggedInAuth.js
├── routes/
│   ├── productRoutes.js  # Menu routes
│   ├── usersRoutes.js    # User routes
│   └── orderRoutes.js    # Order routes
├── src/
│   └── app.js            # Entry point
├── .env                  # Environment variables
├── airbean.db            # SQLite database (auto-created)
├── menu.js               # Coffee menu data
└── package.json
```

---

## 🔧 Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| SQLite (better-sqlite3) | Database |
| UUID | Random ID generation |
| Nodemon | Auto-restart in development |
| Dotenv | Environment variable management |

---

## 📝 License

This project was built as part of a backend development course — VT 2026.
