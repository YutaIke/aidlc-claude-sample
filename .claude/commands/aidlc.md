# AI-DLC Workflow Startup

Start the AI-DLC (AI-Driven Development Life Cycle) workflow.

## Usage

```
/aidlc [optional: requirement description]
```

## Instructions

When this command is invoked:

### Step 1: Load Core Rules
1. Read `.claude/rules/common/process-overview.md`
2. Read `.claude/rules/common/terminology.md`
3. Read `.claude/rules/common/welcome-message.md`

### Step 2: Display Welcome Message
Display the welcome message from `common/welcome-message.md` to introduce the user to AI-DLC.

### Step 3: Check for Existing Session
Check if `aidlc-docs/aidlc-state.md` exists:
- **If exists**: Ask user if they want to resume the existing session or start fresh
- **If not exists**: Proceed with new workflow

### Step 4: Start Workspace Detection
1. Read `.claude/rules/inception/workspace-detection.md`
2. Execute workspace detection steps
3. Create `aidlc-docs/aidlc-state.md`
4. Create `aidlc-docs/audit.md` with initial entry

### Step 5: Capture User Requirements
If requirement description was provided with the command:
- Log it in `aidlc-docs/audit.md` with timestamp
- Use it as the initial user request

If no requirement was provided:
- Ask user to describe what they want to build or accomplish
- Log their response in `aidlc-docs/audit.md`

### Step 6: Proceed with Workflow
Based on workspace detection results:
- **Brownfield (existing code)**: Proceed to Reverse Engineering
- **Greenfield (no code)**: Proceed to Requirements Analysis

Load the appropriate rule file and execute.

## Key Principles

- **Load rules before each stage**: Always read the relevant rule file
- **Log everything**: All user inputs go to `audit.md` with timestamps
- **Ask questions in files**: Never ask questions in chat, use [Answer]: format
- **Wait for approvals**: Get explicit approval before proceeding between stages

## Example

```
/aidlc Build a REST API for managing a todo list application
```

This will start the AI-DLC workflow with the initial requirement captured.
