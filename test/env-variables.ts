require('dotenv').config();

export const baseUrl = `http://localhost:${process.env.SERVER_PORT}`;
export const db = process.env.MONGO_URL_TEST;
export const uploadFolderName = process.env.STORAGE;
