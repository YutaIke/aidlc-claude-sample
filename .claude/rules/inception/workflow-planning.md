# Workflow Planning

## Purpose
Determine which project phases to execute and create detailed execution plans.

## Prerequisites
- Workspace Detection must be complete
- Requirements Analysis must be complete
- Reverse Engineering must be complete (if brownfield)
- User Stories should be complete (if executed)

## Overview
This mandatory step follows requirements and scope understanding. It synthesizes all accumulated project intelligence to generate an informed execution strategy.

## Step-by-Step Execution

### Step 1: Load Prior Context
Load all relevant artifacts from previous stages:
- `aidlc-docs/aidlc-state.md` - Current state and project type
- `aidlc-docs/inception/requirements/requirements.md` - Requirements
- `aidlc-docs/inception/user-stories/stories.md` (if exists) - User stories
- `aidlc-docs/inception/reverse-engineering/` (if brownfield) - Existing system analysis

### Step 2: Scope and Impact Assessment

#### 2.1 Transformation Scope
Evaluate the scope of changes:
- **Single Component**: Changes isolated to one component
- **Multiple Components**: Changes across multiple components
- **Architectural**: System-wide architectural changes
- **Cross-System**: Changes affecting multiple systems

#### 2.2 Affected Components
Identify all affected areas:
- Application layer components
- Infrastructure components
- Integration points
- Data stores and schemas

#### 2.3 Component Relationships
Map dependencies:
- Create dependency graphs
- Identify cascading effects
- Document component relationships

### Step 3: Risk Evaluation

Categorize changes based on:
- **Isolation Level**: How contained are the changes?
- **Rollback Complexity**: How hard to undo if problems occur?
- **Uncertainty Factors**: Unknown elements or risks?

Risk Categories:
- **Low**: Well-isolated, easy rollback, minimal uncertainty
- **Medium**: Some dependencies, moderate rollback effort
- **High**: Significant dependencies, complex rollback
- **Critical**: System-wide impact, difficult recovery

### Step 4: Phase Determination

Apply conditional logic to determine which stages to execute:

#### Always Execute
- Workspace Detection (already complete)
- Requirements Analysis (already complete)
- Workflow Planning (current stage)
- Code Generation
- Build and Test

#### Conditional Stages

**Reverse Engineering** (brownfield only):
- Execute if existing code detected
- Skip if greenfield project

**User Stories**:
- Execute if multiple personas or complex user interactions
- Execute if user experience impacts require validation
- Skip for internal refactoring or simple bug fixes

**Application Design**:
- Execute if new components or significant architecture changes
- Execute if component boundaries unclear
- Skip for changes within existing well-defined components

**Units Generation**:
- Execute if multiple units of work needed
- Execute if team parallelization beneficial
- Skip for single-unit simple projects

**Functional Design** (per-unit):
- Execute if complex business logic
- Execute if detailed design needed
- Skip for simple CRUD operations

**NFR Requirements** (per-unit):
- Execute if performance, security, or scalability concerns
- Execute if technology stack decisions needed
- Skip if inheriting existing NFR decisions

**NFR Design** (per-unit):
- Execute if NFR patterns needed
- Skip if simple or inherited patterns

**Infrastructure Design** (per-unit):
- Execute if cloud/infrastructure mapping needed
- Skip if using existing infrastructure

### Step 5: Create Execution Plan

Generate `aidlc-docs/inception/plans/execution-plan.md`:

```markdown
# Execution Plan

## Project Summary
- **Project Type**: [Greenfield/Brownfield]
- **Scope**: [Single Component/Multiple Components/Architectural/Cross-System]
- **Risk Level**: [Low/Medium/High/Critical]

## Transformation Scope
[Description of what will be changed]

## Component Relationships
[Dependency diagram or description]

## Phase Execution Plan

### 🔵 INCEPTION PHASE
- [x] Workspace Detection - COMPLETE
- [x] Reverse Engineering - [COMPLETE/SKIPPED/N/A]
- [x] Requirements Analysis - COMPLETE
- [x] User Stories - [COMPLETE/SKIPPED]
- [x] Workflow Planning - COMPLETE
- [ ] Application Design - [EXECUTE/SKIP] - [Reason]
- [ ] Units Generation - [EXECUTE/SKIP] - [Reason]

### 🟢 CONSTRUCTION PHASE
[For each unit:]
- [ ] Functional Design - [EXECUTE/SKIP] - [Reason]
- [ ] NFR Requirements - [EXECUTE/SKIP] - [Reason]
- [ ] NFR Design - [EXECUTE/SKIP] - [Reason]
- [ ] Infrastructure Design - [EXECUTE/SKIP] - [Reason]
- [ ] Code Generation - EXECUTE
- [ ] Build and Test - EXECUTE

### 🟡 OPERATIONS PHASE
- [ ] Operations - PLACEHOLDER

## Rationale
[Explanation of why stages were included or skipped]
```

### Step 6: Create Workflow Visualization

Generate a Mermaid flowchart showing:
- Phase sequencing
- Decision points
- Skip/Execute status

Include in `execution-plan.md` or separate `workflow-diagram.md`.

### Step 7: Present Completion Message

```markdown
# 📋 Workflow Planning Complete

[AI-generated summary of execution plan in bullet points]
- Stages to execute: [list]
- Stages skipped: [list with reasons]
- Estimated complexity: [assessment]

> **📋 <u>**REVIEW REQUIRED:**</u>**
> Please examine the execution plan at: `aidlc-docs/inception/plans/execution-plan.md`

> **🚀 <u>**WHAT'S NEXT?**</u>**
>
> **You may:**
>
> 🔧 **Request Changes** - Ask to include/exclude specific stages
> ✅ **Approve & Continue** - Approve plan and proceed to **[Next Stage]**
```

### Step 8: Wait for Approval
- Do not proceed until user explicitly approves
- If user requests stage changes, update plan and repeat approval
- Log approval in `aidlc-docs/audit.md`

### Step 9: Update Progress
- Mark Workflow Planning complete in `aidlc-state.md`
- Prepare for transition to next stage based on plan

## Adaptive Detail Strategy

The methodology acknowledges that "detail level within artifacts adapts to problem complexity," allowing comprehensive documentation scaled appropriately to actual project needs rather than applying uniform depth across all scenarios.

## Key Outputs

1. **execution-plan.md** - Detailed transformation scope and phase decisions
2. **workflow-diagram.md** (optional) - Mermaid visualization
3. Updated **aidlc-state.md** - Current progress tracking
