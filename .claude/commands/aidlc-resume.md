# AI-DLC Session Resume

Resume an existing AI-DLC workflow session.

## Usage

```
/aidlc-resume
```

## Instructions

When this command is invoked:

### Step 1: Load Session Continuity Rules
1. Read `.claude/rules/common/session-continuity.md`
2. Read `.claude/rules/common/terminology.md`

### Step 2: Check for Existing Session
Check if `aidlc-docs/aidlc-state.md` exists:
- **If not exists**: Inform user there is no active session and suggest using `/aidlc` to start a new one
- **If exists**: Continue to Step 3

### Step 3: Load Session State
1. Read `aidlc-docs/aidlc-state.md` to get current status
2. Parse the current phase, stage, and progress
3. Identify the last completed step and next action

### Step 4: Load Previous Stage Artifacts
Based on current stage, load relevant artifacts:

**Early Stages (Workspace Detection, Reverse Engineering)**:
- Load workspace analysis from `aidlc-state.md`

**Requirements/Stories**:
- Load `aidlc-docs/inception/requirements/requirements.md`
- Load `aidlc-docs/inception/user-stories/stories.md` (if exists)

**Design Stages**:
- Load all inception artifacts
- Load application design artifacts
- Load unit definitions

**Code Stages**:
- Load ALL previous artifacts
- Load existing code files

### Step 5: Present Welcome Back Message
Display status summary:

```markdown
**Welcome back! I can see you have an existing AI-DLC project in progress.**

Based on your aidlc-state.md, here's your current status:
- **Project**: [project-name]
- **Current Phase**: [INCEPTION/CONSTRUCTION/OPERATIONS]
- **Current Stage**: [Stage Name]
- **Last Completed**: [Last completed step]
- **Next Step**: [Next step to work on]

**What would you like to work on today?**

A) Continue where you left off ([Next step description])
B) Review a previous stage ([Show available stages])

[Answer]:
```

### Step 6: Log Resumption
Add entry to `aidlc-docs/audit.md`:
```markdown
## Session Resumed
**Timestamp**: [ISO 8601]
**Previous Stage**: [stage name]
**Resuming From**: [checkpoint]
```

### Step 7: Load Current Stage Rules
Based on user's choice:
- Load the appropriate rule file from `.claude/rules/`
- Resume execution from the identified checkpoint

### Step 8: Continue Workflow
Execute the current stage according to its rules, picking up from where the session left off.

## Error Handling

If artifacts are missing or corrupted:
1. Read `.claude/rules/common/error-handling.md`
2. Follow the recovery procedures
3. Inform user of any issues and options

## Example Output

```
Welcome back! I can see you have an existing AI-DLC project in progress.

Based on your aidlc-state.md, here's your current status:
- **Project**: Todo API
- **Current Phase**: CONSTRUCTION
- **Current Stage**: Code Generation
- **Last Completed**: Step 5 - Business Logic Unit Testing
- **Next Step**: Step 6 - API Layer Generation

What would you like to work on today?
```
