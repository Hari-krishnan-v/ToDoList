# To-Do List App (React + Node.js + Zustand)

This is a full-stack To-Do List application built with React (Vite), Zustand, Tailwind CSS, and Node.js (Express + MongoDB).

## Installation

Install package

```bash
cd frontend
npm install 
npm run dev
```

```bash
cd backend
npm install 
npm run dev
```

## API Reference

#### Signup User

```http
  POST/api/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Username for the new user |
| `email` | `string` | **Required**. Unique email for the new user|
| `password` | `string` | **Required**. Password (will be hashed)|
| `confirmPassword` | `string` | **Required**. Password (will be hashed)|

#### Login User

```http
  POST /api/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`    | `string` |  **Required**.User email    |
| `password` | `string` | **Required**.User password |


#### Logout User

```http
  POST /api/logout
```

#### Check Authentication

```http
 GET /api/check-auth
```

## To-Do Management (Authenticated Routes)

#### Create a To-Do

```http
POST /api/create-todo
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title`       | `string` |  Title of the task       |
| `description` | `string` | Description of the task |


#### Get All To-Dos for User

```http
GET /api/get-todo
```

#### Update a To-Do

```http
PUT /api/update-todo/:id
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title`       | `string` |  Updated title                          |
| `description` | `string` |  Updated description                    |
| `status`      | `string` | Task status (`pending` or `completed`) |

#### Delete a To-Do

```http
DELETE /api/delete-todo/:id
```



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_URI`

`JWT_SECRET`

`FRONTEND_URL`

## Tech Stack

**Client:** React, Zustand, TailwindCSS

**Server:** Node, Express, MongoDB