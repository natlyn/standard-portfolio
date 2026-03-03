---
sidebar_position: 1
title: "Sample: TaskBridge API reference"
---

# TaskBridge API reference

:::info Writing sample
This is a portfolio sample demonstrating REST API documentation. TaskBridge is a fictional product created for illustration purposes.
:::

**Base URL:** `https://api.taskbridge.io/v1`

TaskBridge provides a REST API for creating, managing, and syncing tasks across external tools and project management platforms. All API requests require authentication via API key.

---

## Authentication

TaskBridge uses API key authentication. Include your API key in the `Authorization` header of every request.

```
Authorization: Bearer YOUR_API_KEY
```

You can generate an API key from **Settings > Integrations > API Keys** in the TaskBridge dashboard.

:::caution
Keep your API key secure. Do not expose it in client-side code or public repositories. If a key is compromised, revoke it immediately from the dashboard and generate a new one.
:::

---

## Rate Limits

| Plan | Requests per minute |
|---|---|
| Free | 60 |
| Pro | 300 |
| Enterprise | 1,000 |

When you exceed the rate limit, the API returns a `429 Too Many Requests` response. The `Retry-After` header specifies how many seconds to wait before retrying.

---

## Tasks

### List Tasks

Returns a paginated list of tasks in a project.

```
GET /projects/{project_id}/tasks
```

#### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `project_id` | string | Yes | The unique identifier of the project. |

#### Query Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `status` | string | No | Filter by status. Accepted values: `open`, `in_progress`, `completed`. |
| `assignee_id` | string | No | Filter by the ID of the assigned user. |
| `limit` | integer | No | Number of results per page. Default: `20`. Max: `100`. |
| `cursor` | string | No | Pagination cursor returned in the previous response. |

#### Example Request

```bash
curl -X GET "https://api.taskbridge.io/v1/projects/proj_abc123/tasks?status=open&limit=10" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

#### Example Response

```json
{
  "data": [
    {
      "id": "task_001xyz",
      "project_id": "proj_abc123",
      "title": "Update onboarding documentation",
      "status": "open",
      "assignee_id": "user_789def",
      "due_date": "2025-03-15",
      "created_at": "2025-02-01T10:30:00Z"
    }
  ],
  "pagination": {
    "next_cursor": "cursor_page2",
    "has_more": true
  }
}
```

---

### Create a Task

Creates a new task in the specified project.

```
POST /projects/{project_id}/tasks
```

#### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `project_id` | string | Yes | The unique identifier of the project. |

#### Request Body

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | Yes | The task title. Maximum 200 characters. |
| `description` | string | No | A longer description of the task. Supports Markdown. |
| `assignee_id` | string | No | The ID of the user to assign this task to. |
| `due_date` | string | No | Due date in `YYYY-MM-DD` format. |
| `priority` | string | No | Task priority. Accepted values: `low`, `medium`, `high`. Default: `medium`. |

#### Example Request

```bash
curl -X POST "https://api.taskbridge.io/v1/projects/proj_abc123/tasks" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Review API documentation draft",
    "description": "Check for accuracy and completeness of the v1 API reference.",
    "assignee_id": "user_789def",
    "due_date": "2025-03-20",
    "priority": "high"
  }'
```

#### Example Response

```json
{
  "id": "task_002abc",
  "project_id": "proj_abc123",
  "title": "Review API documentation draft",
  "description": "Check for accuracy and completeness of the v1 API reference.",
  "status": "open",
  "assignee_id": "user_789def",
  "due_date": "2025-03-20",
  "priority": "high",
  "created_at": "2025-02-26T14:22:00Z"
}
```

---

### Update a Task

Updates one or more fields on an existing task. Only the fields you include in the request body are updated.

```
PATCH /projects/{project_id}/tasks/{task_id}
```

#### Path Parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `project_id` | string | Yes | The unique identifier of the project. |
| `task_id` | string | Yes | The unique identifier of the task to update. |

#### Request Body

Any combination of the fields from [Create a Task](#create-a-task), plus:

| Field | Type | Required | Description |
|---|---|---|---|
| `status` | string | No | Updated task status. Accepted values: `open`, `in_progress`, `completed`. |

---

### Delete a Task

Permanently deletes a task. This action cannot be undone.

```
DELETE /projects/{project_id}/tasks/{task_id}
```

#### Example Response

Returns `204 No Content` on success. No response body is returned.

---

## Error Codes

| HTTP Status | Error Code | Description |
|---|---|---|
| `400` | `invalid_request` | The request body is malformed or missing required fields. |
| `401` | `unauthorized` | The API key is missing or invalid. |
| `403` | `forbidden` | The authenticated user does not have permission to access this resource. |
| `404` | `not_found` | The requested resource does not exist. |
| `422` | `validation_error` | The request is well-formed but contains invalid field values. |
| `429` | `rate_limit_exceeded` | You have exceeded the rate limit for your plan. |
| `500` | `internal_error` | An unexpected server error occurred. Contact support if this persists. |

#### Error Response Format

All errors return a consistent JSON structure:

```json
{
  "error": {
    "code": "not_found",
    "message": "No task found with ID task_999zzz in project proj_abc123.",
    "request_id": "req_xk92ms"
  }
}
```

---

*[← Back to Portfolio](./index.md)*