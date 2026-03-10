<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- Template principle 1 -> I. Code Quality Is a Release Gate
- Template principle 2 -> II. Experience Consistency Is Non-Negotiable
- Template principle 3 -> III. Performance Budgets Are Product Requirements
Added sections:
- Delivery Standards
- Review & Quality Gates
Removed sections:
- Template principles 4 and 5 placeholders
Templates requiring updates:
- ✅ .specify/templates/plan-template.md
- ✅ .specify/templates/spec-template.md
- ✅ .specify/templates/tasks-template.md
- ✅ .github/agents/speckit.specify.agent.md
- ✅ .github/agents/speckit.tasks.agent.md
- ✅ .github/agents/speckit.implement.agent.md
Follow-up TODOs:
- None
-->
# KiliMarkets Constitution

## Core Principles

### I. Code Quality Is a Release Gate
All production changes MUST preserve a clear structure, small cohesive modules, and
readable intent. Teams MUST prefer reuse over duplication, keep public interfaces explicit,
and ship code that passes the project's formatting, linting, and static analysis checks
before work is considered complete. Temporary workarounds, dead code, and undocumented
behavior changes are not acceptable unless they are tracked with an explicit removal plan
approved during review. Rationale: maintainable code keeps delivery speed high as the
product grows.

### II. Experience Consistency Is Non-Negotiable
Every user-facing feature MUST reuse the project's established language, interaction
patterns, visual hierarchy, and handling for loading, empty, success, and error states.
Specifications and plans MUST define the expected user flow and identify any intentional
deviations before implementation begins. Accessibility and clarity are part of consistency:
new screens and interactions MUST remain understandable, predictable, and usable for the
same audience as existing flows. Rationale: consistent experiences reduce user friction and
support costs.

### III. Performance Budgets Are Product Requirements
Each feature MUST declare measurable performance expectations before implementation,
including the user-visible budget that matters most for that work such as render latency,
interaction response time, data processing time, or sustained throughput. Plans and tasks
MUST include the mechanism used to validate those budgets, and work that misses an agreed
budget is incomplete until the budget is met or formally amended. Rationale: performance is
part of product quality, not a post-release optimization.

## Delivery Standards

- Specifications MUST capture user scenarios, acceptance scenarios, and explicit experience
	and performance requirements for each feature.
- Implementation plans MUST document how code quality checks, consistency decisions, and
	performance validation will be completed.
- Automated tests are OPTIONAL and only required when explicitly requested by the user or
	mandated by a feature-specific risk decision. When tests are omitted, teams MUST still
	record manual validation steps and performance evidence appropriate to the change.
- Tasks MUST include work for shared UI patterns, code hygiene, and performance validation
	whenever a feature affects those areas.

## Review & Quality Gates

- Every plan and delivery review MUST pass a Constitution Check covering code quality,
	experience consistency, and performance budgets.
- Reviewers MUST reject changes that introduce duplicate logic, inconsistent user-facing
	behavior, or missing performance targets without a documented exception.
- Feature completion evidence MUST include the artifacts used for validation, such as lint
	output, design review notes, scenario walkthroughs, or performance measurements.
- Exceptions are time-boxed by default and MUST include owner, scope, and removal date.

## Governance

This constitution supersedes conflicting local habits, templates, and informal guidance.
Amendments MUST be documented in this file, include a summary of affected principles or
sections, and update any dependent templates or agent guidance in the same change. Versioning
follows semantic rules: MAJOR for incompatible governance changes or principle removals,
MINOR for new principles or materially expanded obligations, and PATCH for clarifications
that do not change project obligations. Compliance review is required for every new plan and
for every change set presented for implementation or merge.

**Version**: 1.0.0 | **Ratified**: 2026-03-10 | **Last Amended**: 2026-03-10
