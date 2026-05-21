# Jira Lite

A mini clone of Atlassian Jira — a REST API for project management with workspaces, projects, tasks, comments, and activity logging.

## Tech Stack

- **Node.js** — runtime
- **Express.js** — web framework
- **MongoDB** — database
- **Mongoose** — ODM
- **JWT** — authentication
- **Zod** — input validation
- **Docker** — containerization

## Features

- JWT-based authentication (register, login)
- Workspace management with role-based membership
- Projects inside workspaces
- Tasks with status, priority, and assignee
- Comments on tasks
- Activity logging on task actions
- Pagination on all list endpoints
- Rate limiting on auth routes
- Global error handling
- Input validation on all POST/PATCH routes

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB running locally or a MongoDB Atlas URI

### Installation

```bash
git clone https://github.com/s4nkalp47/jira-clone.git
cd jira-clone
npm install
```

### Environment Variables

Create a `.env` file in the root:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

### Run

```bash
npm run dev
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register a new user |
| POST | `/api/v1/auth/login` | Login and get JWT token |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/users/me` | Get current user |

### Workspaces
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/workspaces` | Create a workspace |
| GET | `/api/v1/workspaces` | Get all workspaces for current user |
| POST | `/api/v1/workspaces/:id/invite` | Invite a member to workspace |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/workspaces/:workspaceId/projects` | Create a project |
| GET | `/api/v1/workspaces/:workspaceId/projects` | Get all projects in a workspace |
| POST | `/api/v1/workspaces/:projectId/members` | Add a member to a project |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/projects/:projectId/tasks` | Create a task |
| GET | `/api/v1/projects/:projectId/tasks` | Get all tasks in a project |
| PATCH | `/api/v1/tasks/:taskId` | Update a task |
| DELETE | `/api/v1/tasks/:taskId` | Delete a task |
| GET | `/api/v1/tasks/:taskId/activity` | Get activity log for a task |

### Comments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/tasks/:taskId/comments` | Add a comment to a task |
| GET | `/api/v1/tasks/:taskId/comments` | Get all comments on a task |
| PATCH | `/api/v1/comments/:commentId` | Edit a comment |
| DELETE | `/api/v1/comments/:commentId` | Delete a comment |

## Pagination

All list endpoints support pagination via query params:

```
GET /api/v1/projects/:projectId/tasks?page=1&limit=10
```

Response includes `page`, `limit`, `total`, and `totalPages`.

## Running with Docker

```bash
docker-compose up
```
