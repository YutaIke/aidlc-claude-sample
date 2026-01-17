# AI-DLC (AI-Driven Development Life Cycle) for Claude Code

This project uses AI-DLC, an adaptive software development workflow that intelligently tailors itself to your specific needs.

## Quick Start

- `/aidlc` - Start a new AI-DLC workflow
- `/aidlc-resume` - Resume an existing workflow session
- `/aidlc-status` - Check current workflow status

## The Three-Phase Lifecycle

```
                         User Request
                              |
                              v
        ╔═══════════════════════════════════════╗
        ║     INCEPTION PHASE                   ║
        ║     Planning & Application Design     ║
        ╠═══════════════════════════════════════╣
        ║ • Workspace Detection (ALWAYS)        ║
        ║ • Reverse Engineering (CONDITIONAL)   ║
        ║ • Requirements Analysis (ALWAYS)      ║
        ║ • User Stories (CONDITIONAL)          ║
        ║ • Workflow Planning (ALWAYS)          ║
        ║ • Application Design (CONDITIONAL)    ║
        ║ • Units Generation (CONDITIONAL)      ║
        ╚═══════════════════════════════════════╝
                              |
                              v
        ╔═══════════════════════════════════════╗
        ║     CONSTRUCTION PHASE                ║
        ║     Design, Implementation & Test     ║
        ╠═══════════════════════════════════════╣
        ║ • Per-Unit Loop (for each unit):      ║
        ║   - Functional Design (CONDITIONAL)   ║
        ║   - NFR Requirements (CONDITIONAL)    ║
        ║   - NFR Design (CONDITIONAL)          ║
        ║   - Infrastructure Design (CONDITIONAL)║
        ║   - Code Generation (ALWAYS)          ║
        ║ • Build and Test (ALWAYS)             ║
        ╚═══════════════════════════════════════╝
                              |
                              v
        ╔═══════════════════════════════════════╗
        ║     OPERATIONS PHASE                  ║
        ║     Placeholder for Future            ║
        ╠═══════════════════════════════════════╣
        ║ • Operations (PLACEHOLDER)            ║
        ╚═══════════════════════════════════════╝
                              |
                              v
                          Complete
```

## Rule Loading Protocol

**MANDATORY**: When executing AI-DLC workflow, load rule files from `.claude/rules/` directory:

### Rule File Structure
```
.claude/rules/
├── common/           # Shared rules across all phases
├── inception/        # INCEPTION phase rules
├── construction/     # CONSTRUCTION phase rules
└── operations/       # OPERATIONS phase rules
```

### Loading Order
1. **Always load first**: `common/process-overview.md`, `common/terminology.md`
2. **Before each stage**: Load the corresponding rule file for that stage
3. **For questions**: Load `common/question-format-guide.md`
4. **For errors**: Load `common/error-handling.md`

## Core Principles

### Audit Trail
- **MANDATORY**: Log all user inputs with ISO 8601 timestamps in `aidlc-docs/audit.md`
- Document all decisions, approvals, and changes
- Maintain complete traceability

### Content Validation
- **MANDATORY**: Validate all content before file creation
- Follow ASCII diagram standards from `common/ascii-diagram-standards.md`
- Validate Mermaid diagrams before embedding

### Question Format
- **NEVER ask questions in chat** - Use dedicated question files
- All questions use [Answer]: tag format
- Include "Other" as the last option for every question
- See `common/question-format-guide.md` for complete rules

### Approval Gates
- **MANDATORY**: Get explicit user approval before proceeding between stages
- Log approval prompts and responses in `audit.md`
- Never proceed with ambiguous approvals

### Code Location Rules
- **Application Code**: Workspace root only (NEVER in aidlc-docs/)
- **Documentation**: `aidlc-docs/` directory only
- **Structure patterns**: See `construction/code-generation.md` for patterns

## Artifact Directory Structure

```
aidlc-docs/
├── aidlc-state.md              # Workflow state tracking
├── audit.md                     # Complete audit trail
├── inception/
│   ├── requirements/            # Requirements artifacts
│   ├── user-stories/            # User stories and personas
│   ├── reverse-engineering/     # Brownfield analysis (if applicable)
│   ├── application-design/      # Component and service design
│   └── plans/                   # Planning documents
└── construction/
    ├── plans/                   # Code generation plans
    ├── {unit-name}/             # Per-unit design and code docs
    ├── build-instructions.md    # Build procedures
    └── test-summary.md          # Test results
```

## Adaptive Execution

The workflow adapts to your project:
- **Simple changes**: Execute only essential stages
- **Complex projects**: Full treatment with all safeguards
- **Brownfield projects**: Include reverse engineering
- **Greenfield projects**: Skip reverse engineering

## Session Continuity

When resuming a session:
1. Read `aidlc-docs/aidlc-state.md` for current status
2. Load all relevant artifacts from previous stages
3. Present continuation options to user
4. Resume from last checkpoint

See `common/session-continuity.md` for detailed protocol.

## Stage Rule Files

### INCEPTION Phase
| Stage | Rule File |
|-------|-----------|
| Workspace Detection | `inception/workspace-detection.md` |
| Reverse Engineering | `inception/reverse-engineering.md` |
| Requirements Analysis | `inception/requirements-analysis.md` |
| User Stories | `inception/user-stories.md` |
| Workflow Planning | `inception/workflow-planning.md` |
| Application Design | `inception/application-design.md` |
| Units Generation | `inception/units-generation.md` |

### CONSTRUCTION Phase
| Stage | Rule File |
|-------|-----------|
| Functional Design | `construction/functional-design.md` |
| NFR Requirements | `construction/nfr-requirements.md` |
| NFR Design | `construction/nfr-design.md` |
| Infrastructure Design | `construction/infrastructure-design.md` |
| Code Generation | `construction/code-generation.md` |
| Build and Test | `construction/build-and-test.md` |

### OPERATIONS Phase
| Stage | Rule File |
|-------|-----------|
| Operations | `operations/operations.md` |

## Common Rule Files

| Purpose | Rule File |
|---------|-----------|
| Process Overview | `common/process-overview.md` |
| Terminology | `common/terminology.md` |
| Question Format | `common/question-format-guide.md` |
| Error Handling | `common/error-handling.md` |
| Session Continuity | `common/session-continuity.md` |
| Content Validation | `common/content-validation.md` |
| ASCII Diagrams | `common/ascii-diagram-standards.md` |
| Depth Levels | `common/depth-levels.md` |
| Welcome Message | `common/welcome-message.md` |
| Workflow Changes | `common/workflow-changes.md` |
| Overconfidence Prevention | `common/overconfidence-prevention.md` |
