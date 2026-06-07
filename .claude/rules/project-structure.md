# Project structure

## General structure

- Keep code close to where it is used.
- Prefer obvious file names over abstract ones.
- Keep feature-specific utilities inside the relevant feature area.
- Put shared, domain-independent utilities in the appropriate `utils` folder.
- Put static project assets in the appropriate `assets` folder.
- Avoid domain-specific business logic in generic shared components.

## Frontend structure

- Put reusable frontend UI in `client/src/components/`.
- Put frontend API helpers in `client/src/api/`.
- Group feature UI by screen, usage context, or component family.
- Render explicit empty states for optional data.

## Backend structure

- Put backend routes in `server/src/routes/`.
- Keep route files thin.
- Route files should handle HTTP concerns: request parsing, response formatting, status codes, and route composition.
- Put reusable backend logic outside route files.
- Put database connection, schema setup, and query functions in `server/src/db/`.

## Database structure

- Keep database code in `server/src/db/`.
- Keep the SQLite database file outside `src`, in `server/data/`.
- Use `server/data/poll-request.db` as the default local database file.
- Keep database access explicit and easy to trace.
- Avoid spreading raw SQL throughout unrelated application code.
- Do not commit generated SQLite database files.
