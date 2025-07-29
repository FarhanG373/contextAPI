import mySql from "mysql2/promise";
export const createConnection = async ({ query, values = [] }) => {
  const con = await mySql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "api_project",
  });
  try {
    const [connection] = await con.execute(query, values);
    await con.end();
    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  } finally {
    await con.end();
  }
};
