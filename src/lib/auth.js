import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

const uri = process.env.MONGODB_URI;

let client;

// Next.js development mode for reusing global connection cache

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri);
  }
  client = global._mongoClient;
} else {
  // Production mode for normal connection
  client = new MongoClient(uri);
}

// Select the database
const db = client.db("SportNestUserDB");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: client, // The client is passed to enable database transactions
  }),

  emailAndPassword: {
    enabled: true,
  },
});
