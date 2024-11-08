const app = require("./app");
const port = process.env.PORT || 8000;
const dotenv = require("dotenv");
const knex = require("./db/knex");
dotenv.config({ path: "./config.env" });
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
