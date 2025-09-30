 # Spiral Sounds API
 
 Welcome to the Spiral Sounds API! This is the backend service for a music e-commerce platform, providing endpoints to manage and query a product catalog, handle user authentication, and manage shopping carts.

 ## Preview

 ![Screenshot](/public/images/image.png)

 ## 🚀 Features
 
 *   **Product Catalog**: Serves a list of music products.
 *   **Genre Filtering**: Allows fetching products based on their genre.
 *   **Dynamic Search**: Provides a powerful search capability across product titles, artists, and genres.
 *   **User Authentication**: Secure user registration and login system.
 *   **Shopping Cart**: Personal shopping cart management for authenticated users.
 *   **Static File Serving**: Serves the frontend application.
 *   **Database Integration**: Uses SQLite for persistent data storage.
 
 ## 🛠️ Tech Stack
 
 *   **Backend**: Node.js, Express.js
 *   **Database**: SQLite3
 
 ## <caption> API Endpoints
 
 Here are the currently available endpoints:
 
 ### Products
 | Method | Endpoint                 | Description                                                                                             | Query Params                               |
 | :----- | :----------------------- | :------------------------------------------------------------------------------------------------------ | :----------------------------------------- |
 | `GET`  | `/products`              | Retrieves a list of all products. Can be filtered by genre or a search term.                            | `genre=<string>`, `search=<string>`        |
 | `GET`  | `/products/genres`       | Retrieves a list of all unique genres available in the product catalog.                                 |                                            |

 ### Authentication
 | Method | Endpoint                 | Description                                                                                             |
 | :----- | :----------------------- | :------------------------------------------------------------------------------------------------------ |
 | `POST` | `/auth/signup`           | Register a new user account                                                                             |
 | `POST` | `/auth/login`            | Login with existing credentials                                                                         |
 | `GET`  | `/me`                    | Get current authenticated user's information                                                            |

 ### Shopping Cart
 | Method | Endpoint                 | Description                                                                                             |
 | :----- | :----------------------- | :------------------------------------------------------------------------------------------------------ |
 | `GET`  | `/cart`                 | Get current user's shopping cart                                                                        |
 | `POST` | `/cart`                 | Add an item to the shopping cart                                                                        |
 | `PUT`  | `/cart/:id`             | Update quantity of an item in the cart                                                                  |
 | `DELETE`| `/cart/:id`            | Remove an item from the cart                                                                            |
 
 ### Example Usage
 
 *   **Get all products**:
     ```
     GET /products
     ```
 
 *   **Get products by genre**:
     ```
     GET /products?genre=Rock
     ```
 
 *   **Search for products**:
     ```
     GET /products?search=blue
     ```
 
 ## ⚙️ Getting Started
 
 ### Prerequisites
 
 *   Node.js (v14 or higher recommended)
 *   npm or yarn
 
 ### Installation & Setup
 
 1.  **Clone the repository:**
     ```bash
     git clone https://github.com/0xYurii/spiral-sounds.git
     cd spiral-sounds
     ```
 
 2.  **Install dependencies:**
     ```bash
     npm install
     ```
 
 3.  **Run the database setup script (if available):**
     *This project uses an SQLite database. A setup script populates it with initial data.*
     ```bash
     node setup-database.js 
     ```
     *(Note: The name of the setup script might differ.)*
 
 4.  **Start the server:**
     ```bash
     npm start
     ```
 
 The API will be running on `http://localhost:3000` (or the configured port).