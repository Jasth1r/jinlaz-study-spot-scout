# Step 2. Database (15 minutes)

First, copy `.env.example` to `.env` and paste the student password from Canvas. Set `DB_NAME`.

**Menu A (class data, already loaded).** Ask the AI:

> Read IDEA.md and AGENTS.md. My data is in the [olist / stackexchange / gtfs] database on the class server. Write db/queries.sql with the SQL query (or two) my app needs, using a parameter like @state for what the user picks. Explain which tables it joins and why.

Look at the tables first in VS Code if you are not sure what is there.

**Menu B (your own data).** Download the CSV file(s) into `db/data/`. Then ask the AI:

> Read IDEA.md and AGENTS.md. My CSV files are in db/data/. Propose tables for them with primary keys, foreign keys, and sensible types, and write db/schema.sql. Then write db/load.js, which creates the database ship_[my NetID] on the class server if it does not exist, creates the tables, and loads the CSV rows using the settings in .env. Then write db/queries.sql with the query my app needs.

Run it with `node db/load.js`.

**Checkpoint:** run your query from `db/queries.sql` in VS Code (with a real value in place of the parameter) and get sensible rows. For Menu B, also check one table's row count against the CSV.
