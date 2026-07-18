# Calendars Tool — Backend API Documentation

> **For the backend developer.**  
> This document describes every API endpoint the Calendars Tool UI needs.  
> Base URL: `/api/v1/calendars-tool`  
> All requests require `Authorization: Bearer <token>` header.  
> All responses use `Content-Type: application/json`.

---

## Table of Contents

1. [Upload Syllabus](#1-upload-syllabus)
2. [Get Extraction Status](#2-get-extraction-status)
3. [Get All Courses](#3-get-all-courses)
4. [Get Calendar Events](#4-get-calendar-events)
5. [Get Single Event](#5-get-single-event)
6. [Save / Update Grade](#6-save--update-grade)
7. [Toggle Task Completion](#7-toggle-task-completion)
8. [Get Dashboard Stats](#8-get-dashboard-stats)

---

## Data Types Reference

| Field | Type | Notes |
|---|---|---|
| `id` | `string` (UUID) | Unique identifier |
| `start_time` | `string` (ISO 8601) | `"2026-07-10T08:00:00Z"` |
| `end_time` | `string` (ISO 8601) | `"2026-07-10T10:00:00Z"` |
| `type` | `enum` | `"lab"`, `"quiz"`, `"exam"`, `"assignment"`, `"reading"` |
| `status` | `enum` | `"pending"`, `"processing"`, `"done"`, `"failed"` |
| `grade_status` | `enum` | `"not_graded"`, `"graded"` |

---

## 1. Upload Syllabus

Upload one or more syllabus files. Backend stores the file and starts AI extraction asynchronously.

**`POST /api/v1/calendars-tool/syllabi/upload`**

### Request
```
Content-Type: multipart/form-data

files[]   → File (PDF / DOCX / PPTX / TXT, max 25 MB each)
user_id   → string
```

### Demo Response — `201 Created`
```json
{
  "success": true,
  "uploaded": [
    {
      "id": "syl_abc123",
      "file_name": "Fundamentals_of_Nursing_Syllabus.pdf",
      "file_size_mb": 2.4,
      "mime_type": "application/pdf",
      "status": "processing",
      "uploaded_at": "2026-07-18T05:30:00Z",
      "extraction_job_id": "job_xyz789"
    },
    {
      "id": "syl_def456",
      "file_name": "Pharmacology_Syllabus.pdf",
      "file_size_mb": 1.8,
      "mime_type": "application/pdf",
      "status": "processing",
      "uploaded_at": "2026-07-18T05:30:01Z",
      "extraction_job_id": "job_xyz790"
    }
  ]
}
```

### Error Response — `413 Payload Too Large`
```json
{
  "success": false,
  "error": "FILE_TOO_LARGE",
  "message": "File exceeds the 25 MB limit.",
  "file_name": "BigFile.pdf"
}
```

---

## 2. Get Extraction Status

Poll this endpoint to check if AI extraction is complete. Frontend polls every 3 seconds after upload.

**`GET /api/v1/calendars-tool/syllabi`**

### Demo Response — `200 OK`
```json
{
  "success": true,
  "syllabi": [
    {
      "id": "syl_abc123",
      "file_name": "Fundamentals_of_Nursing_Syllabus.pdf",
      "file_size_mb": 2.4,
      "status": "done",
      "course_code": "NUR 201",
      "uploaded_at": "2026-07-18T05:30:00Z",
      "processed_at": "2026-07-18T05:30:45Z"
    },
    {
      "id": "syl_def456",
      "file_name": "Pharmacology_Syllabus.pdf",
      "file_size_mb": 1.8,
      "status": "done",
      "course_code": "NUR 310",
      "uploaded_at": "2026-07-18T05:30:01Z",
      "processed_at": "2026-07-18T05:31:10Z"
    },
    {
      "id": "syl_ghi789",
      "file_name": "Maternal_Nursing_Syllabus.pdf",
      "file_size_mb": 1.5,
      "status": "pending",
      "course_code": null,
      "uploaded_at": "2026-07-18T05:31:00Z",
      "processed_at": null
    }
  ]
}
```

> **Status values:**
> - `"pending"` → queued, not started  
> - `"processing"` → AI is reading the file  
> - `"done"` → extraction complete, events are ready  
> - `"failed"` → extraction failed (show error UI)

---

## 3. Get All Courses

Returns all courses extracted from syllabi. Used in the "My Courses" sidebar and Grades tab.

**`GET /api/v1/calendars-tool/courses`**

### Demo Response — `200 OK`
```json
{
  "success": true,
  "courses": [
    {
      "id": "course_nur201",
      "code": "NUR 201",
      "name": "Fundamentals of Nursing",
      "color": "#3B82F6",
      "instructor": {
        "name": "Dr. Sandra Mills",
        "email": "s.mills@nursing.edu",
        "office_hours": "Mon/Wed 2:00-4:00 PM",
        "room": "SCI 204"
      },
      "schedule": "MWF 9:00-10:15 AM",
      "credits": 3,
      "current_grade": {
        "letter": "A-",
        "percentage": 92.5,
        "earned_points": 22,
        "total_points": 70
      },
      "completion": {
        "completed": 1,
        "total": 4
      },
      "syllabus_id": "syl_abc123"
    },
    {
      "id": "course_nur310",
      "code": "NUR 310",
      "name": "Pharmacology",
      "color": "#8B5CF6",
      "instructor": {
        "name": "Prof. James Chen",
        "email": "j.chen@pharm.edu",
        "office_hours": "Tue/Thu 1:00-3:00 PM",
        "room": "NUR 102"
      },
      "schedule": "MWF 10:00-11:15 AM",
      "credits": 3,
      "current_grade": {
        "letter": "B+",
        "percentage": 88.0,
        "earned_points": 22,
        "total_points": 25
      },
      "completion": {
        "completed": 1,
        "total": 3
      },
      "syllabus_id": "syl_def456"
    },
    {
      "id": "course_nur315",
      "code": "NUR 315",
      "name": "Medical-Surgical Nursing",
      "color": "#10B981",
      "instructor": {
        "name": "Dr. Maria Torres",
        "email": "m.torres@medsurg.edu",
        "office_hours": "Mon 11:00 AM-1:00 PM",
        "room": "SIM 101"
      },
      "schedule": "MW 8:00-11:00 AM",
      "credits": 4,
      "current_grade": null,
      "completion": {
        "completed": 0,
        "total": 3
      },
      "syllabus_id": "syl_ghi111"
    },
    {
      "id": "course_bio220",
      "code": "BIO 220",
      "name": "Pathophysiology",
      "color": "#F59E0B",
      "instructor": {
        "name": "Dr. Karen White",
        "email": "k.white@bio.edu",
        "office_hours": "Fri 10:00 AM-12:00 PM",
        "room": "BIO 301"
      },
      "schedule": "TR 11:00-12:15 PM",
      "credits": 3,
      "current_grade": {
        "letter": "A",
        "percentage": 100.0,
        "earned_points": 10,
        "total_points": 10
      },
      "completion": {
        "completed": 1,
        "total": 4
      },
      "syllabus_id": "syl_jkl222"
    },
    {
      "id": "course_nur320",
      "code": "NUR 320",
      "name": "Maternal Nursing",
      "color": "#EF4444",
      "instructor": {
        "name": "Dr. Lena Foster",
        "email": "l.foster@nur.edu",
        "office_hours": "Wed 9:00-11:00 AM",
        "room": "NUR 205"
      },
      "schedule": "TR 1:00-2:15 PM",
      "credits": 3,
      "current_grade": null,
      "completion": {
        "completed": 0,
        "total": 3
      },
      "syllabus_id": "syl_mno333"
    }
  ]
}
```

---

## 4. Get Calendar Events

Returns all events extracted from syllabi. Used by Calendar, Tasks, and Agenda views.

**`GET /api/v1/calendars-tool/events`**

### Query Parameters

| Param | Type | Required | Description |
|---|---|---|---|
| `course_id` | string | No | Filter by course |
| `type` | string | No | `lab`, `quiz`, `exam`, `assignment`, `reading` |
| `from` | ISO date | No | Start of date range e.g. `2026-07-01` |
| `to` | ISO date | No | End of date range e.g. `2026-07-31` |

### Demo Response — `200 OK`
```json
{
  "success": true,
  "events": [
    {
      "id": "evt_e1",
      "title": "Patient Assessment Lab",
      "course_id": "course_nur201",
      "course_code": "NUR 201",
      "type": "lab",
      "start_time": "2026-07-10T08:00:00Z",
      "end_time": "2026-07-10T10:00:00Z",
      "points": 50,
      "instructor": {
        "name": "Dr. Sandra Mills",
        "email": "s.mills@nursing.edu",
        "room": "SCI 204 · MWF 9:00-10:15 AM"
      },
      "is_completed": true,
      "grade": {
        "status": "graded",
        "earned_points": 4,
        "total_points": 50,
        "percentage": 8
      }
    },
    {
      "id": "evt_e3",
      "title": "Drug Classification Quiz",
      "course_id": "course_nur310",
      "course_code": "NUR 310",
      "type": "quiz",
      "start_time": "2026-07-11T09:00:00Z",
      "end_time": "2026-07-11T10:00:00Z",
      "points": 25,
      "instructor": {
        "name": "Prof. James Chen",
        "email": "j.chen@pharm.edu",
        "room": "NUR 102 · MWF 10:00-11:15 AM"
      },
      "is_completed": true,
      "grade": {
        "status": "graded",
        "earned_points": 22,
        "total_points": 25,
        "percentage": 88
      }
    },
    {
      "id": "evt_e4",
      "title": "Prenatal Assessment Quiz",
      "course_id": "course_nur320",
      "course_code": "NUR 320",
      "type": "quiz",
      "start_time": "2026-07-12T09:00:00Z",
      "end_time": "2026-07-12T10:00:00Z",
      "points": 25,
      "instructor": {
        "name": "Dr. Lena Foster",
        "email": "l.foster@nur.edu",
        "room": "NUR 205 · TR 1:00-2:15 PM"
      },
      "is_completed": false,
      "grade": {
        "status": "not_graded",
        "earned_points": null,
        "total_points": 25,
        "percentage": null
      }
    },
    {
      "id": "evt_e12",
      "title": "Midterm Exam",
      "course_id": "course_nur201",
      "course_code": "NUR 201",
      "type": "exam",
      "start_time": "2026-07-21T09:00:00Z",
      "end_time": "2026-07-21T11:00:00Z",
      "points": 100,
      "instructor": {
        "name": "Dr. Sandra Mills",
        "email": "s.mills@nursing.edu",
        "room": "SCI 204 · MWF 9:00-10:15 AM"
      },
      "is_completed": false,
      "grade": {
        "status": "not_graded",
        "earned_points": null,
        "total_points": 100,
        "percentage": null
      }
    }
  ]
}
```

---

## 5. Get Single Event

Full detail for one event. Called when user clicks a calendar event to open the modal.

**`GET /api/v1/calendars-tool/events/:event_id`**

### Demo Response — `200 OK`
```json
{
  "success": true,
  "event": {
    "id": "evt_e1",
    "title": "Patient Assessment Lab",
    "course_id": "course_nur201",
    "course_code": "NUR 201",
    "course_name": "Fundamentals of Nursing",
    "type": "lab",
    "start_time": "2026-07-10T08:00:00Z",
    "end_time": "2026-07-10T10:00:00Z",
    "points": 50,
    "instructor": {
      "name": "Dr. Sandra Mills",
      "email": "s.mills@nursing.edu",
      "room": "SCI 204 · MWF 9:00-10:15 AM"
    },
    "is_completed": true,
    "grade": {
      "status": "graded",
      "earned_points": 4,
      "total_points": 50,
      "percentage": 8,
      "graded_at": "2026-07-11T12:00:00Z"
    },
    "notes": null
  }
}
```

---

## 6. Save / Update Grade

Called when student clicks **Save** after entering a grade in the Grades tab or Event Modal.

**`PATCH /api/v1/calendars-tool/events/:event_id/grade`**

### Request Body
```json
{
  "earned_points": 22
}
```

### Demo Response — `200 OK`
```json
{
  "success": true,
  "event_id": "evt_e3",
  "grade": {
    "status": "graded",
    "earned_points": 22,
    "total_points": 25,
    "percentage": 88,
    "graded_at": "2026-07-18T06:00:00Z"
  },
  "course_grade_updated": {
    "course_id": "course_nur310",
    "new_percentage": 88.0,
    "new_letter": "B+",
    "earned_points": 22,
    "total_possible_points": 25
  }
}
```

> **Important:** Return `course_grade_updated` so the frontend can live-update the sidebar grade badge and Grades tab header without a full refetch.

---

## 7. Toggle Task Completion

Called when student clicks the circle checkbox on the Tasks tab.

**`PATCH /api/v1/calendars-tool/events/:event_id/complete`**

### Request Body
```json
{
  "is_completed": true
}
```

### Demo Response — `200 OK`
```json
{
  "success": true,
  "event_id": "evt_e1",
  "is_completed": true,
  "updated_at": "2026-07-18T06:05:00Z",
  "completion_summary": {
    "course_id": "course_nur201",
    "completed": 2,
    "total": 4
  }
}
```

---

## 8. Get Dashboard Stats

Returns the four stat cards at the top of the planner.

**`GET /api/v1/calendars-tool/stats`**

### Demo Response — `200 OK`
```json
{
  "success": true,
  "stats": {
    "overall_gpa": {
      "value": 3.67,
      "display": "3.67",
      "change_this_week": 0.04,
      "change_label": "+0.04 this week"
    },
    "completed_assignments": {
      "completed": 3,
      "total": 17,
      "display": "3/17"
    },
    "upcoming_due_this_week": {
      "count": 6,
      "display": "6"
    },
    "courses_this_semester": {
      "count": 5,
      "display": "5"
    }
  },
  "upcoming_deadlines": [
    {
      "event_id": "evt_e1",
      "title": "Patient Assessment Lab",
      "course_code": "NUR 201",
      "points": 50,
      "due_date": "2026-07-10T08:00:00Z",
      "days_left": 1
    },
    {
      "event_id": "evt_e4",
      "title": "Prenatal Assessment Quiz",
      "course_code": "NUR 320",
      "points": 25,
      "due_date": "2026-07-12T09:00:00Z",
      "days_left": 3
    },
    {
      "event_id": "evt_e5",
      "title": "Clinical Skills Check-off",
      "course_code": "NUR 315",
      "points": 75,
      "due_date": "2026-07-13T08:00:00Z",
      "days_left": 4
    },
    {
      "event_id": "evt_e7",
      "title": "Disease Mechanism Quiz",
      "course_code": "BIO 220",
      "points": 30,
      "due_date": "2026-07-15T10:00:00Z",
      "days_left": 6
    },
    {
      "event_id": "evt_e8",
      "title": "Pharmacokinetics Paper",
      "course_code": "NUR 310",
      "points": 60,
      "due_date": "2026-07-16T09:00:00Z",
      "days_left": 7
    },
    {
      "event_id": "evt_e9",
      "title": "SBAR Case Study",
      "course_code": "NUR 315",
      "points": 50,
      "due_date": "2026-07-18T09:00:00Z",
      "days_left": 9
    }
  ]
}
```

---

## Standard Error Format

```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human-readable description.",
  "details": {}
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|---|---|---|
| `UNAUTHORIZED` | 401 | Missing or invalid token |
| `FORBIDDEN` | 403 | User doesn't own this resource |
| `NOT_FOUND` | 404 | Event / course / syllabus not found |
| `VALIDATION_ERROR` | 422 | Invalid field (e.g. grade > max points) |
| `FILE_TOO_LARGE` | 413 | Upload exceeds 25 MB |
| `UNSUPPORTED_FILE` | 415 | File type not accepted |
| `EXTRACTION_FAILED` | 500 | AI could not parse the syllabus |

---

## Frontend ↔ Backend Field Mapping

| Frontend field | Backend field | Notes |
|---|---|---|
| `event.id` | `id` | e.g. `"evt_e1"` |
| `event.course` | `course_code` | e.g. `"NUR 201"` |
| `event.pts` | `points` | Integer |
| `event.start` | `start_time` | ISO 8601 → `new Date()` |
| `event.end` | `end_time` | ISO 8601 → `new Date()` |
| `event.type` | `type` | `lab/quiz/exam/assignment/reading` |
| `event.instructor` | `instructor.name` | String |
| `event.email` | `instructor.email` | String |
| `event.room` | `instructor.room` | String |
| `course.name` | `code` | e.g. `"NUR 201"` |
| `course.label` | `name` | e.g. `"Fundamentals of Nursing"` |
| `course.grade` | `current_grade.letter` | Nullable string |
| `course.done` | `completion.completed + "/" + total` | Formatted on frontend |
| `syllabus.status` | `status` | `pending/processing/done/failed` |
| `syllabus.size` | `file_size_mb` | Number → `"2.4 MB"` on frontend |

---

## Implementation Notes

1. **Syllabus extraction** runs as a background job. Return `extraction_job_id` immediately, update `status` as the job progresses. Frontend polls `/syllabi` every 3 s.

2. **Timestamps** must be **ISO 8601 UTC** (`"2026-07-10T08:00:00Z"`). Frontend converts to local timezone via `new Date()`.

3. **Course color** (`"#3B82F6"`) is assigned by the backend on course creation. Must be unique per user per semester. Frontend uses it for calendar tiles, sidebar dots, and grade block borders.

4. **Grade update** must return `course_grade_updated` for live sidebar refresh without a full refetch.

5. **`days_left`** in `upcoming_deadlines` is calculated server-side relative to `now()` UTC. Frontend urgency colors: `≤1d → red (#EF4444)`, `≤3d → amber (#F59E0B)`, `≤7d → green (#10B981)`.

6. **`is_completed`** is student-only (checkbox toggle). It does **not** affect grade calculation.
