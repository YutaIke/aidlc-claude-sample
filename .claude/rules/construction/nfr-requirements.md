# NFR Requirements

## Purpose
Establish Non-Functional Requirements (NFR) and make technology stack decisions during system construction.

## Prerequisites
- Functional Design must be complete for the unit
- Functional design artifacts must be available
- Execution plan must indicate NFR Requirements stage should execute

## Overview
Analyze functional design to identify non-functional requirements and select appropriate technology stack.

## Steps to Execute

### Step 1: Analyze Functional Design
- Read functional design from `aidlc-docs/construction/{unit-name}/functional-design/`
- Understand business logic complexity
- Identify NFR-sensitive areas

### Step 2: Create NFR Assessment Plan
- Generate plan with checkboxes [] for NFR assessment
- Cover scalability, performance, availability, security dimensions
- Each step should have a checkbox []

### Step 3: Generate Context-Appropriate Questions
**DIRECTIVE**: Thoroughly analyze the functional design to identify ALL areas where NFR clarification would improve system quality. Be proactive in asking questions.

**CRITICAL**: Default to asking questions when there is ANY ambiguity about non-functional requirements. It's better to ask too many questions than to make assumptions.

- EMBED questions using [Answer]: tag format
- Focus on ANY ambiguities, missing information, or areas needing clarification
- Generate questions wherever user input would improve NFR decisions

**Question categories to evaluate** (consider ALL categories):
- **Scalability** - Expected load, growth patterns, scaling triggers
- **Performance** - Response time requirements, throughput needs, latency constraints
- **Availability** - Uptime requirements, disaster recovery, failover needs
- **Security** - Authentication, authorization, data protection, compliance
- **Tech Stack Selection** - Language, framework, database, infrastructure preferences
- **Reliability** - Error tolerance, recovery procedures, data consistency
- **Maintainability** - Code quality standards, documentation needs, update procedures
- **Usability** - User experience requirements, accessibility needs

### Step 4: Store Plan
- Save as `aidlc-docs/construction/plans/{unit-name}-nfr-requirements-plan.md`
- Include all [Answer]: tags for user input

### Step 5: Collect and Analyze Answers
- Wait for user to complete all [Answer]: tags
- **MANDATORY**: Carefully review ALL responses for vague or ambiguous answers
- **CRITICAL**: Add follow-up questions for ANY unclear responses
- Look for responses like "depends", "maybe", "not sure", "standard"
- Create clarification questions file if ANY ambiguities are detected
- **Do not proceed with ambiguity** - incomplete NFR analysis creates problems later

### Step 6: Generate NFR Requirements Artifacts
- Create `aidlc-docs/construction/{unit-name}/nfr-requirements/nfr-requirements.md`
- Create `aidlc-docs/construction/{unit-name}/nfr-requirements/tech-stack-decisions.md`

NFR Requirements document structure:
```markdown
# NFR Requirements - [unit-name]

## Scalability Requirements
- Expected concurrent users: [number]
- Data growth rate: [estimate]
- Scaling approach: [horizontal/vertical/hybrid]

## Performance Requirements
- Response time target: [p95/p99 latency]
- Throughput requirement: [requests/sec]
- Resource constraints: [memory/CPU limits]

## Availability Requirements
- Uptime target: [percentage]
- Recovery time objective (RTO): [time]
- Recovery point objective (RPO): [time]

## Security Requirements
- Authentication method: [approach]
- Authorization model: [approach]
- Data encryption: [at-rest/in-transit]
- Compliance requirements: [list]

## Reliability Requirements
- Error handling strategy: [approach]
- Data consistency model: [approach]
- Backup and recovery: [approach]

## Maintainability Requirements
- Logging and monitoring: [approach]
- Documentation standards: [requirements]
- Update/deployment strategy: [approach]
```

Tech Stack Decisions document structure:
```markdown
# Technology Stack Decisions - [unit-name]

## Programming Language
- **Choice**: [language and version]
- **Rationale**: [why this choice]

## Framework
- **Choice**: [framework and version]
- **Rationale**: [why this choice]

## Database
- **Choice**: [database type and product]
- **Rationale**: [why this choice]

## Infrastructure
- **Choice**: [cloud provider/on-premise]
- **Rationale**: [why this choice]

## Additional Technologies
[List any additional tools, libraries, or services]
```

### Step 7: Present Completion Message
- Present completion message in this structure:
     1. **Completion Announcement** (mandatory): Always start with this:

```markdown
# 📊 NFR Requirements Complete - [unit-name]
```

     2. **AI Summary** (optional): Provide structured bullet-point summary
        - Format: "NFR requirements assessment has defined [description]:"
        - List key NFR requirements identified (bullet points)
        - List technology stack decisions made
        - Mention scalability, performance, and security approaches
        - DO NOT include workflow instructions
        - Keep factual and content-focused
     3. **Formatted Workflow Message** (mandatory): Always end with this exact format:

```markdown
> **📋 <u>**REVIEW REQUIRED:**</u>**
> Please examine the NFR requirements at: `aidlc-docs/construction/[unit-name]/nfr-requirements/`



> **🚀 <u>**WHAT'S NEXT?**</u>**
>
> **You may:**
>
> 🔧 **Request Changes** - Ask for modifications to the NFR requirements based on your review
> ✅ **Continue to Next Stage** - Approve NFR requirements and proceed to **NFR Design**

---
```

### Step 8: Wait for Explicit Approval
- Do not proceed until the user explicitly approves the NFR requirements
- Approval must be clear and unambiguous
- If user requests changes, update the requirements and repeat the approval process

### Step 9: Record Approval and Update Progress
- Log approval in audit.md with timestamp
- Record the user's approval response with timestamp
- Mark NFR Requirements stage complete in aidlc-state.md
