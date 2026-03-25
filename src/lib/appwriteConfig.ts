// appwriteConfig.ts

import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // your endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

export const storage = new Storage(client);
export const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;


export const USERS_COLLECTION_ID =
  import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

export const PROPERTIES_COLLECTION_ID =
  import.meta.env.VITE_APPWRITE_PROPERTIES_COLLECTION_ID;