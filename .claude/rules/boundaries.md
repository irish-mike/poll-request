# Boundaries

## Instruction priority

When rules conflict, use this priority order:

1. Existing project patterns
2. Framework conventions
3. Rules in this guide
4. Personal style preferences

Use the existing codebase as the main source of truth.

## Development focus

Claude should primarily help with application code:

- UI and styling
- Front end components
- API routes and API behavior
- Database schema and queries
- Refactoring
- Bug fixes

## Working rules

- Work from the repository root.
- Use the package manager already used by the project.
- Prefer minimal, focused changes.
- Follow existing project patterns before introducing new ones.
- Do not run broad formatting across the whole repo unless asked.
- When making UI changes, update only frontend files unless backend data shape changes are required.
- When making backend changes, avoid changing frontend code unless the API contract changes.

## Scope control

- Prefer the smallest change that solves the problem.
- Do not add extra features unless asked.
- Do not add speculative flexibility or future-proof abstractions unless asked.
- Do not rewrite unrelated code.
- Do not change project structure unless asked or clearly required by the task.
- Do not introduce new libraries unless asked, or unless the library clearly avoids rebuilding a complex solved problem.
- Use code that already exists as the basis for decisions.

## Files and directories not to read or modify

Do not read or modify:

- `.env`
- `.env.*`
- `node_modules`
- `dist`
- `build`
- `coverage`
- `.git`
- `.next`
- `out`

Do not modify unless explicitly asked:

- `.github`
- `docker-compose*.yml`
- `Dockerfile`
- `Dockerfile.*`
- `*.config.js`
- `*.config.ts`
- `.env.example`
- deployment or server config files

## Response style after code changes

After making code changes, provide:

- A brief summary of what changed.
- Any notable tradeoffs or skipped edge cases.
- A concise suggested commit message.