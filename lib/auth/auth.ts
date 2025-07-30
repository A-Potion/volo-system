import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { nextCookies } from 'better-auth/next-js'
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import '../../envConfig.ts' 

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();
 
export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true
  },
  plugins: [nextCookies()]
});