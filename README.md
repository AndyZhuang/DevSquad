# DevSquad

> Transform your AI coding assistant into a coordinated development team - OpenCode Plugin with Multi-Agent Orchestration

🌐 **Website**: [devsquad-ai.github.io](https://devsquad-ai.github.io)

DevSquad is a powerful OpenCode plugin that transforms your AI coding assistant into a coordinated development team. Type `upup` and watch your AI team ship code.

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

### Prerequisites

**DevSquad requires [OpenCode](https://opencode.ai) to be installed first.**

### For Humans

**Step 1: Install OpenCode** (if not already installed)

```bash
# Check if OpenCode is installed
opencode --version

# If not installed, follow: https://opencode.ai/docs
```

**Step 2: Install DevSquad**

```bash
npm install -g devsquad-ai  # Install globally
bunx devsquad-ai install    # Run interactive setup wizard
```

**Step 3: Authenticate with providers**

```bash
opencode auth login  # Login to your model providers (Claude, Gemini, etc.)
```

After installation, type `upup` in OpenCode and your AI team goes to work.

### For AI Agents

Paste this to your LLM agent (Claude Code, Cursor, etc.):

```
Install and configure devsquad by following the instructions here:
https://github.com/DevSquad-AI/DevSquad/blob/master/docs/guide/installation.md
```

### Development Installation

```bash
git clone https://github.com/DevSquad-AI/DevSquad.git
cd DevSquad
bun install
```

## Supported Models

DevSquad works with any OpenCode-compatible model provider. **Optimized for Chinese models first:**

| Priority | Provider | Models |
|----------|----------|--------|
| **1st** | **MiniMax** | MiniMax-M2.5, MiniMax-M3 (recommended) |
| **2nd** | **GLM** (Zhipu) | glm-4.7, glm-5 |
| **3rd** | **Qwen** (Alibaba) | qwen-coder-turbo, qwen-max |
| **4th** | **DeepSeek** | deepseek-coder, deepseek-chat |
| **5th** | **Claude** (via OpenRouter) | claude-opus-4.7, claude-sonnet-4.5 |

Also supports: Kimi, GPT, Gemini as fallbacks.

## Agents

| Agent | Role | Description |
|-------|------|-------------|
| **Leader** | Main orchestrator | Coordinates the team, executes tasks |
| **Worker** | Deep worker | Autonomous implementation |
| **Architect** | Architecture consultant | Complex problem solving |
| **Researcher** | Docs/code search | Documentation and code lookup |
| **Scout** | Codebase exploration | Fast grep and exploration |
| **Planner** | Strategic planning | Todo orchestration |
| **Advisor** | Plan consultant | Plan review and refinement |
| **Reviewer** | Code review | Quality verification |
| **Multimodal Looker** | Vision tasks | Screenshot and image analysis |

## Commands

- `upup` - Start a full development session (type this in OpenCode)
- `/start-work` - Interview-mode planning with Advisor
- `/upup-loop` - Ralph loop for continuous work
- `/init-deep` - Auto-generate AGENTS.md hierarchy
- `/refactor` - Intelligent refactoring

## Configuration

Configuration is stored in `~/.config/opencode/devsquad.json` (or `.opencode/devsquad.json`).

```jsonc
{
  "enabled": true,
  "agents": {
    "leader": {
      "model": "minimax-cn-coding-plan/MiniMax-M2.5"
    }
  }
}
```

> **Note**: Agent names in config use internal identifiers. Run `bunx devsquad-ai install` for interactive setup.

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

## Recent Improvements

- **Improved stability** - Better session management and error handling
- **Enhanced reliability** - Stale task detection with 30-min timeout
- **Streamlined workflow** - Non-blocking tmux spawning and proper concurrency slot management

> For full changelog, see [CHANGELOG.md](CHANGELOG.md).

## License

MIT License - See LICENSE.md

## Credits

Built on the shoulders of giants - inspired by Claude Code, OpenCode, and AmpCode.
Thank you to Oh-My-OpenCode for laying the foundation.
