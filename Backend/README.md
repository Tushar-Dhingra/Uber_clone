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
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}

## Responses
- **201 Created**: User successfully registered.
  - Response body will contain the user object.
  
- **400 Bad Request**: Validation errors occurred.
  - Response body will contain an array of error messages.

## Status Codes
- `201`: User created successfully.
- `400`: Validation errors in the request body.