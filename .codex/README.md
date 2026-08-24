# Codex project setup

CrownGrid keeps its AI-assisted workflow intentionally small:

- `architect` plans cross-cutting state, lifecycle, routing, and deployment changes;
- `implementation_worker` owns one bounded write task;
- `algorithm_reviewer` reviews placement, connected regions, counting, optimization, and performance;
- `reviewer` checks final correctness, accessibility, privacy, documentation, and evidence.

Reusable workflows live in `.agents/skills/`. Root `AGENTS.md` is the source of truth for scope, release boundaries, verification, and email-obfuscation requirements.
