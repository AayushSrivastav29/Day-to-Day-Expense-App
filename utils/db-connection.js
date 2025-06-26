const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("expenseTrackerdb", "root", "root@123", {
  host: "localhost",
  dialect:
    "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to db successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;

