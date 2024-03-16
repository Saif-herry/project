import "dotenv/config";
export const connectionDB = String(process.env.DATABASE_URL);
export const port = Number(process.env.PORT);
