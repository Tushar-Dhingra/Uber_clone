# User Registration API

## Endpoint

`POST /users/register`

## Description

This endpoint allows a new user to register by providing their personal information. The password is hashed before being stored in the database.

## Request Body

The request body must be a JSON object containing the following fields:

- `fullname`: An object containing:
  - `firstname`: A string representing the user's first name (required, minimum length: 3 characters).
  - `lastname`: A string representing the user's last name (optional).
- `email`: A string representing the user's email address (required, must be a valid email format).
- `password`: A string representing the user's password (required, minimum length: 3 characters).

### Example Request

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

## Responses

- **201 Created**: User successfully registered.
  - Response body will contain the user object.
- **400 Bad Request**: Validation errors occurred.
  - Response body will contain an array of error messages.

## Status Codes

- `201`: User created successfully.
- `400`: Validation errors in the request body.

---

# User Login API

## Endpoint

`POST /users/login`

## Description

This endpoint allows an existing user to log in by providing their email and password. If the credentials are valid, a JWT token is returned.

## Request Body

The request body must be a JSON object containing the following fields:

- `email`: A string representing the user's email address (required, must be a valid email format).
- `password`: A string representing the user's password (required, minimum length: 3 characters).

### Example Request

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

## Responses

- **200 OK**: User successfully logged in.
  - Response body will contain the user object and a JWT token.
  - Example:
    ```json
    {
      "user": {
        "_id": "user_id",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
        // other user fields
      },
      "token": "jwt_token_here"
    }
    ```
- **400 Bad Request**: Validation errors occurred.
  - Response body will contain an array of error messages.
- **401 Unauthorized**: Invalid email or password.
  - Response body will contain an error message.

## Status Codes

- `200`: User logged in successfully.
- `400`: Validation errors in the request body.

---

# User Profile API

## Endpoint

`GET /users/profile`

## Description

Returns the profile information of the currently authenticated user. Requires a valid JWT token in the `Authorization` header (as `Bearer <token>`) or in the `token` cookie.

## Authentication

- Required: Yes (JWT)

## Request Headers

- `Authorization: Bearer <token>` (or send token as a cookie named `token`)

## Responses

- **200 OK**: Returns the user profile object.
  - Example:
    ```json
    {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // ...other fields
    }
    ```
- **401 Unauthorized**: No token, invalid token, or user not found.
  - Example:
    ```json
    { "message": "Unauthorized access" }
    ```

---

# User Logout API

## Endpoint

`POST /users/logout`

## Description

Logs out the currently authenticated user by blacklisting their JWT token. Requires a valid JWT token in the `Authorization` header (as `Bearer <token>`) or in the `token` cookie.

## Authentication

- Required: Yes (JWT)

## Request Headers

- `Authorization: Bearer <token>` (or send token as a cookie named `token`)

## Responses

- **200 OK**: Logout successful.
  - Example:
    ```json
    { "message": "Logout successful" }
    ```
- **401 Unauthorized**: No token, invalid token, or token is blacklisted.
  - Example:
    ```json
    { "message": "Access denied. No token provided." }
    ```
    or
    ```json
    { "message": "Access denied. Token is blacklisted." }
    ```

---

# Captain Registration API

## Endpoint

`POST /captains/register`

## Description

This endpoint allows a new captain to register by providing their personal and vehicle information. The password is hashed before being stored in the database.

## Request Body

The request body must be a JSON object containing the following fields:

- `fullname`: An object containing:
  - `firstname`: A string representing the captain's first name (required, minimum length: 3 characters).
  - `lastname`: A string representing the captain's last name (optional).
- `email`: A string representing the captain's email address (required, must be a valid email format).
- `password`: A string representing the captain's password (required, minimum length: 3 characters).
- `vechile`: An object containing:
  - `color`: A string representing the vehicle color (required, minimum length: 3 characters).
  - `plate`: A string representing the vehicle plate (required, minimum length: 3 characters).
  - `capacity`: An integer representing the vehicle capacity (required, minimum: 1).
  - `vechileType`: A string representing the vehicle type (required, must be one of: `car`, `motorcycle`, `auto`).

### Example Request

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "securepassword",
  "vechile": {
    "color": "red",
    "plate": "HR 36 B 0777",
    "capacity": 4,
    "vechileType": "car"
  }
}
```

## Responses

- **201 Created**: Captain successfully registered.
  - Example:
    ```json
    {
      "captain": {
        "_id": "captain_id",
        "fullname": {
          "firstname": "Jane",
          "lastname": "Smith"
        },
        "email": "jane.smith@example.com",
        "vechile": {
          "color": "red",
          "plate": "HR 36 B 0777",
          "capacity": 4,
          "vechileType": "car"
        }
        // ...other fields
      },
      "token": "jwt_token_here"
    }
    ```
- **400 Bad Request**: Validation errors occurred.
  - Example:
    ```json
    {
      "errors": [
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname",
          "location": "body"
        }
        // ...other errors
      ]
    }
    ```
- **400 Bad Request**: Captain already exists.
  - Example:
    ```json
    { "message": "Captain already exists" }
    ```

## Status Codes

- `201`: Captain created successfully.
- `400`: Validation errors in the request body or captain already exists.

---

# Captain Login API

## Endpoint

`POST /captains/login`

## Description

This endpoint allows an existing captain to log in by providing their email and password. If the credentials are valid, a JWT token is returned.

## Request Body

The request body must be a JSON object containing the following fields:

- `email`: A string representing the captain's email address (required, must be a valid email format).
- `password`: A string representing the captain's password (required, minimum length: 3 characters).

### Example Request

```json
{
  "email": "jane.smith@example.com",
  "password": "securepassword"
}
```

## Responses

- **200 OK**: Captain successfully logged in.
  - Example:
    ```json
    {
      "captain": {
        "_id": "captain_id",
        "fullname": {
          "firstname": "Jane",
          "lastname": "Smith"
        },
        "email": "jane.smith@example.com",
        "vechile": {
          "color": "red",
          "plate": "HR 36 B 0777",
          "capacity": 4,
          "vechileType": "car"
        }
        // ...other fields
      },
      "token": "jwt_token_here"
    }
    ```
- **400 Bad Request**: Validation errors occurred.
  - Example:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid email",
          "param": "email",
          "location": "body"
        }
        // ...other errors
      ]
    }
    ```
- **401 Unauthorized**: Invalid email or password.
  - Example:
    ```json
    { "message": "Invalid email or password" }
    ```

## Status Codes

- `200`: Captain logged in successfully.
- `400`: Validation errors in the request body.
- `401`: Invalid email or password.

---

# Captain Profile API

## Endpoint

`GET /captains/profile`

## Description

Returns the profile information of the currently authenticated captain. Requires a valid JWT token in the `Authorization` header (as `Bearer <token>`) or in the `token` cookie.

## Authentication

- Required: Yes (JWT)

## Request Headers

- `Authorization: Bearer <token>` (or send token as a cookie named `token`)

## Responses

- **200 OK**: Returns the captain profile object.
  - Example:
    ```json
    {
      "_id": "captain_id",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
      },
      "email": "jane.smith@example.com",
      "vechile": {
        "color": "red",
        "plate": "HR 36 B 0777",
        "capacity": 4,
        "vechileType": "car"
      }
      // ...other fields
    }
    ```
- **401 Unauthorized**: No token, invalid token, or captain not found.
  - Example:
    ```json
    { "message": "Unauthorized access" }
    ```

---

# Captain Logout API

## Endpoint

`POST /captains/logout`

## Description

Logs out the currently authenticated captain by blacklisting their JWT token. Requires a valid JWT token in the `Authorization` header (as `Bearer <token>`) or in the `token` cookie.

## Authentication

- Required: Yes (JWT)

## Request Headers

- `Authorization: Bearer <token>` (or send token as a cookie named `token`)

## Responses

- **200 OK**: Logout successful.
  - Example:
    ```json
    { "message": "Logout successful" }
    ```
- **401 Unauthorized**: No token, invalid token, or token is blacklisted.
  - Example:
    ```json
    { "message": "Access denied. No token provided." }
    ```
    or
    ```json
    { "message": "Access denied. Token is blacklisted." }
    ```
