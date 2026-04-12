# DevSquad

> Aim to be the Best AI Agent Harness - Optimized for Chinese Models (Qwen, MiniMax, GLM)

DevSquad is a powerful OpenCode plugin that transforms your AI coding assistant into a coordinated development team. Built on the foundation of opencode, with optimized defaults for Chinese AI models.

## Features

- **Multi-Agent Orchestration** - Leader coordinates Worker, Architect, Researcher, Scout and more
- **One-Command Power** - Type `upup` and watch your AI team ship code
- **Hash-Anchored Editing** - Zero stale-line errors with LINE#ID content validation
- **LSP + AST-Grep** - IDE-level precision for refactoring and code analysis
- **Parallel Agents** - Fire multiple specialists simultaneously
- **Built-in MCPs** - Web search, docs lookup, GitHub code search
- **Ralph Loop** - Self-referential development until 100% complete
- **Todo Enforcer** - Tasks never get abandoned
- **Stale Task Detection** - Automatic cancellation of hung tasks (30-min timeout)
- **Session Continuity** - Background tasks survive across sessions

## Quick Install

### For AI Agents

Paste this to your LLM agent (Claude Code, Cursor, etc.):

```
Install and configure devsquad by following the instructions here:
https://github.com/devsquad-ai/devsquad/blob/master/docs/guide/installation.md
```

### For Humans

**Recommended Method (Global Installation):**

```bash
npm install -g devsquad
bunx devsquad install
```

**Alternative Development Method:**

```bash
git clone https://github.com/devsquad-ai/devsquad.git
cd devsquad
bun install
```

After installation, type `upup` and your AI team goes to work.

## Supported Models

DevSquad is optimized for Chinese models out of the box:

| Provider | Models |
|----------|--------|
| **Qwen** (Alibaba) | qwen-coder-turbo, qwen-max, qwen-vl-max |
| **MiniMax** | minimax-m2.5-free |
| **GLM** (Zhipu) | glm-5, glm-4v |

Also supports: Claude, GPT, Gemini as fallbacks.

**Provider Priority**: Native > GitHub Copilot > OpenCode Zen > Z.ai Coding Plan

## Agents

| Agent | Role | Default Model | Notes |
|-------|------|---------------|-------|
| **Leader** | Main orchestrator | qwen-coder-turbo | Claude-optimized, Opus 4.6 recommended |
| **Worker** | Autonomous deep worker | minimax-m2.5-free | GPT-5.3-codex required |
| **Architect** | Architecture consultant | glm-5 | GPT-5.2 preferred |
| **Researcher** | Docs/code search | minimax-m2.5-free | Free-tier optimized |
| **Scout** | Codebase exploration | minimax-m2.5-free | Speed-focused, Grok Code Fast default |
| **Planner** | Strategic planning | qwen-max | Dual-prompt (Claude/GPT) |
| **Advisor** | Plan consultant | qwen-max |Dual-prompt (Claude/GPT) |
| **Reviewer** | Code review | glm-5 | GPT-5.2 preferred |
| **Multimodal Looker** | Vision/screenshots | kimi-k2.5-free | Kimi for multimodal tasks |

## Commands

- `upup` - Start a full development session
- `/start-work` - Interview-mode planning with Advisor
- `/upup-loop` - Ralph loop for continuous work
- `/init-deep` - Auto-generate AGENTS.md hierarchy
- `/refactor` - Intelligent refactoring

## Configuration

Configuration is stored in `~/.config/opencode/devsquad.json` (or `.opencode/devsquad.json`).

```jsonc
{
  "agents": {
    "leader": { "model": "anthropic/claude-opus-4-6" }
  },
  "features": {
    "tmux": true,
    "background": true
  }
}
```

## Documentation

- [Installation Guide](docs/guide/installation.md) - Full setup instructions with provider authentication
- [Configuration Reference](docs/reference/configuration.md) - Agent model overrides and feature flags
- [Features Overview](docs/reference/features.md) - MCPs, Skills, Commands
- [Agent Model Matching](docs/guide/agent-model-matching.md) - Model selection strategy
- [Orchestration Guide](docs/guide/orchestration.md) - Multi-agent workflows

## Architecture

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

## Development

| Command | Purpose |
|---------|---------|
| `bun run build` | Build project to `dist/` |
| `bun run build:all` | Build + build binaries |
| `bun test` | Run tests |
| `bun run typecheck` | Type checking |
| `bun run build:schema` | Rebuild JSON schema |

## Bug Fixes & Improvements

Recent improvements:
- **Event stream cleanup** - Proper completion tracking prevents zombie sessions
- **Session creation retries** - Better error messages with detailed diagnostics
- **Tmux spawning** - Non-blocking on error, 200ms wait only on success
- **Model resolution** - Validates fallback availability before returning system default
- **JSONC validation** - Vds syntax before modification
- **Circular reference protection** - Session traversal prevents infinite loops
- **Stale task detection** - Improved error messages and stuck session handling
- **Poll timeout** - 30-minute maximum to prevent infinite loops
- **Background task cleanup** - Proper concurrency slot management

## License

ISC - See LICENSE.md

## Credits

Built on the shoulders of giants - inspired by Claude Code, OpenCode, and AmpCode.
Thank you to Oh-My-OpenCode (oh-my-opencode) for laying the foundation.
