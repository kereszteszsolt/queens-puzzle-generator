# Release 0.2: Essential hardening

## Status

Planned. No application-code changes from this release are included in the 0.1 package.

## Objective

Correct only the highest-value correctness and lifecycle issues identified during the CrownGrid repository review, while preserving the existing feature structure and runtime email-obfuscation approach.

## Story map

| Story | Title | Status |
| --- | --- | --- |
| [CG-005](stories/CG-005-essential-code-hardening.md) | Essential code hardening | Planned |

## Release boundary

This release is limited to state initialization, optimizer finite values, pointer/touch listener ownership, generation-error/replay timer lifecycle, and email-card targeting. It does not include a Web Worker migration, broad `QueensScreen` controller extraction, UI redesign, persistence, backend services, dependency modernization, or a change to the puzzle rules.
