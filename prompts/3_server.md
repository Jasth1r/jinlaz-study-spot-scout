# Step 3. Server, the middle tier (20 minutes)

Ask the AI:

> Read IDEA.md, AGENTS.md, and db/queries.sql. Write server/server.js: an Express server that serves the web/ folder and has two routes: GET /api/health (shows which database it is connected to) and GET /api/[name]?[param]=..., which runs my query with the user's value passed as a SQL parameter and returns the rows as JSON. Follow the pattern in examples/olist-explorer/server.js.

Run it with `npm start`, then open the route in your browser, for example <http://localhost:3000/api/health>.

**Checkpoint:** your `/api/...` URL shows JSON rows in the browser. Change the value in the URL and the rows change.
