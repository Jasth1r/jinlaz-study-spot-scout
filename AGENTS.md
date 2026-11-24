# Notes for AI coding assistants (GitHub Copilot, Claude Code, and others)

This is a student project for INFO 430 (database systems) at the UW iSchool.
The student may be new to web development. Explain changes in plain language.

## How the app works
- `public/index.html` is the web page. It only calls this app's own `/api/...` routes with `fetch`.
- `server.js` is a Node + Express server. Each `/api/...` route runs one SQL query on SQL Server and returns rows as JSON.
- The database is SQL Server on the class server. Tables live in the `olist` database: `olist.dbo.sellers`, `olist.dbo.order_items`, `olist.dbo.products`, and others. Use three-part names.
- Connection settings come from `.env` (see `.env.example`).

## Rules
- Any value that comes from the user goes into SQL as a parameter (`request.input(...)` and `@name`), never by pasting strings into SQL text.
- Never put a password in code, and never commit `.env`.
- The student login is read-only: SELECT only. Do not write CREATE, INSERT, UPDATE, or DELETE against `olist`.
- Keep it simple: no frameworks beyond Express, no build step, no extra npm packages unless asked.
- After a change, tell the student exactly how to test it (`npm start`, then which page or URL to open).
