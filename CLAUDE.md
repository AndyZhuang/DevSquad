# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Commands

| Command | Purpose |
|---------|---------|
| `bun run build` | Build project to `dist/` |
| `bun run build:all` | Build + build binaries |
| `bun test` | Run tests |
| `bun run typecheck` | Type checking |
| `bun run build:schema` | Rebuild JSON schema |

## Architecture Overview

DevSquad is an OpenCode plugin that transforms a single AI agent into a coordinated development team through **multi-model orchestration**.

### Core Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     DevSquad Plugin                         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────────────────────┐   │
│  │  CLI Layer      │  │  Plugin Interface (hooks)       │   │
│  │  - run, install │  │  - chat.params, chat.message    │   │
│  │  - doctor       │  │  - config, event                │   │
│  └─────────────────┘  └─────────────────────────────────┘   │
│                              │                              │
│           ┌──────────────────┼──────────────────┐           │
│           │                  │                  │           │
│  ┌────────▼────────┐  ┌──────▼───────┐  ┌──────▼───────┐     │
│  │  Config Manager │  │  Managers    │  │  Tools       │     │
│  │  - load/merge   │  │  - tmux      │  │  - MCPs      │     │
│  │  - model resolver│ │  - background│  │  - LSP       │     │
│  └─────────────────┘  └──────────────┘  └──────────────┘     │
│                              │                              │
│              ┌───────────────┼───────────────┐              │
│              │               │               │              │
│     ┌────────▼────────┐ ┌────▼───────┐ ┌────▼───────┐        │
│     │  Agent Builder  │ │ Agents     │ │ Features   │        │
│     │  - dynamic      │ │ - Leader   │ │ - Tasks    │        │
│     │  - prompt       │ │ - Worker   │ │ - MCPs     │        │
│     │    injection    │ │ - Architect│ │ - Tmux     │        │
│     └─────────────────┘ │ - Others   │ │ - Skills   │        │
│                         └────────────┘ └────────────┘        │
└───────────────────────────────────────────────────────────────┘
```

### Key Concepts

1. **Agent Model**: Each agent is a factory function returning `AgentConfig` with a static `mode` property
   - `primary`: Respects UI-selected model (Leader, Planner)
   - `subagent`: Uses own fallback chain (Architect, Scout, etc.)
   - `all`: Available in both contexts

2. **Model Resolution Pipeline**: 3-step priority:
   - User override (config) → Provider fallback chain → System default

3. **Category System**: Delegation by intent, not model name:
   - `visual-engineering`: Gemini 3 Pro (frontend/UI)
   - `ultrabrain`: GPT-5.3 Codex (deep reasoning)
   - `quick`: MiniMax M2.5 (trivial tasks)
   - `deep`: GPT-5.3 Codex (autonomous problem-solving)

4. **Background Tasks**: Parallel agent execution with concurrency limits
   - Managed via `BackgroundManager`
   - Supports session continuity and fallba

### Modified Files Summary

Recent changes focus on:
- Plugin interface refactor (`plugin-interface.ts`)
- Config handler composition (`plugin-handlers/config-handler.ts`)
- Type cleanup (`agents/types.ts`, `create-managers.ts`)
- Model resolution pipeline refactoring

### Important Patterns

- **NEVER export functions from `src/index.ts`** - OpenCode treats all exports as plugin instances
- Config validation uses Zod schemas in `src/config/schema/`
- Model resolution uses `resolveModelPipeline` from `shared/model-resolution-pipeline.ts`
- Background tasks use session IDs for continuity - always preserve them

### File Organization

```
src/
├── agents/           # Agent factories (dynamic prompts, mode)
├── cli/              # CLI commands (run, install, doctor)
├── config/           # Zod schemas and types
├── features/         # Background tasks, MCPs, skills, commands
├── plugin-handlers/  # Component config handlers
├── shared/           # Utilities (model resolution, parsing)
├── create-managers.ts# Manager initialization
└── index.ts          # Plugin entry (export types only)
```
