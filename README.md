1 . Overview

TokPilot is an AI + Web3 marketing agent that helps brands discover high‑intent leads in TikTok comment sections and crowd‑source authentic replies through a task marketplace.
	•	Employer (brand) ‑‑ posts a video URL & a promotion keyword
	•	Agent ‑‑ analyses the video’s comments (sentiment, interest, reply suggestions)
	•	User (executor) ‑‑ claims the task, posts a tailored reply, submits proof
	•	Agent ‑‑ auto‑scores the reply, writes a SHA‑256 hash as an on‑chain proof, returns status

⸻

2. Directories

agenttok/
├── backend/
│   ├── app.js              # Express entry
│   ├── routes/
│   │   ├── analyze.js      # POST /analyze
│   │   ├── task.js         # /task/claim • /task/submit • /task/status
│   │   └── proof.js        # writeProof()
│   └── data/
│       ├── comments.json   # mock TikTok comments
│       └── tasks.json      # runtime store
└── frontend/
    ├── public/
    ├── src/
    │   ├── pages/
    │   │   ├── employer/
    │   │   │   ├── CreateTask.tsx
    │   │   │   ├── TaskAnalysis.tsx
    │   │   │   └── TaskStatus.tsx
    │   │   └── user/
    │   │       ├── TaskList.tsx
    │   │       ├── TaskDetail.tsx
    │   │       └── TaskResult.tsx
    │   └── App.tsx
    └── vite.config.ts

3 . API Spec (Express)
Method
URL
Body params
Response
POST
/analyze
{ "video_url": "...", "keyword": "..." }
{ analysis: [...] }
POST
/task/claim
{ "task_id": "...", "user": "alice" }
{ status: "claimed" }
POST
/task/submit
{ "task_id": "...", "reply_text": "..." }
{ passed: true, tx: "<hash>" }
GET
/task/status?task_id=...
–
{ task: {...}, submissions:[...] }

4. Frontend Routes
Path
Component
Purpose
/employer/create-task
CreateTask
Form to post video & keyword
/employer/task/:id/analysis
TaskAnalysis
Show comment insights
/employer/task/:id/status
TaskStatus
Progress & proofs
/user/tasks
TaskList
Browse available tasks
/user/task/:id
TaskDetail
Read brief & submit reply
/user/task/:id/result
TaskResult
See AI score + hash

5. Quick Start (local)

Backend

$ cd backend
$ npm install
$ npm run dev or node app.js

Frontend

$ cd frontend
$ npm install
$ npm run dev
