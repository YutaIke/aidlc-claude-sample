# Build and Test Phase

## Purpose
Build software units and execute systematic testing across multiple levels.

## Prerequisites
- Code Generation must be complete for all units
- All code and test files must be generated
- Execution plan must indicate Build and Test stage should execute

## Overview
This phase addresses six distinct testing dimensions:
1. **Unit Tests** - Already generated with code
2. **Integration Tests** - Component interaction validation
3. **Performance Tests** - Load and stress testing
4. **End-to-End Tests** - User workflow validation
5. **API Tests** - Contract verification between services
6. **Security Tests** - Vulnerability assessment

## Step-by-Step Execution

### Step 1: Analyze Build Context
- Read `aidlc-docs/aidlc-state.md` for project information
- Identify all units and their code locations
- Determine build system and tools
- Review generated test files

### Step 2: Create Build Instructions
Generate `aidlc-docs/construction/build-instructions.md`:
- Dependency installation commands
- Environment configuration
- Compilation/build commands
- Troubleshooting guidance

### Step 3: Execute Build
- Run build commands for all units
- Capture build output and results
- Document any build issues
- Resolve build failures before proceeding

### Step 4: Create Unit Test Execution Instructions
Generate `aidlc-docs/construction/unit-test-instructions.md`:
- Commands for running unit tests
- Coverage metrics requirements
- Failure resolution steps
- Expected outcomes

### Step 5: Execute Unit Tests
- Run all generated unit tests
- Capture test results and coverage
- Document failures and fixes
- Ensure minimum coverage thresholds

### Step 6: Create Integration Test Plan
Generate `aidlc-docs/construction/integration-test-instructions.md`:
- Multi-scenario service interaction tests
- Environment setup procedures
- Test data requirements
- Expected outcomes

### Step 7: Execute Integration Tests
- Run integration tests
- Validate component interactions
- Document results and issues
- Fix integration failures

### Step 8: Create Performance Test Plan
Generate `aidlc-docs/construction/performance-test-instructions.md`:
- Load testing protocols
- Stress testing scenarios
- Response time benchmarks
- Throughput requirements

### Step 9: Execute Performance Tests (if applicable)
- Run performance tests
- Measure response times and throughput
- Document performance metrics
- Identify and address bottlenecks

### Step 10: Generate Test Summary
Create `aidlc-docs/construction/test-summary.md`:
```markdown
# Test Summary

## Build Status
- **Build Result**: [PASS/FAIL]
- **Build Time**: [duration]
- **Artifacts Generated**: [list]

## Unit Tests
- **Total Tests**: [count]
- **Passed**: [count]
- **Failed**: [count]
- **Coverage**: [percentage]

## Integration Tests
- **Total Scenarios**: [count]
- **Passed**: [count]
- **Failed**: [count]

## Performance Tests
- **Response Time**: [avg/p95/p99]
- **Throughput**: [requests/sec]
- **Status**: [MEETS REQUIREMENTS/NEEDS IMPROVEMENT]

## Overall Status
- **Ready for Operations**: [YES/NO]
- **Blocking Issues**: [list if any]
```

### Step 11: Present Completion Message

```markdown
# ✅ Build and Test Complete

[AI-generated summary of test results in bullet points]
- Build status: [PASS/FAIL]
- Unit tests: [X passed, Y failed]
- Integration tests: [X passed, Y failed]
- Coverage: [percentage]

> **📋 <u>**REVIEW REQUIRED:**</u>**
> Please examine the test summary at: `aidlc-docs/construction/test-summary.md`

> **🚀 <u>**WHAT'S NEXT?**</u>**
>
> **You may:**
>
> 🔧 **Request Changes** - Ask for fixes to failing tests or code issues
> ✅ **Complete** - Approve and complete the AI-DLC workflow
```

### Step 12: Wait for Approval
- Do not mark complete until user explicitly approves
- If tests fail, work with user to resolve issues
- Log approval in `aidlc-docs/audit.md`

### Step 13: Update Progress
- Mark Build and Test stage complete in `aidlc-state.md`
- Update overall workflow status
- Prepare summary for Operations phase (placeholder)

## Instruction File Template

Each instruction file follows this structure:

```markdown
# [Test Type] Instructions

## Prerequisites
- [Required setup]
- [Dependencies]

## Environment Setup
[Commands and configuration]

## Execution Steps
1. [Step 1]
2. [Step 2]
...

## Expected Outcomes
- [Expected result 1]
- [Expected result 2]

## Troubleshooting
### Common Issue 1
- **Symptom**: [description]
- **Solution**: [steps]

### Common Issue 2
- **Symptom**: [description]
- **Solution**: [steps]
```

## Completion Criteria
- All units build successfully
- Unit tests pass with acceptable coverage
- Integration tests validate component interactions
- Performance tests meet requirements (if applicable)
- Test summary documents all results
- User approves completion
