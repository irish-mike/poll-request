# Code style rules

## Core development principles

- Prefer simple, readable code over clever or overly abstract code.
- Prefer the simplest implementation that solves the current problem.
- Prefer clear duplication over premature abstraction.
- Extract shared logic only when duplication creates real maintenance risk or hides domain intent.
- Keep simple one-off logic close to the domain where it is used.
- Avoid broad rewrites unless necessary.

## Naming
- Use `snake_case` for variables.
- Use `camelCase` for functions.
- Use `PascalCase` for types, interfaces, classes, and React components.
- Use `UPPER_SNAKE_CASE` for true constants.
- Use kebab-case for new files and folders unless the project uses another convention.
- Use `.tsx` for React components.
- Use `.ts` for pure TypeScript logic.
- Hooks should start with `use`.
- Use American English: `color`, `center`, `normalize`.

## Types

- Prefer `interface` for object shapes, props, models, and simple contracts.
- Use `type` for unions, aliases, utility types, mapped types, and composed types.
- Keep types close to where they are used unless they are shared across files.
- Avoid `any` unless there is a clear reason.

## React

- Use `const` arrow functions for React components.
- Put `export default` at the bottom when using default exports.
- For one simple prop, inline the prop type.
- For multiple, optional, callback, complex, or reusable props, define a `Props` interface.
- Prefer computed values above JSX instead of complex inline expressions inside JSX.
- Prefer local React state unless shared state is clearly needed.

## Readability

- Prefer named intermediate variables over long chains of method calls.
- Avoid dense chains like chained `split`, `filter`, `sort`, and `map` calls when named steps would be clearer.
- Prefer self-explanatory code.
- Add comments for non-obvious business rules, framework constraints, tradeoffs, or surprising decisions.
- Use `// region` sections only when a file becomes large enough that collapsible organization improves readability.
- Keep functions small enough to understand without excessive scrolling.
- Keep conditionals straightforward.
- Return early when it improves readability.
- Avoid clever one-liners when a few clear lines would be easier to maintain.

## Error handling

- Handle failed HTTP requests explicitly.
- Do not silently swallow errors.
- Return clear errors from API code where practical.
- Avoid leaking internal implementation details in user-facing errors.