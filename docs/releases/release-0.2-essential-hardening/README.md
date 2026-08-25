# Release 0.2: Essential hardening

## Status

Implemented in this repository package on 2026-08-24.

## Objective

Correct only the highest-value correctness and lifecycle issues identified during the CrownGrid repository review, while preserving the existing feature structure and runtime email-obfuscation approach.

## Story map

| Story | Title | Status |
| --- | --- | --- |
| [CG-005](stories/CG-005-essential-code-hardening.md) | Essential code hardening | Implemented |

## Release boundary

This release is limited to state initialization, optimizer finite values, pointer/touch listener ownership, generation-error/replay timer lifecycle, and email-card targeting. It does not include a Web Worker migration, broad `QueensScreen` controller extraction, UI redesign, persistence, backend services, dependency modernization, or a change to the puzzle rules.

## Verification boundary

Release 0.2 adds five focused Vitest checks and records repeatable Chromium smoke evidence for the pointer/touch, timer, replay, recovery, responsive, and contact paths. It does not claim broad unit coverage, a checked-in end-to-end suite, a hosted deployment, an npm publication, or a Git tag.
