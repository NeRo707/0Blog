import { Client, Databases, Account, Storage } from "appwrite";
import { APPWRITE_CONFIG } from "../config/constants";

const client = new Client()
  .setEndpoint(APPWRITE_CONFIG.endpoint)
  .setProject(APPWRITE_CONFIG.projectId);

export const databases = new Databases(client);
export const account = new Account(client);
export const storage = new Storage(client);
export { client as appwriteClient };
