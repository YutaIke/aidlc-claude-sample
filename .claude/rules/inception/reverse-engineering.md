# Reverse Engineering Process

## Purpose
Analyze existing codebases and generate design artifacts in brownfield projects.

## Prerequisites
- Workspace Detection must be complete
- Workspace must be identified as brownfield (existing code)

## Execution Trigger
This stage activates when existing code is detected in a workspace. It systematically discovers and documents the system's architecture, business context, and technical components through structured analysis phases.

## Step-by-Step Execution

### Step 1: Multi-Package Discovery
Identify all packages, business transactions, infrastructure components, build systems, service architecture, and code quality indicators across the workspace.

- Scan for source code directories and modules
- Identify build system files (pom.xml, package.json, build.gradle, etc.)
- Detect service boundaries and architecture patterns
- Catalog technology stack components

### Step 2: Architecture Analysis
Analyze and document the system's high-level architecture:
- Application layers (presentation, business, data)
- Service boundaries and communication patterns
- Integration points with external systems
- Deployment topology

### Step 3: Code Structure Analysis
Document the codebase structure:
- Directory organization
- Module/package structure
- Naming conventions
- Design patterns in use

### Step 4: API Documentation
Catalog all APIs:
- REST endpoints
- GraphQL schemas
- Event/message contracts
- Internal service interfaces

### Step 5: Component Inventory
Create comprehensive component list:
- Core business components
- Infrastructure components
- Utility/helper components
- Third-party integrations

### Step 6: Technology Stack Catalog
Document all technologies:
- Programming languages and versions
- Frameworks and libraries
- Databases and data stores
- Infrastructure services

### Step 7: Dependency Mapping
Map dependencies:
- Internal module dependencies
- External library dependencies
- Service-to-service dependencies
- Data flow dependencies

### Step 8: Code Quality Assessment
Assess code quality indicators:
- Test coverage presence
- Documentation coverage
- Code complexity patterns
- Technical debt indicators

## Generated Artifacts

Create the following artifacts in `aidlc-docs/inception/reverse-engineering/`:

1. **architecture.md** - Business overview with context diagrams
2. **code-structure.md** - Code organization and design patterns
3. **api-documentation.md** - API endpoints and contracts
4. **component-inventory.md** - Component catalog
5. **technology-stack.md** - Technology stack catalog
6. **dependency-map.md** - Dependency relationships
7. **quality-assessment.md** - Code quality assessment
8. **analysis-metadata.md** - Timestamp and analysis metadata

## Completion Message

```markdown
# 🔍 Reverse Engineering Complete

[AI-generated summary of findings in bullet points]

> **📋 <u>**REVIEW REQUIRED:**</u>**
> Please examine the reverse engineering artifacts at: `aidlc-docs/inception/reverse-engineering/`

> **🚀 <u>**WHAT'S NEXT?**</u>**
>
> **You may:**
>
> 🔧 **Request Changes** - Ask for modifications to the analysis if required
> ✅ **Approve & Continue** - Approve analysis and proceed to **Requirements Analysis**
```

## Approval Gate
- Wait for explicit user approval before proceeding
- Log approval in `aidlc-docs/audit.md`
- Update state in `aidlc-docs/aidlc-state.md`

## Rerun Behavior
The workflow reruns automatically whenever brownfield projects are detected, ensuring artifacts remain synchronized with current codebase state—even if previous artifacts exist.
