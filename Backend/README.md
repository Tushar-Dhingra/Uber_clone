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
        "email": "john.doe@example.com",
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