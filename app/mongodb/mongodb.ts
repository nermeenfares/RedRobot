import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING || '';
const DB_NAME = process.env.MONGODB_DB_NAME || 'test';

if (!MONGODB_URI) {
  throw new Error('MONGODB_CONNECTION_STRING is not defined');
}

let cachedDb: Db | null = null;

export async function dbConnect(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const client = new MongoClient(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 30000,
  });

  try {
    await client.connect();
    await client.db(DB_NAME).command({ ping: 1 });
    cachedDb = client.db(DB_NAME);
    return cachedDb;
  } catch (error) {
    await client.close();
    cachedDb = null;
    console.error('MongoDB connection failed:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}