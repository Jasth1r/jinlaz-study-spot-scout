# Step 3. The data (15 minutes)

Your app gets its own database on the class server, named `<your NetID>_myapp`. The default is to invent the data for your idea; you can use real data instead.

**Default: invent it.** Ask the AI:

> Read IDEA.md and AGENTS.md. Design tables for my idea with primary keys, foreign keys, and sensible types, and write db/schema.sql. Write db/load.js, which creates the database [my NetID]_myapp on the class server if it does not exist, creates the tables, and inserts about 20 realistic made-up rows per table. Then write db/queries.sql with the query my app needs, using a parameter for what the user picks.

Run it with `node db/load.js`. **Then** set `DB_NAME=<your NetID>_myapp` in `.env` (before that, the database does not exist and connections fail with "Login failed").

**Or use class data (Menu A), already loaded.** Look at the tables in VS Code, then ask the AI:

> Read IDEA.md and AGENTS.md. My data is in the [olist / stackexchange / gtfs] database on the class server. Write db/queries.sql with the query my app needs, using a parameter like @state for what the user picks. Explain which tables it joins and why.

**Or load real public data (Menu B).** Pick links from [DATASETS.md](../DATASETS.md) (no download needed) and ask the AI:

> Read IDEA.md and AGENTS.md. My data is at these CSV links: [paste links]. Look at their columns, then propose tables with primary keys, foreign keys, and sensible types, and write db/schema.sql. Then write db/load.js, which fetches the CSVs from the links, creates the database [my NetID]_myapp on the class server if it does not exist, creates the tables, and loads the rows using the settings in .env. Then write db/queries.sql with the query my app needs, using a parameter for what the user picks.

Run it with `node db/load.js`, then set `DB_NAME=<your NetID>_myapp` in `.env`.

**Checkpoint:** run your query from `db/queries.sql` in VS Code (with a real value in place of the parameter) and get sensible rows. For real data, check one table's row count against the CSV.
