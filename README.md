# Ship It by Noon: The one-hour Database App

A complete web app in three small pieces:

```
Browser (public/index.html)  -->  Node server (server.js)  -->  SQL Server (class server, olist database)
       the page you see            the "middleware": runs SQL      the data
```

The page never talks to the database. It asks the server (`/api/top-sellers?state=SP`), the server runs a SQL query with the state as a **parameter**, and sends the rows back as JSON.

## Before you start

- **Be on UW Wi-Fi or the Husky OnNet VPN.** The class server is only reachable from the UW network, the same as in VS Code.
- **Node.js 20 or newer.** In a VS Code terminal, run `node -v`. If you see an error, install the LTS version from <https://nodejs.org> and restart VS Code.
- **A GitHub account,** signed in to VS Code.
- **An AI coding assistant.** We recommend Claude: Claude Code if you have it, or the free chat at <https://claude.ai>.

## Part 1. Get the starter running (about 20 minutes)

1. On this repository's GitHub page, click **Use this template**, then **Create a new repository**. Make it **public** and call it `ship-it-by-noon`.
2. In VS Code: **Source Control > Clone Repository**, and pick your new repository.
3. In the VS Code terminal:
   ```
   npm install
   ```
4. Make your settings file. Copy `.env.example` to a new file named `.env` (Mac: `cp .env.example .env`, Windows: `copy .env.example .env`). Open `.env` and paste the student password from Canvas after `DB_PASSWORD=`.
   `.gitignore` lists `.env`, so your password never goes to GitHub.
5. Start the server:
   ```
   npm start
   ```
   Open <http://localhost:3000>. You should see a green box that says **Connected to database olist**. Pick a state and click **Show top sellers**.
6. Take **Screenshot 1**: the page with the green box and the table of sellers.

To stop the server, click in the terminal and press Ctrl+C. Start it again after every code change.

## Part 2. Add a feature with Claude (about 30 minutes)

Everyone adds the same feature: **the top product categories in the chosen state**. It touches all three pieces: a new SQL query, a new `/api` route in `server.js`, and a new table on the page.

Give Claude this prompt. If you use the claude.ai chat, also paste in `server.js` and `public/index.html` (and `CLAUDE.md`, which tells Claude the rules for this project).

> In this app, add a feature: when I click "Show top sellers", also show the 5 product categories with the most revenue among sellers in that state. Use olist.dbo.order_items joined to olist.dbo.products on product_id, and olist.dbo.sellers on seller_id, grouped by products.product_category_name. Add a new route GET /api/top-categories?state=XX in server.js that passes the state as a SQL parameter, and show the result as a second table on the page with columns Category, Items sold, Revenue (rounded to 2 decimals).

Then:

1. Paste in Claude's changes, restart the server (Ctrl+C, then `npm start`), and reload the page.
2. If something breaks, copy the error from the terminal or the page into Claude and ask it to fix it.
3. Check that it is right: open <http://localhost:3000/api/top-categories?state=SP> to see the raw JSON, and compare one number with the same query run in VS Code.
4. Take **Screenshot 2**: the page showing both tables.

## Part 3. Ship it (about 5 minutes)

In VS Code **Source Control**: type a message such as `Add top categories`, click **Commit**, then **Sync Changes** (push).
Open your repository on GitHub and check that `server.js` has your new route and that **there is no `.env` file**.

## What to submit

See the Canvas assignment. You will submit Screenshot 1, Screenshot 2, and the link to your GitHub repository.

## Files

| File | What it is |
| --- | --- |
| `public/index.html` | The web page (HTML, CSS, and JavaScript that calls `/api/...`) |
| `server.js` | The middleware: Express routes, each running one parameterized SQL query |
| `.env.example` | The settings the server needs. Copy it to `.env` and fill in the password |
| `CLAUDE.md` | Instructions that Claude Code reads automatically: how this app works and its rules |
| `package.json` | The npm packages: `express` (web server), `mssql` (SQL Server driver), `dotenv` (reads `.env`) |

## Troubleshooting

- **Red box "No database connection ... getaddrinfo ENOTFOUND"**: you are not on the UW network. Connect to Husky OnNet.
- **"Login failed for user"**: the password in `.env` is wrong or has extra spaces.
- **`EADDRINUSE` when starting**: the server is already running in another terminal. Stop it with Ctrl+C, or change `PORT=3001` in `.env`.
- **The page did not change after an edit**: restart the server and reload the page.
