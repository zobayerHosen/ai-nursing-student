# QBank API Documentation

API endpoints for the NCLEX practice module, from the **QBank** folder in the `phainistonny` collection.

**Base URL:** `{{base_url}}`  |  **Auth:** Bearer token — `Authorization: Bearer {{access}}` (all endpoints)

| # | Endpoint | Method | Purpose |
| --- | --- | --- | --- |
| 1 | `{{base_url}}nclex/practice/` | GET | List practice questions |
| 2 | `{{base_url}}nclex/practice/session/` | POST | Start a practice session |
| 3 | `{{base_url}}nclex/practice/exam/{id}/` | GET | Get a practice exam |
| 4 | `{{base_url}}nclex/practice/answer/` | POST | Submit an answer |
| 5 | `{{base_url}}nclex/practice/finish/{id}/` | POST | Finish an exam |

---

## 1\. Practice Question List

List available practice questions.

- **Method:** `GET`
    
- **URL:** `{{base_url}}nclex/practice/`
    
- **Auth:** Bearer `{{access}}`
    

---

## 2\. Practice Session

Start a new practice session.

- **Method:** `POST`
    
- **URL:** `{{base_url}}nclex/practice/session/`
    
- **Auth:** Bearer `{{access}}`
    

**Request Body**

``` json
{
    "mode": "tutorial",
    "total_question": 5,
    "topic_id": null,
    "subtopic_id": 3
}

 ```

---

## 3\. Practice Exam

Retrieve a practice exam by its ID.

- **Method:** `GET`
    
- **URL:** `{{base_url}}nclex/practice/exam/{id}/` (example: `.../exam/6/`)
    
- **Auth:** Bearer `{{access}}`
    

---

## 4\. Question Answer

Submit an answer for a question in a session. The response shape varies by question type and by mode (in **test** mode the correct answer is not returned).

- **Method:** `POST`
    
- **URL:** `{{base_url}}nclex/practice/answer/`
    
- **Auth:** Bearer `{{access}}`
    

### 4.1 Tutorial mode — Radio

**Request**

``` json
{
    "session_id": 5,
    "question_id": 292,
    "answer": [401]
}

 ```

**Response** `200 OK`

``` json
{
    "success": true,
    "message": "Answer submitted successfully.",
    "status": 200,
    "data": {
        "session_id": 5,
        "answer_submitted": true,
        "is_finished": false,
        "is_correct": true,
        "correct_answer": {
            "id": 401,
            "text": "Assess the client and recheck the blood pressure."
        },
        "explanation": null
    }
}

 ```

### 4.2 Test mode — Radio

In test mode the correct answer / correctness is not disclosed.

**Request**

``` json
{
    "session_id": 4,
    "question_id": 291,
    "answer": [397]
}

 ```

**Response** `200 OK`

``` json
{
    "success": true,
    "message": "Answer submitted successfully.",
    "status": 200,
    "data": {
        "session_id": 4,
        "answer_submitted": true,
        "is_finished": false
    }
}

 ```

### 4.3 Tutorial mode — Order

Answer is an ordered array of option IDs.

**Request**

``` json
{
    "session_id": 5,
    "question_id": 298,
    "answer": [425, 427, 426, 428]
}

 ```

**Response** `200 OK`

``` json
{
    "success": true,
    "message": "Answer submitted successfully.",
    "status": 200,
    "data": {
        "session_id": 5,
        "answer_submitted": true,
        "is_finished": false,
        "is_correct": false,
        "correct_answer": [
            { "id": 425, "text": "Inspect the abdomen.", "order": 1 },
            { "id": 426, "text": "Auscultate bowel sounds.", "order": 2 },
            { "id": 427, "text": "Percuss the abdomen.", "order": 3 },
            { "id": 428, "text": "Palpate the abdomen.", "order": 4 }
        ],
        "explanation": null
    }
}

 ```

### 4.4 Tutorial mode — Highlight

**Request**

``` json
{
    "session_id": 5,
    "question_id": 300,
    "answer": [430, 431]
}

 ```

**Response** `200 OK`

``` json
{
    "success": true,
    "message": "Answer submitted successfully.",
    "status": 200,
    "data": {
        "session_id": 5,
        "answer_submitted": true,
        "is_finished": false,
        "is_correct": false,
        "correct_answer": [
            { "id": 429, "text": "assess oxygenation when the oxygen saturation is low" }
        ],
        "explanation": null
    }
}

 ```

### 4.5 Tutorial mode — Multiple

**Request**

``` json
{
    "session_id": 5,
    "question_id": 297,
    "answer": [421, 422]
}

 ```

**Response** `200 OK`

``` json
{
    "success": true,
    "message": "Answer submitted successfully.",
    "status": 200,
    "data": {
        "session_id": 5,
        "answer_submitted": true,
        "is_finished": false,
        "is_correct": true,
        "correct_answer": [
            { "id": 421, "text": "Compare findings with the client's baseline." },
            { "id": 422, "text": "Reassess an unexpected vital sign." }
        ],
        "explanation": null
    }
}

 ```

### 4.6 Tutorial mode — Input

Answer is a string value.

**Request**

``` json
{
    "session_id": 6,
    "question_id": 299,
    "answer": "125"
}

 ```

**Response** `200 OK`

``` json
{
    "success": true,
    "message": "Answer submitted successfully.",
    "status": 200,
    "data": {
        "session_id": 6,
        "answer_submitted": true,
        "is_finished": false,
        "is_correct": false,
        "correct_answer": {
            "answer": "assessment",
            "unit": ""
        },
        "explanation": null
    }
}

 ```

---

## 5\. Finish Exam

Finish a practice session and return the graded result summary.

- **Method:** `POST`
    
- **URL:** `{{base_url}}nclex/practice/finish/{id}/` (example: `.../finish/5/`)
    
- **Auth:** Bearer `{{access}}`
    
- **Request Body:** none
    

**Response** `200 OK`

``` json
{
    "success": true,
    "message": "Practice session finished successfully.",
    "status": 200,
    "data": {
        "session_id": 5,
        "is_finished": true,
        "result": {
            "total_correct_answer": 2,
            "total_incorrect_answer": 2,
            "total_skipped_answer": 1,
            "total_question": 5,
            "total_percentage": 40,
            "results": [
                {
                    "question_id": 292,
                    "title": "The nurse obtains a blood pressure of 88/54 mm Hg for a client who is pale and dizzy. What is the priority action?",
                    "type": "radio",
                    "user_answer": { "id": 401, "text": "Assess the client and recheck the blood pressure." },
                    "correct_answer": { "id": 401, "text": "Assess the client and recheck the blood pressure." },
                    "is_correct": true,
                    "explanation": null,
                    "is_skipped": false
                },
                {
                    "question_id": 296,
                    "title": "Which assessment technique is appropriate for an abdomen?",
                    "type": "radio",
                    "user_answer": null,
                    "correct_answer": { "id": 417, "text": "Auscultate before palpating." },
                    "is_correct": false,
                    "is_skipped": true,
                    "explanation": null
                },
                {
                    "question_id": 297,
                    "title": "For Assessment and Vital Signs, which actions are appropriate? Select all that apply.",
                    "type": "multiple",
                    "user_answer": [
                        { "id": 421, "text": "Compare findings with the client's baseline." },
                        { "id": 422, "text": "Reassess an unexpected vital sign." }
                    ],
                    "correct_answer": [
                        { "id": 421, "text": "Compare findings with the client's baseline." },
                        { "id": 422, "text": "Reassess an unexpected vital sign." }
                    ],
                    "is_correct": true,
                    "explanation": null,
                    "is_skipped": false
                },
                {
                    "question_id": 298,
                    "title": "Place these assessment and vital signs nursing actions in the correct order.",
                    "type": "order",
                    "user_answer": [
                        { "id": 425, "text": "Inspect the abdomen." },
                        { "id": 427, "text": "Percuss the abdomen." },
                        { "id": 426, "text": "Auscultate bowel sounds." },
                        { "id": 428, "text": "Palpate the abdomen." }
                    ],
                    "correct_answer": [
                        { "id": 425, "text": "Inspect the abdomen.", "order": 1 },
                        { "id": 426, "text": "Auscultate bowel sounds.", "order": 2 },
                        { "id": 427, "text": "Percuss the abdomen.", "order": 3 },
                        { "id": 428, "text": "Palpate the abdomen.", "order": 4 }
                    ],
                    "is_correct": false,
                    "explanation": null,
                    "is_skipped": false
                },
                {
                    "question_id": 300,
                    "title": "Highlight the priority action for assessment and vital signs.",
                    "type": "highlight",
                    "user_answer": [
                        { "id": 430, "text": "delay the assessment until the next routine round" },
                        { "id": 431, "text": "ask the client to manage the concern independently" }
                    ],
                    "correct_answer": [
                        { "id": 429, "text": "assess oxygenation when the oxygen saturation is low" }
                    ],
                    "is_correct": false,
                    "explanation": null,
                    "is_skipped": false
                }
            ]
        }
    }
}

 ```