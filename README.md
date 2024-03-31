# Bookmark Backend 

This README provides an overview and instructions for the backend of a web application built using Node.js and Express.js. The backend provides APIs for user authentication, bookmark management, collection management, filtering, and search functionality.

## Features:

1. **User Authentication**:
   - Users can sign up, log in, and log out securely using JSON Web Tokens (JWT) for authentication.

2. **Bookmark Management**:
   - **Add Bookmark**: Users can add bookmarks to save their favorite web pages.
   - **Delete Bookmark**: Users can remove bookmarks they no longer need.

3. **Collection Management**:
   - **Add Collection**: Users can create collections to organize their bookmarks.
   - **Delete Collection**: Users can delete collections along with their associated bookmarks.

4. **Filtering**: APIs are provided to filter bookmarks according to tags and collections.

5. **Search Functionality**: APIs allow users to search through bookmarks using keywords.

## Setup Instructions:

1. **Clone the Repository**:
   ```
   git clone https://github.com/Prince0000/bookmark_backend
   cd bookmark_backend
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=<server-port>
   MONGODB_URI=<mongodb-connection-uri>
   JWT_PRIVATE_KEY=<jwt-private-key>
   SALT=<salt-id>
   ```

4. **Run the Application**:
   ```
   npm start
   ```
   This will start the backend server.

## API Endpoints:

- **User Authentication**:
  - `POST /api/signup`: Sign up a new user.
  - `POST /api/auth`: Log in an existing user.

- **Bookmark Management**:
  - `POST /api/bookmarks`: Add a new bookmark.
  - `DELETE /api/bookmarks/:id`: Delete a bookmark by ID.

- **Collection Management**:
  - `POST /api/collections`: Add a new collection.
  - `DELETE /api/collections/:id`: Delete a collection by ID.

- **Filtering**:
  - `GET /api/bookmarks/:fetchType/:collectionData/:id`: Filter bookmarks by tag and collection.

## Tech Stack:

- **Backend**:
  - Node.js: JavaScript runtime for building scalable server-side applications.
  - Express.js: Web application framework for Node.js, used for building RESTful APIs.
  - MongoDB: NoSQL database for storing user information, bookmarks, and collections.
  - JSON Web Tokens (JWT): For secure authentication and authorization.

