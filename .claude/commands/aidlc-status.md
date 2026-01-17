# AI-DLC Status Check

Display the current status of the AI-DLC workflow.

## Usage

```
/aidlc-status
```

## Instructions

When this command is invoked:

### Step 1: Check for Active Session
Check if `aidlc-docs/aidlc-state.md` exists:
- **If not exists**: Display "No active AI-DLC session found. Use `/aidlc` to start a new workflow."
- **If exists**: Continue to Step 2

### Step 2: Read State File
Read and parse `aidlc-docs/aidlc-state.md` to extract:
- Project type (Greenfield/Brownfield)
- Start date
- Current phase
- Current stage
- Completed stages
- Pending stages

### Step 3: Scan Artifact Directories
Check for existence of key artifacts:
- `aidlc-docs/inception/requirements/requirements.md`
- `aidlc-docs/inception/user-stories/stories.md`
- `aidlc-docs/inception/application-design/`
- `aidlc-docs/construction/plans/`
- `aidlc-docs/construction/test-summary.md`

### Step 4: Display Status Report

```markdown
# 📊 AI-DLC Workflow Status

## Project Information
- **Project Type**: [Greenfield/Brownfield]
- **Started**: [Date]
- **Workspace Root**: [Path]

## Current Position
- **Phase**: [INCEPTION/CONSTRUCTION/OPERATIONS]
- **Stage**: [Current Stage Name]
- **Status**: [In Progress/Awaiting Approval/Complete]

## Phase Progress

### 🔵 INCEPTION PHASE
- [x] Workspace Detection - COMPLETE
- [x] Reverse Engineering - [COMPLETE/SKIPPED/N/A]
- [x] Requirements Analysis - [COMPLETE/IN PROGRESS/PENDING]
- [ ] User Stories - [COMPLETE/SKIPPED/PENDING]
- [ ] Workflow Planning - [COMPLETE/PENDING]
- [ ] Application Design - [COMPLETE/SKIPPED/PENDING]
- [ ] Units Generation - [COMPLETE/SKIPPED/PENDING]

### 🟢 CONSTRUCTION PHASE
[For each unit if applicable:]
- [ ] Functional Design - [Status]
- [ ] NFR Requirements - [Status]
- [ ] NFR Design - [Status]
- [ ] Infrastructure Design - [Status]
- [ ] Code Generation - [Status]
- [ ] Build and Test - [Status]

### 🟡 OPERATIONS PHASE
- [ ] Operations - PLACEHOLDER

## Generated Artifacts
- Requirements: [✓/✗]
- User Stories: [✓/✗/Skipped]
- Application Design: [✓/✗/Skipped]
- Units: [count] defined
- Code Generated: [✓/✗]
- Tests Passed: [✓/✗]

## Next Action
[Description of what needs to happen next]

---
**Commands:**
- `/aidlc-resume` - Continue where you left off
- `/aidlc` - Start a new workflow (will ask about existing session)
```

### Step 5: Provide Recommendations

Based on current status, suggest next actions:
- If awaiting approval: Remind user to review and approve
- If in progress: Describe what's being worked on
- If complete: Suggest deployment or next steps

## Example Output

```markdown
# 📊 AI-DLC Workflow Status

## Project Information
- **Project Type**: Greenfield
- **Started**: 2024-01-15T10:30:00Z
- **Workspace Root**: /Users/dev/todo-api

## Current Position
- **Phase**: CONSTRUCTION
- **Stage**: Code Generation
- **Status**: In Progress

## Phase Progress

### 🔵 INCEPTION PHASE
- [x] Workspace Detection - COMPLETE
- [x] Requirements Analysis - COMPLETE
- [x] User Stories - COMPLETE
- [x] Workflow Planning - COMPLETE
- [x] Application Design - COMPLETE
- [x] Units Generation - COMPLETE

### 🟢 CONSTRUCTION PHASE
- [x] Functional Design - COMPLETE
- [x] NFR Requirements - COMPLETE
- [x] NFR Design - COMPLETE
- [x] Infrastructure Design - COMPLETE
- [ ] Code Generation - IN PROGRESS (Step 6/12)
- [ ] Build and Test - PENDING

## Generated Artifacts
- Requirements: ✓
- User Stories: ✓
- Application Design: ✓
- Units: 1 defined
- Code Generated: In Progress
- Tests Passed: Pending

## Next Action
Complete API Layer Generation (Step 6 of Code Generation)
```
