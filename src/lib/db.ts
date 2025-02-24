import { MongoClient, Db } from 'mongodb';
import { BlogPost } from '../types/blog';

// Environment variable validation
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

// Singleton closure
const mongoClientSingleton = (() => {
  let clientPromise: Promise<MongoClient> | undefined;

  return () => {
    if (!clientPromise) {
      const client = new MongoClient(uri);
      clientPromise = client.connect();
    }
    return clientPromise;
  };
})();

// Export the database instance
export async function getDb(): Promise<Db> {
  const client = await mongoClientSingleton();
  return client.db('hoseindev');
}

// Optional: Export a typed collection helper if needed
export async function getBlogCollection() {
  const db = await getDb();
  return db.collection<BlogPost>('blogs');
}